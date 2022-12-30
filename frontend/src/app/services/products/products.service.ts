import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/utilities/types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _controllerURL = '/api/products';

  constructor(private readonly _http: HttpClient) {}

  public getAllProducts(): Observable<GetAllProductsRes> {
    return this._http.get<GetAllProductsRes>(this._controllerURL);
  }

  public getProductGroups(): Observable<GetProductGroupsRes> {
    return this._http.get<GetProductGroupsRes>(
      `${this._controllerURL}/product-groups`
    );
  }

  public parseProducts(products: ProductDTO[]) {
    for (let item of products) {
      // this._translateService.get(item.name).subscribe((trans: string) => {
      //   //console.log(trans);
      //   item.name = trans;
      // });
      // this._translateService
      //   .get(item.productGroup.groupName)
      //   .subscribe((trans: string) => {
      //     item.productGroup.groupName = trans;
      //   });
    }
  }

  public parseProductsGroup(products: ProductGroupDTO[]) {
    for (let item of products) {
      // this._translateService.get(item.groupName).subscribe((trans: string) => {
      //   item.groupName = trans;
      // });
    }
  }

  public banProducts(products: BannedProduct[]): Observable<BaseResponse> {
    return this._http.post<BaseResponse>(
      `${this._controllerURL}/ban-products`,
      products
    );
  }

  public getBannedProducts(): Observable<GetBannedProductsRes> {
    return this._http.get<GetBannedProductsRes>(
      `${this._controllerURL}/ban-products`
    );
  }

  public removeFromBanList(ids: string[]): Observable<BaseResponse> {
    return this._http.post<BaseResponse>(
      `${this._controllerURL}/ban-products-remove`,
      ids
    );
  }

  public customProductAdd(
    product: ProductDTO
  ): Observable<AddCustomProductRes> {
    return this._http.post<AddCustomProductRes>(
      `${this._controllerURL}/custom-product-add`,
      product
    );
  }

  public customProductDelete(productIds: string[]): Observable<BaseResponse> {
    return this._http.post<BaseResponse>(
      `${this._controllerURL}/custom-product-delete`,
      productIds
    );
  }

  public customProductEdit(product: ProductDTO): Observable<BaseResponse> {
    return this._http.post<BaseResponse>(
      `${this._controllerURL}/custom-product-edit`,
      product
    );
  }
}

export interface BannedProduct {
  id: string;
  name: string;
  productGroup: ProductGroupDTO;
  isCustom: boolean;
  selected: boolean;
}

export interface GetProductGroupsRes extends BaseResponse {
  result: ProductGroupDTO[];
}

export interface GetAllProductsRes extends BaseResponse {
  result: ProductDTO[];
}

export interface GetBannedProductsRes extends BaseResponse {
  result: BannedProduct[];
}

export interface ProductGroupDTO {
  groupName: string;
  id: string;
}

export interface AddCustomProductRes extends BaseResponse {
  result: string;
}

export interface ProductDTO {
  id: string;
  productGroup: ProductGroupDTO;
  name: string;
  protein: number;
  fat: number;
  carbohydrates: number;
  kcal: number;
  kj: number;
  a: number;
  b1: number;
  b2: number;
  pp: number;
  c: number;
  ca: number;
  p: number;
  fe: number;
  selected: boolean;
  isCustom: boolean;
}
