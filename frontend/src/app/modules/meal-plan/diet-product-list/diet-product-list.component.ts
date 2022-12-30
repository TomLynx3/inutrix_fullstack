import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  DailyProduct,
  MealDTO,
  MealService,
  ProductListItem,
} from 'src/app/services/meal-service/meal.service';

@Component({
  selector: 'diet-product-list',
  templateUrl: './diet-product-list.component.html',
  styleUrls: ['./diet-product-list.component.scss'],
})
export class DietProductListComponent implements OnInit, OnChanges {
  @Input()
  public productListItems: ProductListItem[] = [];

  @Input()
  public allowDragAndDrop: boolean = false;

  constructor(private readonly _mealService: MealService) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}

  public onDrop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const product: ProductListItem =
        event.previousContainer.data[event.previousIndex];

      if (product) {
        const listItem = this.productListItems.find((x) => x.id === product.id);

        if (listItem) {
          listItem.amount += product.amount;
        }

        transferArrayItem(
          event.previousContainer.data,
          [],
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }
}
