import { Component, OnInit } from "@angular/core";
import { CustomIcon, IconFamily } from "@ibabylondev/custom-icon";

@Component({
  selector: "app-calendar-hints",
  templateUrl: "./calendar-hints.component.html",
  styleUrls: ["./calendar-hints.component.scss"],
})
export class CalendarHintsComponent implements OnInit {
  constructor() {}

  public exMark: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "circle-exclamation"],
  };

  ngOnInit(): void {}
}
