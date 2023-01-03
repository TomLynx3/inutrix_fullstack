import { Component, OnInit } from "@angular/core";
import { CustomIcon, IconFamily } from "@ibabylondev/custom-icon";

@Component({
  selector: "app-meal-plan-hint-page",
  templateUrl: "./meal-plan-hint-page.component.html",
  styleUrls: ["./meal-plan-hint-page.component.scss"],
})
export class MealPlanHintPageComponent implements OnInit {
  constructor() {}

  public exMark: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "circle-exclamation"],
  };

  ngOnInit(): void {}
}
