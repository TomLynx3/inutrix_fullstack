import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomIcon, IconFamily } from '@ibabylondev/custom-icon';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable } from 'rxjs';
import { LookUpItemIDs } from 'src/app/utilities/constants';
import { BaseResponse } from 'src/app/utilities/types';
import { ProductGroupDTO } from '../products/products.service';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private readonly _controllerURL: string = '/api/meals';

  constructor(
    private readonly _http: HttpClient,
    private readonly _translateService: TranslateService
  ) {}

  public createDiet(dietGoal: DietGoal, days: number): Observable<GetDietRes> {
    return this._http.post<GetDietRes>(`${this._controllerURL}/create-diet`, {
      dietGoal,
      days,
    });
  }

  public saveDiet(diet: Diet): Observable<BaseResponse> {
    return this._http.post<BaseResponse>(
      `${this._controllerURL}/save-diet`,
      diet
    );
  }

  public castToDietMetadataListItems(diets: DietMetadataDTO[]) {
    const result: DietMetadataListItem[] = [];

    for (let diet of diets) {
      result.push(<DietMetadataListItem>{
        id: diet.id,
        name: diet.name,
        dietGoalName: this.getDietGoalTranslationItem(diet.dietGoal),
        color: this.getDietGoalContainerColor(diet.dietGoal),
        kcal: diet.kcal,
        createdAt: diet.createdAt,
        dietGoalIcon: this.getDietGoalIcon(diet.dietGoal),
        days: diet.days,
      });
    }
    return result;
  }

  public getDietGoalIcon(dietGoal: DietGoal) {
    switch (dietGoal) {
      case DietGoal.BALANCEDIET:
        return <CustomIcon>{
          iconFamily: IconFamily.PNG,
          value: ['assets/images/balanced.png'],
        };
      case DietGoal.MUSCLEGROWTH:
        return <CustomIcon>{
          iconFamily: IconFamily.PNG,
          value: ['assets/images/muscle.png'],
        };
      case DietGoal.WEIGHTLOSS:
        return <CustomIcon>{
          iconFamily: IconFamily.PNG,
          value: ['assets/images/weight_lose.png'],
        };
    }
  }

  public getUserDiets(): Observable<GetUsetDietsRes> {
    return this._http.get<GetUsetDietsRes>(`${this._controllerURL}/diets`);
  }

  public castDailyProductToListItem(
    products: DailyProduct[]
  ): ProductListItem[] {
    const res: ProductListItem[] = [];

    for (let item of products) {
      combineLatest(
        this._translateService.get(item.productGroup.groupName),
        this._translateService.get(item.name)
      ).subscribe(([groupName, name]: string[]) => {
        res.push(<ProductListItem>{
          id: item.productId,
          name: name,
          productGroupName: groupName,
          productGroupIcon: this.getPorductGroupIcon(item.productGroup.id),
          amount: this.castToGrams(item.amount),
          maxValue: this.castToGrams(item.amount),
          productGroup: item.productGroup,
        });
      });
    }

    return res;
  }

  public castToGrams(amount: number): number {
    return Math.round((amount * 100 + Number.EPSILON) * 100) / 100;
  }

  public getMealTypeTranslationItem(mealType: MealType) {
    switch (mealType) {
      case MealType.BREAKFAST:
        return 'COMMON_BREAKFAST';
      case MealType.LUNCH:
        return 'COMMON_LUNCH';
      case MealType.DINNER:
        return 'COMMON_DINNER';
    }
  }

  public getDietGoalTranslationItem(dietGoal: DietGoal) {
    switch (dietGoal) {
      case DietGoal.BALANCEDIET:
        return 'COMMON_BALANCED_DIET';
      case DietGoal.MUSCLEGROWTH:
        return 'COMMON_MUSCLE_GROWTH';
      case DietGoal.WEIGHTLOSS:
        return 'COMMON_WEIGHT_LOSS';
    }
  }

  public getDietGoalContainerColor(dietGoal: DietGoal) {
    switch (dietGoal) {
      case DietGoal.BALANCEDIET:
        return '#09d95f';
      case DietGoal.MUSCLEGROWTH:
        return '#d92109';
      case DietGoal.WEIGHTLOSS:
        return '#36f1cd';
    }
  }

  public getPorductGroupIcon(groupID: string): ColorfulIcon {
    switch (groupID) {
      case LookUpItemIDs.LookUp_ProductGroup_CerealProducts:
        return <ColorfulIcon>{
          icon: {
            iconFamily: IconFamily.FONTAWESOME,
            value: ['fas', 'wheat-awn'],
          },
          color: '#ECD816',
        };
      case LookUpItemIDs.LookUp_ProductGroup_Vegetables:
        return <ColorfulIcon>{
          icon: {
            iconFamily: IconFamily.FONTAWESOME,
            value: ['fas', 'carrot'],
          },
          color: '#57C991',
        };
      case LookUpItemIDs.LookUp_ProductGroup_MeatProducts:
        return <ColorfulIcon>{
          icon: {
            iconFamily: IconFamily.FONTAWESOME,
            value: ['fas', 'drumstick-bite'],
          },
          color: '#EC164E',
        };
      case LookUpItemIDs.LookUp_ProductGroup_FruitsAndBerries:
        return <ColorfulIcon>{
          icon: {
            iconFamily: IconFamily.FONTAWESOME,
            value: ['fas', 'apple-whole'],
          },
          color: '#EC16CC',
        };
      case LookUpItemIDs.LookUp_ProductGroup_ConfectioneryProducts:
        return <ColorfulIcon>{
          icon: {
            iconFamily: IconFamily.FONTAWESOME,
            value: ['fas', 'candy-cane'],
          },
          color: '#8B7D2C',
        };
      case LookUpItemIDs.LookUp_ProductGroup_EggProducts:
        return <ColorfulIcon>{
          icon: {
            iconFamily: IconFamily.FONTAWESOME,
            value: ['fas', 'egg'],
          },
          color: '#E7A825',
        };
      case LookUpItemIDs.LookUp_ProductGroup_MilkProducts:
        return <ColorfulIcon>{
          icon: {
            iconFamily: IconFamily.FONTAWESOME,
            value: ['fas', 'cow'],
          },
          color: '#25E1E7',
        };
      case LookUpItemIDs.LookUp_ProductGroup_Nuts:
        return <ColorfulIcon>{
          icon: {
            iconFamily: IconFamily.PNG,
            value: 'assets/images/walnut.png',
          },
          color: '#4EDF73',
        };
      case LookUpItemIDs.LookUp_ProductGroup_FatsAndOils:
        return <ColorfulIcon>{
          icon: {
            iconFamily: IconFamily.FONTAWESOME,
            value: ['fas', 'bottle-droplet'],
          },
          color: '#C4E725',
        };
      case LookUpItemIDs.LookUp_ProductGroup_FishProducts:
        return <ColorfulIcon>{
          icon: {
            iconFamily: IconFamily.FONTAWESOME,
            value: ['fas', 'fish'],
          },
          color: '#2587E7',
        };
      default:
        return <ColorfulIcon>{
          icon: { iconFamily: IconFamily.FONTAWESOME, value: ['fas', 'ban'] },
          color: '#dddddd',
        };
    }
  }
}

export interface MealDTO {
  mealType: MealType;
  products: DailyProduct[];
}

export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
}

export interface ProductListItem {
  id: string;
  name: string;
  productGroupIcon: ColorfulIcon;
  productGroupName: string;
  amount: number;
  maxValue: number;
  productGroup: ProductGroupDTO;
}

export interface ColorfulIcon {
  icon: CustomIcon;
  color: string;
}

export interface GetDietRes extends BaseResponse {
  result: Diet;
}

export interface DailyNutrientAmount {
  minimumValue: number;
  maximumValue: number;
  actualValue: number;
}

export interface DailyProduct {
  productId: string;
  name: string;
  amount: number;
  productGroup: ProductGroupDTO;
}

export interface ProductBase {
  productId: string;
  name: string;
  amount: number;
  productGroup: ProductGroupDTO;
  isCustom: boolean;
}

export interface DietDayMetadata {
  meals: MealDTO[];
  products: DailyProduct[];
  protein: DailyNutrientAmount;
  fat: DailyNutrientAmount;
  carbohydrates: DailyNutrientAmount;
  kcal: DailyNutrientAmount;
  A: DailyNutrientAmount;
  B1: DailyNutrientAmount;
  B2: DailyNutrientAmount;
  PP: DailyNutrientAmount;
  C: DailyNutrientAmount;
  Ca: DailyNutrientAmount;
  P: DailyNutrientAmount;
  Fe: DailyNutrientAmount;
}

export interface Diet {
  dietDays: DietDay[];
  dietDetails: DietDetails;
}

export interface DietDetails {
  dietGoal: DietGoal;
  details: Object;
}

export interface BalancedDietDetails {
  caloriesNeeded: number;
}
export interface DietDay {
  date: string;
  dietDayMetadata: DietDayMetadata;
}

export enum DietGoal {
  MUSCLEGROWTH = 'MUSCLEGROWTH',
  BALANCEDIET = 'BALANCEDIET',
  WEIGHTLOSS = 'WEIGHTLOSS',
}

export interface DietMetadataDTO {
  id: string;
  dietGoal: DietGoal;
  kcal: number;
  createdAt: string;
  name: string;
  days: number;
}

export interface DietMetadataListItem {
  id: string;
  name: string | null;
  dietGoalName: string;
  color: string;
  kcal: number;
  createdAt: string;
  dietGoalIcon: CustomIcon;
  days: number;
}

export interface GetUsetDietsRes extends BaseResponse {
  result: DietMetadataDTO[];
}
