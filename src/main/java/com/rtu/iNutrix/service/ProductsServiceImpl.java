package com.rtu.iNutrix.service;

import com.rtu.iNutrix.models.DTO.Products.*;
import com.rtu.iNutrix.models.entities.BannedProduct;
import com.rtu.iNutrix.models.entities.DietProduct;
import com.rtu.iNutrix.models.entities.Product;
import com.rtu.iNutrix.models.entities.ProductCustom;
import com.rtu.iNutrix.repositories.BannedProductRepository;
import com.rtu.iNutrix.repositories.LookUpItemRepository;
import com.rtu.iNutrix.repositories.ProductCustomRepository;
import com.rtu.iNutrix.repositories.ProductRepository;
import com.rtu.iNutrix.service.interfaces.ProductsService;
import com.rtu.iNutrix.service.interfaces.UserDataService;
import com.rtu.iNutrix.utilities.constants.LookUpConstants;
import com.rtu.iNutrix.utilities.errors.ProductErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Component
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    private UserDataService _userDataService;
    @Autowired
    private ProductRepository _productsRepo;
    @Autowired
    private ProductCustomRepository _productsCustomRepo;
    @Autowired
    private LookUpItemRepository _lookUpItemRepo;


    @Autowired
    private BannedProductRepository _bannedProductRepo;


    @Override
    public List<ProductDTO> getAllProducts() {
        String userID = _userDataService.getUserID();
        List<ProductDTO> commonProducts = _productsRepo.findAll().stream().map(x-> new ProductDTO(x)).collect(Collectors.toList());
        List<ProductDTO> personalizedProducts = _productsCustomRepo.findUserActiveProducts(userID).stream().map(x-> new ProductDTO(x)).collect(Collectors.toList());
        List<ProductDTO> allProducts = Stream.concat(commonProducts.stream(), personalizedProducts.stream()).collect(Collectors.toList());
        _setIsBannedProduct(allProducts);
        return allProducts;
    }

    private void _setIsBannedProduct(List<ProductDTO> productDTOS){
        List<BannedProduct> bannedProducts = _bannedProductRepo.findByUser_id(_userDataService.getUserID());

        for(ProductDTO productDTO : productDTOS){

            Optional<BannedProduct> bannedProduct = bannedProducts.stream().filter(x ->x.getProductId().equals(productDTO.getId())).findFirst();

            if(bannedProduct.isPresent()) {
                productDTO.setBanned(true);

            }
        }
    }

    @Override
    public List<ProductDTO> getProducts(List<ProductInfoDTO> products) {

        List<ProductDTO> res = new ArrayList<>();

        List<UUID> customProducts = new ArrayList<>();
        List<UUID> regularProducts = new ArrayList<>();

        for(ProductInfoDTO info :products){
            if(info.isCustom()){
                customProducts.add(info.getId());
            }else{
                regularProducts.add(info.getId());
            }
        }

        res.addAll(_productsRepo.findAllById(regularProducts).stream().map(x->new ProductDTO(x)).collect(Collectors.toList()));
        res.addAll(_productsCustomRepo.findUserProductsByIds(_userDataService.getUserID(),customProducts).stream().map(x->new ProductDTO(x)).collect(Collectors.toList()));

        return res;
    }


    @Override
    public void banProducts(List<BannedProductDTO> products) {

        List<BannedProduct> entities = new ArrayList<>();

        for(BannedProductDTO product : products){
            BannedProduct productEntity = new BannedProduct();

            productEntity.setProductId(product.getId());
            productEntity.setCustomProduct(product.isCustom());
            productEntity.setUser(_userDataService.getUser());

            entities.add(productEntity);
        }

        _bannedProductRepo.saveAll(entities);
    }

    @Override
    public List<BannedProductDTO> getBannedProducts() throws ProductErrorCodes.SystemProductNotFoundException {


        List<BannedProductDTO> dtos = new ArrayList<>();

        List<BannedProduct> products  = _bannedProductRepo.findByUser_id(_userDataService.getUserID());

        List<BannedProduct> customProducts = new ArrayList<>();
        List<BannedProduct> systemProducts = new ArrayList<>();


        for(BannedProduct product : products){

            if(product.isCustomProduct()){
                customProducts.add(product);
            }else{
                systemProducts.add(product);
            }
        }

        List<Product> systemProductsInDb = _productsRepo.findAllById(systemProducts.stream().map(x->x.getProductId()).collect(Collectors.toList()));

        for(Product systemProduct : systemProductsInDb){
            dtos.add(new BannedProductDTO(systemProduct));
        }

        List<ProductCustom> customProductsInDb = _productsCustomRepo.findAllById(customProducts.stream().map(x->x.getProductId()).collect(Collectors.toList()));


        for(ProductCustom product : customProductsInDb){
            dtos.add(new BannedProductDTO(product));
        }


        return dtos;
    }


    @Override
    public void removeFromBanList(List<UUID> ids) {
        _bannedProductRepo.deleteByIdAndUserId(ids,_userDataService.getUserID());
    }

    @Override
    public List<ProductGroupDTO> getProductGroups() {
        return _lookUpItemRepo.getLookUpItemsByLookUpId(LookUpConstants.LookUp_ProductGroup).stream().map(x->new ProductGroupDTO(x)).collect(Collectors.toList());
    }

    @Override
    public List<ProductBase> getProductBases(List<DietProduct> dietProducts) {

        List<ProductBase> result = new ArrayList<>();

        List<UUID> regularProductIds = dietProducts.stream().filter(x->!x.isCustomProduct()).map(x->x.getProductId()).collect(Collectors.toList());
        List<UUID> customProductsIds = dietProducts.stream().filter(x->x.isCustomProduct()).map(x->x.getProductId()).collect(Collectors.toList());

        List<Product> regularProducts = _productsRepo.findAllById(regularProductIds);
        List<ProductCustom> customProducts = _productsCustomRepo.findAllById(customProductsIds);


        for(Product product : regularProducts){
            result.add(new ProductBase(product));
        }

        for (ProductCustom product: customProducts){
            result.add(new ProductBase(product));
        }


        return result;
    }


    @Override
    public UUID addCustomProduct(ProductDTO productDTO) {
        ProductCustom product = new ProductCustom(productDTO, _userDataService.getUser());
        _productsCustomRepo.save(product);
        return product.getId();
    }

    @Override
    public void deleteCustomProducts(List<UUID> productIds){
        _productsCustomRepo.deleteByIds(productIds);
    }

    @Override
    public void editCustomProduct(ProductDTO productDTO) {
        ProductCustom product = new ProductCustom(productDTO, _userDataService.getUser());
        product.setId(productDTO.getId());
        _productsCustomRepo.save(product);
    }

}
