import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  constructor() {}

  public currentRoute: Subject<string> = new Subject<string>();

  public updatePage(route: string) {
    this.currentRoute.next(route);
  }
}
