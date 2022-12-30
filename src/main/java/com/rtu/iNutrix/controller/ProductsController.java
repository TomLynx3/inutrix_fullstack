package com.rtu.iNutrix.controller;


import com.fasterxml.jackson.databind.ser.Serializers;
import com.rtu.iNutrix.models.BaseResponse;
import com.rtu.iNutrix.models.DTO.Products.BannedProductDTO;
import com.rtu.iNutrix.models.DTO.Products.ProductDTO;
import com.rtu.iNutrix.service.interfaces.ProductsService;
import com.rtu.iNutrix.utilities.errors.ProductErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductsController {

    @Autowired
    private ProductsService _productsService;

    @GetMapping("")
    public BaseResponse getProducts(){
        BaseResponse res = new BaseResponse();

        res.setResult(_productsService.getAllProducts());
        res.setSuccess(true);
        return res;
    }

    @PostMapping("/ban-products")
    public BaseResponse banProducts(@RequestBody @Valid List<BannedProductDTO> products){
        BaseResponse res = new BaseResponse();


        _productsService.banProducts(products);
        res.setSuccess(true);

        return res;
    }

    @GetMapping("/ban-products")
    public  BaseResponse getBannedProducts() throws ProductErrorCodes.SystemProductNotFoundException {
        BaseResponse res = new BaseResponse();

        res.setResult(_productsService.getBannedProducts());
        res.setSuccess(true);

        return res;
    }


    @PostMapping("/ban-products-remove")
    public BaseResponse removeFromBanList(@RequestBody List<UUID> ids){
        BaseResponse res =  new BaseResponse();

        _productsService.removeFromBanList(ids);
        res.setSuccess(true);

        return res;
    }

    @PostMapping("/custom-product-add")
    public BaseResponse customProductAdd(@RequestBody @Valid ProductDTO productDTO) {
        BaseResponse res = new BaseResponse();
        res.setResult( _productsService.addCustomProduct(productDTO));
        res.setSuccess(true);
        return res;
    }

    @PostMapping("/custom-product-delete")
    public BaseResponse customProductDelete(@RequestBody @Valid  List<UUID> productIds) {
        BaseResponse res = new BaseResponse();
        _productsService.deleteCustomProducts(productIds);
        res.setSuccess(true);
        return res;
    }

    @PostMapping("/custom-product-edit")
    public BaseResponse customProductEdit(@RequestBody @Valid ProductDTO productDTO) {
        BaseResponse res = new BaseResponse();
        _productsService.editCustomProduct(productDTO);
        res.setSuccess(true);
        return res;
    }


    @GetMapping("/product-groups")
    public BaseResponse getProductGroups(){
        BaseResponse res=  new BaseResponse();

       res.setResult(_productsService.getProductGroups());
       res.setSuccess(true);

        return res;
    }

}
