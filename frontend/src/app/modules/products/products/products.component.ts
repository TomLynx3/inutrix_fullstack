import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { CustomIcon, IconFamily } from "@ibabylondev/custom-icon";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  AddCustomProductRes,
  GetAllProductsRes,
  ProductDTO,
  ProductsService,
} from "src/app/services/products/products.service";
import { SidemodalService } from "../../sidemodal/services/sidemodal.service";
import { BaseResponse } from "src/app/utilities/types";
import { ProductsTableComponent } from "../products-table/products-table.component";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  @ViewChild("sidebar") public sideModal: TemplateRef<any> | undefined;
  @ViewChild("productTable") public productTable:
    | ProductsTableComponent
    | undefined;

  constructor(
    private readonly _sideModalService: SidemodalService,
    private readonly _productsService: ProductsService,
    private readonly _translateService: TranslateService,
    private readonly _toastService: ToastrService
  ) {}

  public deleteIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "trash"],
  };
  public addIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "plus"],
  };

  public customProducts: ProductDTO[] = [];

  public productForm: FormGroup = new FormGroup({});

  ngOnInit(): void {}

  public addNewProduct() {
    if (this.sideModal) {
      this._sideModalService.open(this.sideModal);
    }
  }

  public close() {
    this._sideModalService.close();
  }

  public saveProduct(newProduct: ProductDTO): void {
    this._productsService
      .customProductAdd(newProduct)
      .subscribe((res: AddCustomProductRes) => {
        if (res.success) {
          newProduct.id = res.result;
          this.productTable?.addProductToList(newProduct);
          this._sideModalService.close();

          this._translateService
            .get("PRODUCTS_TABLE_PRODUCTS_ADDED_TO_LIST")
            .subscribe((tran: string) => {
              console.log(tran);
              this._toastService.success(tran);
            });
        }
      });
  }

  public saveProductFormGroup(form: FormGroup<any>) {
    this.productForm = form;
  }
}
