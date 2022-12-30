import { registerLocaleData } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { CustomIcon, IconFamily } from "@ibabylondev/custom-icon";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { combineLatest } from "rxjs";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";
import {
  AddCustomProductRes,
  GetAllProductsRes,
  ProductDTO,
  ProductsService,
} from "src/app/services/products/products.service";
//
import { BaseResponse } from "src/app/utilities/types";
import { SidemodalService } from "../../sidemodal/services/sidemodal.service";

@Component({
  selector: "products-table",
  templateUrl: "./products-table.component.html",
  styleUrls: ["./products-table.component.scss"],
})
// @Translate({ en: require('../i18n/products.en.json') })
export class ProductsTableComponent implements OnInit {
  @ViewChild("sidebar") public sideModal: TemplateRef<any> | undefined;
  @ViewChild("table") public table: MatTable<ProductDTO> | undefined;

  @Output()
  public deleteCustomProduct: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public allowOnlySelection: boolean = true;

  @Input()
  public ignoreProducts: string[] = [];

  public products: ProductDTO[] = [];

  public isDisabled: boolean = true;

  public productsToRender: ProductDTO[] = [];

  public productToEdit!: ProductDTO;

  public displayedColumns: string[] = [
    "actions",
    "name",
    "productGroup",
    "protein",
    "fat",
    "carbohydrates",
    "kJ",
    "kcal",
    "A",
    "B1",
    "B2",
    "PP",
    "C",
    "Ca",
    "P",
    "Fe",
  ];

  public editIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "pen-to-square"],
  };

  public exclamationIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "exclamation"],
  };

  constructor(
    private readonly _productsService: ProductsService,
    private readonly _sideModalService: SidemodalService,
    private readonly _translateService: TranslateService,
    private readonly _dialog: MatDialog,
    private readonly _toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this._productsService
      .getAllProducts()
      .subscribe((res: GetAllProductsRes) => {
        if (res.success) {
          this._productsService.parseProducts(res.result);
          this.products = res.result.filter(
            (x) => !this.ignoreProducts.includes(x.id)
          );
          this.productsToRender = this.products;
        }
      });
  }

  public addProductToList(product: ProductDTO) {
    this._productsService.parseProducts([product]);

    this.productsToRender.push(product);
    this.table?.renderRows();
  }

  public addCustomProduct(product: ProductDTO) {
    if (this.sideModal) {
      this._sideModalService.open(this.sideModal);
      this.productToEdit = product;
    }
  }

  public updateProduct(updateProduct: ProductDTO): void {
    this._productsService
      .customProductEdit(updateProduct)
      .subscribe((res: BaseResponse) => {
        if (res.success) {
          const newProductList = this.productsToRender.map((x) => {
            if (x.id === updateProduct.id) {
              return updateProduct;
            }
            return x;
          });

          this.productsToRender = newProductList;

          this._sideModalService.close();
          this._translateService
            .get("PRODUCTS_TABLE_PRODUCTS_UPDATE_TO_LIST")
            .subscribe((tran: string) => {
              console.log(tran);
              this._toastService.success(tran);
            });
        }
      });
  }

  public close() {
    this._sideModalService.close();
  }

  public selectAll(event: MatCheckboxChange) {
    for (let product of this.products) {
      product.selected = event.checked;
    }
  }

  public toggleSelect(event: MatCheckboxChange, product: ProductDTO) {
    product.selected = event.checked;
  }

  public getSelectedProducts(): ProductDTO[] {
    return this.products.filter((x) => x.selected);
  }

  public deleteCustomProducts() {
    const selectedCustomProducts = this.productsToRender
      .filter((x) => x.selected)
      .map((x) => x.id);

    combineLatest(
      this._translateService.get("PRODUCTS_TABLE_REMOVE_PRODUCTS"),
      this._translateService.get("PRODUCTS_TABLE_REMOVE_PRODUCTS_COUNT")
    ).subscribe(([title, text]: string[]) => {
      text = text.replace("...", selectedCustomProducts.length.toString());

      const ref = this._dialog.open(ConfirmationDialogComponent, {
        disableClose: true,
        data: { text: text, title: title },
      });

      ref.afterClosed().subscribe((proceed) => {
        if (proceed) {
          this._productsService
            .customProductDelete(selectedCustomProducts)
            .subscribe((res: BaseResponse) => {
              if (res.success) {
                this.productsToRender = this.productsToRender.filter(
                  (x) => !selectedCustomProducts.includes(x.id)
                );

                this._translateService
                  .get("PRODUCTS_TABLE_PRODUCTS_REMOVED_FROM_LIST")
                  .subscribe((tran: string) => {
                    this._toastService.success(tran);
                  });
              }
            });
        }
      });
    });
  }

  public delete(): void {
    this.deleteCustomProduct.emit(this.deleteCustomProducts());
  }
}
