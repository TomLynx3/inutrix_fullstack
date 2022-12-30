import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomIcon, IconFamily } from '@ibabylondev/custom-icon';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, combineLatest } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import {
  BannedProduct,
  GetBannedProductsRes,
  ProductDTO,
  ProductGroupDTO,
  ProductsService,
} from 'src/app/services/products/products.service';
import { BaseResponse } from 'src/app/utilities/types';
import { SidemodalService } from '../../sidemodal/services/sidemodal.service';
import { SideModalModule } from '../../sidemodal/sidemodal.module';
import { ProductsTableComponent } from '../products-table/products-table.component';

@Component({
  selector: 'product-ban-list',
  templateUrl: './ban-list.component.html',
  styleUrls: ['./ban-list.component.scss'],
})
export class BanListComponent implements OnInit {
  @ViewChild('sidebar') public sideBar: TemplateRef<any> | undefined;

  public displayedColumns: string[] = ['actions', 'name', 'productGroup'];

  public searchChange: Subject<SearchParams> = new Subject<SearchParams>();

  public addIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'plus'],
  };
  public deleteIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'trash'],
  };

  public searchIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'magnifying-glass'],
  };

  public bannedProducts: BannedProduct[] = [];

  constructor(
    private readonly _sideBarService: SidemodalService,
    private readonly _toastService: ToastrService,
    private readonly _translateService: TranslateService,
    private readonly _dialog: MatDialog,
    private readonly _productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.searchChange
      .pipe(debounceTime(300))
      .subscribe((params: SearchParams) => {
        const products: ProductDTO[] = [];
        const regex = new RegExp(params.input, 'i');
        for (let product of params.productTable.products) {
          if (
            product.name.match(regex) ||
            product.productGroup.groupName.match(regex)
          ) {
            products.push(product);
          }
        }
        params.productTable.productsToRender = products;
      });

    this._productService
      .getBannedProducts()
      .subscribe((res: GetBannedProductsRes) => {
        if (res.success) {
          this.bannedProducts = res.result;
          console.log(this.bannedProducts);
        }
      });
  }

  public openProductList(): void {
    if (this.sideBar) {
      this._sideBarService.open(this.sideBar, '1450px');
    }
  }

  public close(): void {
    this._sideBarService.close();
  }

  public selectItems(productTable: ProductsTableComponent) {
    const products: ProductDTO[] = productTable.getSelectedProducts();

    if (products.length <= 0) {
      this._translateService
        .get('PRODUCTS_BAN_PRODUCTS_NOT_SELECTED')
        .subscribe((tranx: string) => {
          this._toastService.warning(tranx);
        });
    } else {
      const selectedProducts = products.map(
        (x) =>
          <BannedProduct>{
            id: x.id,
            name: x.name,
            productGroup: x.productGroup,
            selected: false,
            isCustom: x.isCustom,
          }
      );

      this._productService
        .banProducts(selectedProducts)
        .subscribe((res: BaseResponse) => {
          if (res.success) {
            this.bannedProducts = this.bannedProducts.concat(selectedProducts);

            this._translateService
              .get('PRODUCTS_BAN_PRODUCTS_ADDED_TO_LIST')
              .subscribe((tran: string) => {
                this._toastService.success(tran);
                this._sideBarService.close();
              });
          }
        });
    }
  }

  public get bannedProductIds() {
    return this.bannedProducts.map((x) => x.id);
  }

  public onSearch(event: any, productTable: ProductsTableComponent) {
    this.searchChange.next({
      input: event.target.value,
      productTable: productTable,
    });
  }

  public removeProducts() {
    const selectedProducts = this.bannedProducts
      .filter((x) => x.selected)
      .map((x) => x.id);

    if (selectedProducts.length <= 0) {
      return;
    }

    combineLatest(
      this._translateService.get('PRODUCTS_BAN_REMOVE_PRODUCTS'),
      this._translateService.get('PRODUCTS_BAN_REMOVE_PRODUCTS_COUNT')
    ).subscribe(([title, text]: string[]) => {
      text = text.replace('...', selectedProducts.length.toString());

      const ref = this._dialog.open(ConfirmationDialogComponent, {
        disableClose: true,
        data: { text: text, title: title },
      });

      ref.afterClosed().subscribe((proceed) => {
        if (proceed) {
          this._productService
            .removeFromBanList(selectedProducts)
            .subscribe((res: BaseResponse) => {
              if (res.success) {
                this.bannedProducts = this.bannedProducts.filter(
                  (x) => !selectedProducts.includes(x.id)
                );

                this._translateService
                  .get('PRODUCTS_BAN_PRODUCTS_REMOVED_FROM_LIST')
                  .subscribe((tran: string) => {
                    this._toastService.success(tran);
                  });
              }
            });
        }
      });
    });
  }
}

export interface SearchParams {
  input: string;
  productTable: ProductsTableComponent;
}
