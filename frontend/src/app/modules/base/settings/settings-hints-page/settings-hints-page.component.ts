import { Component, OnInit } from "@angular/core";
import { CustomIcon, IconFamily } from "@ibabylondev/custom-icon";

@Component({
  selector: "app-settings-hints-page",
  templateUrl: "./settings-hints-page.component.html",
  styleUrls: ["./settings-hints-page.component.scss"],
})
export class SettingsHintsPageComponent implements OnInit {
  constructor() {}

  public exMark: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "circle-exclamation"],
  };

  ngOnInit(): void {}
}
