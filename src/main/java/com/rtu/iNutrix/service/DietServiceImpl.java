package com.rtu.iNutrix.service;

import com.rtu.iNutrix.models.DTO.Diet.*;
import com.rtu.iNutrix.models.DTO.Meals.DietMetadata;
import com.rtu.iNutrix.models.DTO.Meals.MealType;
import com.rtu.iNutrix.models.DTO.Products.ProductBase;
import com.rtu.iNutrix.models.DTO.Products.ProductDTO;
import com.rtu.iNutrix.models.DTO.Products.ProductInfoDTO;
import com.rtu.iNutrix.models.entities.*;
import com.rtu.iNutrix.repositories.*;
import com.rtu.iNutrix.service.interfaces.DietService;
import com.rtu.iNutrix.service.interfaces.ProductsService;
import com.rtu.iNutrix.service.interfaces.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
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

    private  final ConsumedProductRepository _consumedProductRepo;


    @Autowired
    public DietServiceImpl(UserDataService userDataService, DietHistoryRepository dietHistoryRepository,
                           DietProgressRepository dietProgressRepository, DietProductRepository dietProductRepository,
                           ProductsService productsService,DietRepository dietRepo, ConsumedProductRepository consumedProductRepository){
        this._userDataService = userDataService;
        this._dietHistoryRepo = dietHistoryRepository;
        this._dietProgressRepo = dietProgressRepository;
        this._dietProductRepo = dietProductRepository;
        this._productService = productsService;
        this._dietRepo = dietRepo;
        this._consumedProductRepo = consumedProductRepository;
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

            Map<MealType,List<DietProduct>> groupedByMealType = entry.getValue().stream().collect(Collectors.groupingBy(x->x.getMealType()));

            List<DietProgressProductDTO> progressProductDTOList = new ArrayList<>();
            for(Map.Entry<MealType,List<DietProduct>> innerEntry: groupedByMealType.entrySet()){


                List<ProductBase> productBases = _productService.getProductBases(innerEntry.getValue());

                for(ProductBase base : productBases){

                    Optional<DietProgress> dateProgress = currentDietProgress.stream().filter(x->x.getDate().truncatedTo(ChronoUnit.DAYS).equals(entry.getKey().truncatedTo(ChronoUnit.DAYS))).findFirst();

                    boolean consumed = false;

                    if(dateProgress.isPresent()){
                        DietProgress value = dateProgress.get(); 
                        consumed = value.getConsumedProducts().stream().anyMatch(x->base.getProductId().equals(x.getProductId()) && x.getMealType().equals(innerEntry.getKey()));
                    }
                    DietProgressProductDTO dto = new DietProgressProductDTO(base,consumed);
                    dto.setMealType(innerEntry.getKey());

                    _setDietProductAmount(innerEntry.getValue(),base.getProductId(),dto);

                    progressProductDTOList.add(dto);

                }
                progressDay.setProducts(progressProductDTOList);
            }

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

        List<ConsumedProduct> consumedProductsToUpdate = new ArrayList<>();
        List<ConsumedProduct> consumedProductsToRemove = new ArrayList<>();

        for(UpdateProgressDayDTO dto : progress.getProgress()){

            Optional<DietProgress> progressDay = dietProgresses.stream().filter(x->x.getDate().toInstant().atZone(ZoneId.systemDefault()).truncatedTo(ChronoUnit.DAYS).toEpochSecond() == dto.getDate().toInstant().atZone(ZoneId.systemDefault()).truncatedTo(ChronoUnit.DAYS).toEpochSecond()).findFirst();

            if(progressDay.isPresent()){
                List<ConsumedProduct> consumedProducts = progressDay.get().getConsumedProducts().stream().toList();

                for(ConsumedProductDTO product : dto.getProducts()) {
                    Optional<ConsumedProduct> productInList = consumedProducts .stream().filter(x->x.getProductId().equals(product.getProductId()) && product.getMealType().equals(x.getMealType())).findFirst();

                    if(product.isConsumed() && productInList.isEmpty()){
                        ConsumedProduct newProduct = new ConsumedProduct();

                        newProduct.setProductId(product.getProductId());

                        newProduct.setMealType(product.getMealType());

                        newProduct.setDietProgress(progressDay.get());

                        consumedProductsToUpdate.add(newProduct);


                    }else if(productInList.isPresent() && !product.isConsumed()){
                        consumedProductsToRemove.add(productInList.get());
                    }
                }
                progressesToUpdate.add(progressDay.get());

            }else{
                DietProgress dietProgress = new DietProgress();

                DietHistory diet = new DietHistory();

                diet.setId(progress.getDietHistoryId());

                dietProgress.setDate(dto.getDate());

                dietProgress.setDietHistory(diet);

                dietProgress.setConsumedProducts(dto.getProducts().stream().filter(x->x.isConsumed()).map(x->new ConsumedProduct(x,dietProgress)).collect(Collectors.toSet()));

                progressesToUpdate.add(dietProgress);
            }


        }
        _dietProgressRepo.saveAll(progressesToUpdate);
        _consumedProductRepo.saveAll(consumedProductsToUpdate);
        _consumedProductRepo.deleteAll(consumedProductsToRemove);

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


    private void _setDietProductAmount(List<DietProduct> products, UUID productId,DietProgressProductDTO dto){
        Optional<DietProduct> dietProduct = products.stream().filter(x->x.getProductId().equals(productId)).findFirst();

        if(dietProduct.isPresent()){
            DietProduct value = dietProduct.get();

            dto.setAmount(value.getAmount());
        }

    }

    private boolean _checkIfDietFinished(DietHistory dietHistory){
        return dietHistory.getToDate().isBefore(ZonedDateTime.now(ZoneOffset.UTC));
    }
}
