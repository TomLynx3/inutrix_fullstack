import { Component, OnInit } from "@angular/core";
import { CustomIcon, IconFamily } from "@ibabylondev/custom-icon";

@Component({
  selector: "app-products-hint-page",
  templateUrl: "./products-hint-page.component.html",
  styleUrls: ["./products-hint-page.component.scss"],
})
export class ProductsHintPageComponent implements OnInit {
  public exMark: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "circle-exclamation"],
  };
  constructor() {}

  ngOnInit(): void {}
}
