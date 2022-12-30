package com.rtu.iNutrix.service;

import com.rtu.iNutrix.models.DTO.Diet.*;
import com.rtu.iNutrix.models.DTO.Meals.DietMetadata;
import com.rtu.iNutrix.models.DTO.Meals.MealType;
import com.rtu.iNutrix.models.DTO.Products.ProductBase;
import com.rtu.iNutrix.models.DTO.Products.ProductDTO;
import com.rtu.iNutrix.models.DTO.Products.ProductInfoDTO;
import com.rtu.iNutrix.models.entities.*;
import com.rtu.iNutrix.repositories.DietHistoryRepository;
import com.rtu.iNutrix.repositories.DietProductRepository;
import com.rtu.iNutrix.repositories.DietProgressRepository;
import com.rtu.iNutrix.repositories.DietRepository;
import com.rtu.iNutrix.service.interfaces.DietService;
import com.rtu.iNutrix.service.interfaces.ProductsService;
import com.rtu.iNutrix.service.interfaces.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class DietServiceImpl implements DietService {

    private final UserDataService _userDataService;

    private final DietHistoryRepository _dietHistoryRepo;

    private  final DietProgressRepository _dietProgressRepo;

    private final DietProductRepository _dietProductRepo;

    private  final ProductsService _productService;

    private  final DietRepository _dietRepo;


    @Autowired
    public DietServiceImpl(UserDataService userDataService, DietHistoryRepository dietHistoryRepository,
                           DietProgressRepository dietProgressRepository, DietProductRepository dietProductRepository,
                           ProductsService productsService,DietRepository dietRepo){
        this._userDataService = userDataService;
        this._dietHistoryRepo = dietHistoryRepository;
        this._dietProgressRepo = dietProgressRepository;
        this._dietProductRepo = dietProductRepository;
        this._productService = productsService;
        this._dietRepo = dietRepo;
    }

    @Override
    public DietProgressDTO getCurrentDietProgress() {

        Optional<DietHistory> currentDietOp = _dietHistoryRepo.getUserCurrentDiet(_userDataService.getUserID());

        if(currentDietOp.isEmpty()){
            return null;
        }

        DietHistory currentDiet = currentDietOp.get();

        if(_checkIfDietFinished(currentDiet)){
            currentDiet.setCurrent(false);
            _dietHistoryRepo.save(currentDiet);
            return null;

        }

        DietProgressDTO progress = new DietProgressDTO();

        progress.setDietHistoryId(currentDiet.getId());
        progress.setDietGoal(currentDiet.getDiet().getDietGoal());
        progress.setKcal(currentDiet.getDiet().getKcal());

        List<DietProgress> currentDietProgress = _dietProgressRepo.getDietProgress(currentDiet.getId());

        List<DietProduct> currentDietProducts = _dietProductRepo.getDietProducts(currentDiet.getDiet().getId());

        Map<ZonedDateTime,List<DietProduct>> groupedProducts = currentDietProducts.stream().collect(Collectors.groupingBy(x->x.getDate()));

        List<DietProgressDay> progressDays = new ArrayList<>();

        int index = 0;

        ZonedDateTime firsDate = currentDiet.getFromDate();

        for(Map.Entry<ZonedDateTime,List<DietProduct>> entry : groupedProducts.entrySet()){
            DietProgressDay progressDay = new DietProgressDay();

            progressDay.setDate(firsDate.plusDays(index));

            List<DietProgressProductDTO> progressProductDTOList = new ArrayList<>();

            List<ProductBase> productBases = _productService.getProductBases(entry.getValue());


            for(ProductBase base : productBases){

                Optional<DietProgress> dateProgress = currentDietProgress.stream().filter(x->x.getDate().truncatedTo(ChronoUnit.DAYS).equals(entry.getKey().truncatedTo(ChronoUnit.DAYS))).findFirst();

                boolean consumed = false;

                if(dateProgress.isPresent()){
                    DietProgress value = dateProgress.get();

                    consumed = value.getProducts().stream().anyMatch(x-> UUID.fromString(x).equals(base.getProductId()));

                }
                DietProgressProductDTO dto = new DietProgressProductDTO(base,consumed);
                _setDietProductAmountAndMealType(currentDietProducts,base.getProductId(),dto);

                progressProductDTOList.add(dto);

            }


           progressDay.setProducts(progressProductDTOList);
           progressDays.add(progressDay);
           index++;

        }

        
        Collections.sort(progressDays, Comparator.comparing(DietProgressDay::getDate));
        progress.setDays(progressDays);

        return progress;
    }

    @Override
    public void updateDietProgress(UpdateDietProgress progress) {

        List<DietProgress> dietProgresses = _dietProgressRepo.getDietProgress(progress.getDietHistoryId());

        List<DietProgress> progressesToUpdate = new ArrayList<>();

        for(UpdateProgressDayDTO dto : progress.getProgress()){

            Optional<DietProgress> progressDay = dietProgresses.stream().filter(x->x.getDate().toInstant().atZone(ZoneId.systemDefault()).truncatedTo(ChronoUnit.DAYS).toEpochSecond() == dto.getDate().toInstant().atZone(ZoneId.systemDefault()).truncatedTo(ChronoUnit.DAYS).toEpochSecond()).findFirst();

            if(progressDay.isPresent()){
                List<String> products = progressDay.get().getProducts();

                for(ConsumedProductDTO product : dto.getProducts()){

                    Optional<String> productInList = products.stream().filter(x->x.equals(product.getProductId().toString())).findFirst();

                    if(product.isConsumed() && productInList.isEmpty()){
                        products.add(product.getProductId().toString());
                    }else if(productInList.isPresent() && !product.isConsumed()){
                        products.remove(productInList.get());
                    }
                }
                progressesToUpdate.add(progressDay.get());
            }else{
                DietProgress dietProgress = new DietProgress();

                DietHistory diet = new DietHistory();

                diet.setId(progress.getDietHistoryId());

                dietProgress.setDate(dto.getDate());

                dietProgress.setDietHistory(diet);

                dietProgress.setProducts(dto.getProducts().stream().filter(x->x.isConsumed()).map(x->x.getProductId().toString()).collect(Collectors.toList()));

                progressesToUpdate.add(dietProgress);
            }

        }

        _dietProgressRepo.saveAll(progressesToUpdate);
    }

    @Override
    public List<DietMetadata> getDietsMetadata() {

        List<Diet> diets = _dietRepo.getUserDiets(_userDataService.getUserID());

        Collections.sort(diets, Comparator.comparing(Diet::getCreatedAt).reversed());


        return diets.stream().map(x->new DietMetadata(x)). collect(Collectors.toList());
    }

    @Override
    public boolean anyActiveDiet() {
        return _dietHistoryRepo.getUserCurrentDiet(_userDataService.getUserID()).isPresent();
    }

    @Override
    public void setActiveDiet(SetActiveDietDTO data) {

        Optional<Diet> diet = _dietRepo.findById(data.getDietId());
        Optional<DietHistory> currentDiet = _dietHistoryRepo.getUserCurrentDiet(_userDataService.getUserID());

        List<DietHistory> dietHistoriesToUpdate = new ArrayList<>();

        if(currentDiet.isPresent()){
            currentDiet.get().setCurrent(false);
            dietHistoriesToUpdate.add(currentDiet.get());
        }

        if(!diet.isPresent()){
            return;
        }

        Diet dietValue = diet.get();
        User user = new User();
        user.setId(_userDataService.getUserID());

        DietHistory dietHistory = new DietHistory();

        dietHistory.setFromDate(data.getFromDate());
        dietHistory.setToDate(data.getFromDate().plusDays(dietValue.getDays()));
        dietHistory.setCurrent(true);
        dietHistory.setDiet(dietValue);
        dietHistoriesToUpdate.add(dietHistory);
        dietHistory.setUser(user);


        _dietHistoryRepo.saveAll(dietHistoriesToUpdate);
    }


    private void _setDietProductAmountAndMealType(List<DietProduct> products, UUID productId,DietProgressProductDTO dto){
        Optional<DietProduct> dietProduct = products.stream().filter(x->x.getProductId().equals(productId)).findFirst();

        if(dietProduct.isPresent()){
            DietProduct value = dietProduct.get();

            dto.setMealType(value.getMealType());
            dto.setAmount(value.getAmount());
        }

    }


    private boolean _checkIfDietFinished(DietHistory dietHistory){
        return dietHistory.getToDate().isBefore(ZonedDateTime.now(ZoneOffset.UTC));
    }
}
