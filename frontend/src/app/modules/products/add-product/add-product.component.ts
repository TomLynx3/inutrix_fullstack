import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomIcon, IconFamily } from "@ibabylondev/custom-icon";
import {
  GetProductGroupsRes,
  ProductGroupDTO,
  ProductsService,
  ProductDTO,
} from "src/app/services/products/products.service";

@Component({
  selector: "add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  @Output() public submitProductForm: EventEmitter<ProductDTO> =
    new EventEmitter<ProductDTO>();

  @Output() public submitProductFormGroup: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  @Input()
  public t: string | undefined;

  @Output() public updateProductForm: EventEmitter<ProductDTO> =
    new EventEmitter<ProductDTO>();

  @Input()
  public editProduct: ProductDTO | undefined;

  public selectedActivityType: ProductGroupDTO | undefined;

  public selected: boolean = false;

  public nameIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "n"],
  };

  public typeIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "t"],
  };

  public proteinIcon: CustomIcon = {
    iconFamily: IconFamily.PNG,
    value: "assets/images/proteins.png",
  };

  public fatIcon: CustomIcon = {
    iconFamily: IconFamily.PNG,
    value: "assets/images/fat.png",
  };

  public carboIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "wheat-awn"],
  };

  public vitaminAIcon: CustomIcon = {
    iconFamily: IconFamily.PNG,
    value: "assets/images/vitamin-a.png",
  };

  public vitaminB1Icon: CustomIcon = {
    iconFamily: IconFamily.PNG,
    value: "assets/images/vitamin-b1.png",
  };

  public vitaminB2Icon: CustomIcon = {
    iconFamily: IconFamily.PNG,
    value: "assets/images/vitamin-b2.png",
  };

  public vitaminPPIcon: CustomIcon = {
    iconFamily: IconFamily.PNG,
    value: "assets/images/vitamins.png",
  };

  public vitaminCIcon: CustomIcon = {
    iconFamily: IconFamily.PNG,
    value: "assets/images/vitamin-c.png",
  };

  public ferrumIcon: CustomIcon = {
    iconFamily: IconFamily.PNG,
    value: "assets/images/ferrum.png",
  };

  public calciumIcon: CustomIcon = {
    iconFamily: IconFamily.PNG,
    value: "assets/images/calcium.png",
  };

  public calloryIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "c"],
  };

  public jIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "j"],
  };

  public productGroups: ProductGroupDTO[] = [];

  public productAddForm: FormGroup = new FormGroup({});

  constructor(private readonly _productsService: ProductsService) {}

  ngOnInit(): void {
    this._productsService
      .getProductGroups()
      .subscribe((res: GetProductGroupsRes) => {
        if (res.success) {
          this._productsService.parseProductsGroup(res.result);
          this.productGroups = res.result;
          if (!this.selectedActivityType) {
            this.selectedActivityType = this.productGroups[0];
          }
        }
      });
    this.productAddForm = new FormGroup({
      productName: new FormControl(
        this.editProduct?.name ? this.editProduct.name : "",
        [Validators.required]
      ),
      protein: new FormControl(
        this.editProduct?.protein ? this.editProduct.protein : "",
        [Validators.required]
      ),
      fat: new FormControl(this.editProduct?.fat ? this.editProduct.fat : "", [
        Validators.required,
      ]),
      carbohydrates: new FormControl(
        this.editProduct?.carbohydrates ? this.editProduct.carbohydrates : "",
        [Validators.required]
      ),
      kcal: new FormControl(
        this.editProduct?.kcal ? this.editProduct.kcal : "",
        [Validators.required]
      ),
      kj: new FormControl(this.editProduct?.kj ? this.editProduct.kj : "", [
        Validators.required,
      ]),
      a: new FormControl(this.editProduct?.a ? this.editProduct.a : "", [
        Validators.required,
      ]),
      b1: new FormControl(this.editProduct?.b1 ? this.editProduct.b1 : "", [
        Validators.required,
      ]),
      b2: new FormControl(this.editProduct?.b2 ? this.editProduct.b2 : "", [
        Validators.required,
      ]),
      pp: new FormControl(this.editProduct?.pp ? this.editProduct.pp : "", [
        Validators.required,
      ]),
      c: new FormControl(this.editProduct?.c ? this.editProduct.c : "", [
        Validators.required,
      ]),
      ca: new FormControl(this.editProduct?.ca ? this.editProduct.ca : "", [
        Validators.required,
      ]),
      p: new FormControl(this.editProduct?.p ? this.editProduct.p : "", [
        Validators.required,
      ]),
      fe: new FormControl(this.editProduct?.fe ? this.editProduct.fe : "", [
        Validators.required,
      ]),
    });

    this.getFormGroup();
  }

  public selectProductType(productGroupName: ProductGroupDTO) {
    this.selectedActivityType = productGroupName;
  }

  private getData(): ProductDTO {
    return {
      id: this.editProduct?.id ? this.editProduct?.id : "",
      name: this.productAddForm.controls.productName.value,
      protein: this.productAddForm.controls.protein.value,
      fat: this.productAddForm.controls.fat.value,
      carbohydrates: this.productAddForm.controls.carbohydrates.value,
      kcal: this.productAddForm.controls.kcal.value,
      kj: this.productAddForm.controls.kj.value,
      a: this.productAddForm.controls.a.value,
      b1: this.productAddForm.controls.b1.value,
      b2: this.productAddForm.controls.b2.value,
      pp: this.productAddForm.controls.pp.value,
      c: this.productAddForm.controls.c.value,
      ca: this.productAddForm.controls.ca.value,
      p: this.productAddForm.controls.p.value,
      fe: this.productAddForm.controls.fe.value,
      selected: this.selected,
      productGroup: this.selectedActivityType!,
      isCustom: true,
    };
  }

  public update(): void {
    this.updateProductForm.emit(this.getData());
  }

  public submit(): void {
    this.submitProductForm.emit(this.getData());
  }

  private getFormGroup(): void {
    this.submitProductFormGroup.emit(this.productAddForm);
  }
}
