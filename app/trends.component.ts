import { Component, OnChanges, Input } from '@angular/core';

import * as moment from 'moment';

import { Meal } from './meal';
import { MealService } from './meal.service';

@Component({
  selector: 'trends',
  templateUrl: 'app/trends.component.html'
})
export class TrendsComponent implements OnChanges {
  @Input() thumper: number;
  totalThisWeek: number = 0;
  totalLastWeek: number = 0;
  averageInterval: string = 'D';
  breakfastAverage: number = 0;
  lunchAverage: number = 0;
  dinnerAverage: number = 0;
  snackAverage: number = 0;

  constructor(private mealService: MealService) {}

  ngOnChanges(): void {
    this.getTotals();
    this.getAverages();
  }

  onSelect(interval: string): void {
    this.averageInterval = interval;
    this.getAverages();
  }

  getTotals(): void {
    let workdate = moment();
    let date1: string;
    let date2: string;

    this.totalThisWeek = 0;
    this.totalLastWeek = 0;

    // Note that these are being assigned backward on purpose.
    // date1 is the EARLIER date of the two in the week range.
    date2 = workdate.format('YYYYMMDD');
    workdate.subtract(6, 'days');
    date1 = workdate.format('YYYYMMDD');
    this.totalThisWeek = this.sumMeals(date1, date2);

    workdate.subtract(1, 'days'); // so the ranges don't overlap

    date2 = workdate.format('YYYYMMDD');
    workdate.subtract(6, 'days');
    date1 = workdate.format('YYYYMMDD');
    this.totalLastWeek = this.sumMeals(date1, date2);
  }

/* DAILY
 1. Retrieve and sum all records for day-by-meal (4x per day)
 2. Push day-by-meal sum onto sums-by-meal array (4x)
 3. Repeat steps 1 and 2 back 364 more days
 4. Get average for each of the sums-by-meal arrays (4x) */
/* WEEKLY
 1. Get date range for week (e.g. 20160901-20160907)
 2. Retrieve and sum all records for week-by-meal (4x per week)
 3. Push week-by-meal sum onto sums-by-meal array (4x)
 4. Repeat steps 1-3 back 51 more weeks
 5. Get average for each of the sums-by-meal arrays (4x) */
/* MONTHLY
 1. Get date range for calendar month (e.g. 20160901-20160930)
 2. Retrieve and sum all records for month-by-meal (4x per month)
 3. Push month-by-meal sum onto sums-by-meal array (4x)
 4. Repeat steps 1-3 back 11 more months
 5. Get average for each of the sums-by-meal arrays (4x) */

  getAverages(): void {
    let bSums: Array<number> = [];
    let lSums: Array<number> = [];
    let dSums: Array<number> = [];
    let sSums: Array<number> = [];
    let workdate = moment();
    let date1: string;
    let date2: string;
    let curSum = 0;

    this.breakfastAverage = 0;
    this.lunchAverage = 0;
    this.dinnerAverage = 0;
    this.snackAverage = 0;

    // DAILY
    if (this.averageInterval === 'D') {
      for (let c = 0; c < 365; c++) {
        date1 = workdate.format('YYYYMMDD');
        curSum = this.sumMeals(date1, null, 'B');
        if (curSum > 0) { bSums.push(curSum); }
        curSum = this.sumMeals(date1, null, 'L');
        if (curSum > 0) { lSums.push(curSum); }
        curSum = this.sumMeals(date1, null, 'D');
        if (curSum > 0) { dSums.push(curSum); }
        curSum = this.sumMeals(date1, null, 'S');
        if (curSum > 0) { sSums.push(curSum); }
        workdate.subtract(1, 'days');
      }
    }

    // WEEKLY
    if (this.averageInterval === 'W') {
      for (let c = 0; c < 52; c++) {
        date2 = workdate.format('YYYYMMDD');
        workdate.subtract(6, 'days');
        date1 = workdate.format('YYYYMMDD');
        curSum = this.sumMeals(date1, date2, 'B');
        if (curSum > 0) { bSums.push(curSum); }
        curSum = this.sumMeals(date1, date2, 'L');
        if (curSum > 0) { lSums.push(curSum); }
        curSum = this.sumMeals(date1, date2, 'D');
        if (curSum > 0) { dSums.push(curSum); }
        curSum = this.sumMeals(date1, date2, 'S');
        if (curSum > 0) { sSums.push(curSum); }
        workdate.subtract(1, 'days');
      }
    }

    // MONTHLY
    if (this.averageInterval === 'M') {
      for (let c = 0; c < 12; c++) {
        workdate.startOf('month');
        date1 = workdate.format('YYYYMMDD');
        workdate.endOf('month');
        date2 = workdate.format('YYYYMMDD');
        curSum = this.sumMeals(date1, date2, 'B');
        if (curSum > 0) { bSums.push(curSum); }
        curSum = this.sumMeals(date1, date2, 'L');
        if (curSum > 0) { lSums.push(curSum); }
        curSum = this.sumMeals(date1, date2, 'D');
        if (curSum > 0) { dSums.push(curSum); }
        curSum = this.sumMeals(date1, date2, 'S');
        if (curSum > 0) { sSums.push(curSum); }
        workdate.subtract(1, 'months');
      }
    }

    // Now average the arrays - but ONLY if they have items

    if (bSums.length > 0) {
      curSum = 0;
      for (let b of bSums) { curSum = curSum + b; }
      this.breakfastAverage = curSum / bSums.length;
    }
    if (lSums.length > 0) {
      curSum = 0;
      for (let l of lSums) { curSum = curSum + l; }
      this.lunchAverage = curSum / lSums.length;
    }
    if (dSums.length > 0) {
      curSum = 0;
      for (let d of dSums) { curSum = curSum + d; }
      this.dinnerAverage = curSum / dSums.length;
    }
    if (sSums.length > 0) {
      curSum = 0;
      for (let s of sSums) { curSum = curSum + s; }
      this.snackAverage = curSum / sSums.length;
    }
  } // getAverages()

  sumMeals(date1: string, date2?: string, mealtype?: string): number {
    let meals: Array<Meal> = [];
    let curSum = 0;
    let mt = '';

    if (mealtype) {
      mt = mealtype;
    }
    meals = this.mealService.getList(0, mt, date1, date2);
    for (let m in meals) {
      curSum = curSum + parseFloat(meals[m].amount);
    }
    return curSum;
  }

}