import { Component, OnChanges, Input } from '@angular/core';

import * as moment from 'moment';

import { Meal } from './meal';
import { MealService } from './meal.service';

@Component({
  selector: 'totals',
  templateUrl: 'app/totals.component.html'
})
export class TotalsComponent implements OnChanges {
  @Input() thumper: number;
  totalToday: number = 0;
  totalThisWeek: number = 0;

  constructor(private mealService: MealService) {}

  ngOnChanges(): void {
    this.getTotals();
  }

  getTotals(): void {
    let workdate = moment();
    let curdate = workdate.format('YYYYMMDD');

    this.totalToday = this.sumMeals(curdate);

    this.totalThisWeek = this.totalToday;
    for (let i = 1; i < 7; i++) {
      let curDailySum: number = 0;
      workdate.subtract(1, 'days');
      curdate = workdate.format('YYYYMMDD');
      curDailySum = this.sumMeals(curdate);
      this.totalThisWeek = this.totalThisWeek + curDailySum;
    }
  }

  sumMeals(curdate: string): number {
    let meals: Array<Meal> = [];
    let curSum: number = 0;
    meals = this.mealService.getList(0, '', curdate);
    for (let m in meals) {
      curSum = curSum + parseFloat(meals[m].amount);
    }
    return curSum;
  }

}
