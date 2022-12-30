import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CustomIcon, IconFamily } from "@ibabylondev/custom-icon";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";
import { MenuService } from "src/app/services/menu/menu.service";
import SwiperCore, { Pagination } from "swiper";
import { ProductsHintPageComponent } from "../../products/products-hint-page/products-hint-page.component";
import { SettingsHintsPageComponent } from "../settings/settings-hints-page/settings-hints-page.component";

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: "app-base",
  templateUrl: "./base.component.html",
  styleUrls: ["./base.component.scss"],
  animations: [
    trigger("openMenu", [
      state("opened", style({ width: "250px" })),
      state("closed", style({ width: "65px" })),
      transition("* => *", [animate(350)]),
    ]),
    trigger("openMenuContent", [
      state("opened", style({ marginLeft: "250px" })),
      state("closed", style({ marginLeft: "65px" })),
      transition("* => *", [animate(350)]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
// @Translate({ en: require('./i18n/base.en.json') })
export class BaseComponent implements OnInit {
  constructor(
    private readonly _router: Router,
    private readonly _menuService: MenuService,
    private readonly _dialog: MatDialog
  ) {}

  //need add current menu item

  public currentPage: UserMenuItem | undefined;

  public isMenuOpen: boolean = false;

  public infoIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "circle-info"],
  };

  public userMenu: UserMenuItem[] = [
    {
      icon: {
        iconFamily: IconFamily.FONTAWESOME,
        value: ["fas", "calendar-days"],
      },
      name: "BASE_USERMENU_CALENDAR",
      route: "/calendar",
    },
    {
      icon: {
        iconFamily: IconFamily.FONTAWESOME,
        value: ["fas", "plate-wheat"],
      },
      name: "BASE_USERMENU_PRODUCTS",
      route: "/products",
    },
    {
      icon: {
        iconFamily: IconFamily.FONTAWESOME,
        value: ["fas", "gear"],
      },
      name: "BASE_USERMENU_SETTINGS",
      route: "/settings",
    },
    {
      icon: {
        iconFamily: IconFamily.FONTAWESOME,
        value: ["fas", "bowl-food"],
      },
      name: "BASE_USERMENU_MEAL_PLANS",
      route: "/meal-plans",
    },
  ];

  ngOnInit(): void {
    this._menuService.currentRoute.subscribe((route: string) => {
      this.setActivePage(route);
    });

    const route = localStorage.getItem("route");

    if (route) {
      this.setActivePage(route);
    } else {
      this.currentPage = this.userMenu[0];

      this._router.navigate([this.currentPage.route]);
    }
  }

  private setActivePage(route: string) {
    const menuItem = this.userMenu.find((x) => x.route === route);

    if (menuItem) {
      this.currentPage = menuItem;
    }
  }

  public onHover(event: MouseEvent) {
    this.isMenuOpen = true;
  }
  public onMouseLeave(event: any) {
    this.isMenuOpen = false;
  }

  public navigate(menuItem: UserMenuItem) {
    this.currentPage = menuItem;
    this._router.navigate([menuItem.route]);
    localStorage.setItem("route", this.currentPage.route);
  }

  public showHint() {
    let component;

    if (this.currentPage?.route == "/products") {
      component = ProductsHintPageComponent;
    } else if (this.currentPage?.route == "/settings") {
      component = SettingsHintsPageComponent;
    }

    if (component) {
      this._dialog.open(component, {
        panelClass: "hints-dialog",
      });
    }
  }
}

export interface UserMenuItem {
  icon: CustomIcon;
  name: string;
  route: string;
}
