"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var moment = require("moment");
var meal_service_1 = require("./meal.service");
var TrendsComponent = /** @class */ (function () {
    function TrendsComponent(mealService) {
        this.mealService = mealService;
        this.totalThisWeek = 0;
        this.totalLastWeek = 0;
        this.averageInterval = 'D';
        this.breakfastAverage = 0;
        this.lunchAverage = 0;
        this.dinnerAverage = 0;
        this.snackAverage = 0;
    }
    TrendsComponent.prototype.ngOnChanges = function () {
        this.getTotals();
        this.getAverages();
    };
    TrendsComponent.prototype.onSelect = function (interval) {
        this.averageInterval = interval;
        this.getAverages();
    };
    TrendsComponent.prototype.getTotals = function () {
        var workdate = moment();
        var date1;
        var date2;
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
    };
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
    TrendsComponent.prototype.getAverages = function () {
        var bSums = [];
        var lSums = [];
        var dSums = [];
        var sSums = [];
        var workdate = moment();
        var date1;
        var date2;
        var curSum = 0;
        this.breakfastAverage = 0;
        this.lunchAverage = 0;
        this.dinnerAverage = 0;
        this.snackAverage = 0;
        // DAILY
        if (this.averageInterval === 'D') {
            for (var c = 0; c < 365; c++) {
                date1 = workdate.format('YYYYMMDD');
                curSum = this.sumMeals(date1, null, 'B');
                if (curSum > 0) {
                    bSums.push(curSum);
                }
                curSum = this.sumMeals(date1, null, 'L');
                if (curSum > 0) {
                    lSums.push(curSum);
                }
                curSum = this.sumMeals(date1, null, 'D');
                if (curSum > 0) {
                    dSums.push(curSum);
                }
                curSum = this.sumMeals(date1, null, 'S');
                if (curSum > 0) {
                    sSums.push(curSum);
                }
                workdate.subtract(1, 'days');
            }
        }
        // WEEKLY
        if (this.averageInterval === 'W') {
            for (var c = 0; c < 52; c++) {
                date2 = workdate.format('YYYYMMDD');
                workdate.subtract(6, 'days');
                date1 = workdate.format('YYYYMMDD');
                curSum = this.sumMeals(date1, date2, 'B');
                if (curSum > 0) {
                    bSums.push(curSum);
                }
                curSum = this.sumMeals(date1, date2, 'L');
                if (curSum > 0) {
                    lSums.push(curSum);
                }
                curSum = this.sumMeals(date1, date2, 'D');
                if (curSum > 0) {
                    dSums.push(curSum);
                }
                curSum = this.sumMeals(date1, date2, 'S');
                if (curSum > 0) {
                    sSums.push(curSum);
                }
                workdate.subtract(1, 'days');
            }
        }
        // MONTHLY
        if (this.averageInterval === 'M') {
            for (var c = 0; c < 12; c++) {
                workdate.startOf('month');
                date1 = workdate.format('YYYYMMDD');
                workdate.endOf('month');
                date2 = workdate.format('YYYYMMDD');
                curSum = this.sumMeals(date1, date2, 'B');
                if (curSum > 0) {
                    bSums.push(curSum);
                }
                curSum = this.sumMeals(date1, date2, 'L');
                if (curSum > 0) {
                    lSums.push(curSum);
                }
                curSum = this.sumMeals(date1, date2, 'D');
                if (curSum > 0) {
                    dSums.push(curSum);
                }
                curSum = this.sumMeals(date1, date2, 'S');
                if (curSum > 0) {
                    sSums.push(curSum);
                }
                workdate.subtract(1, 'months');
            }
        }
        // Now average the arrays - but ONLY if they have items
        if (bSums.length > 0) {
            curSum = 0;
            for (var _i = 0, bSums_1 = bSums; _i < bSums_1.length; _i++) {
                var b = bSums_1[_i];
                curSum = curSum + b;
            }
            this.breakfastAverage = curSum / bSums.length;
        }
        if (lSums.length > 0) {
            curSum = 0;
            for (var _a = 0, lSums_1 = lSums; _a < lSums_1.length; _a++) {
                var l = lSums_1[_a];
                curSum = curSum + l;
            }
            this.lunchAverage = curSum / lSums.length;
        }
        if (dSums.length > 0) {
            curSum = 0;
            for (var _b = 0, dSums_1 = dSums; _b < dSums_1.length; _b++) {
                var d = dSums_1[_b];
                curSum = curSum + d;
            }
            this.dinnerAverage = curSum / dSums.length;
        }
        if (sSums.length > 0) {
            curSum = 0;
            for (var _c = 0, sSums_1 = sSums; _c < sSums_1.length; _c++) {
                var s = sSums_1[_c];
                curSum = curSum + s;
            }
            this.snackAverage = curSum / sSums.length;
        }
    }; // getAverages()
    TrendsComponent.prototype.sumMeals = function (date1, date2, mealtype) {
        var meals = [];
        var curSum = 0;
        var mt = '';
        if (mealtype) {
            mt = mealtype;
        }
        meals = this.mealService.getList(0, mt, date1, date2);
        for (var m in meals) {
            curSum = curSum + parseFloat(meals[m].amount);
        }
        return curSum;
    };
    var _a;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TrendsComponent.prototype, "thumper", void 0);
    TrendsComponent = __decorate([
        core_1.Component({
            selector: 'trends',
            templateUrl: 'app/trends.component.html'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof meal_service_1.MealService !== "undefined" && meal_service_1.MealService) === "function" && _a || Object])
    ], TrendsComponent);
    return TrendsComponent;
}());
exports.TrendsComponent = TrendsComponent;
//# sourceMappingURL=trends.component.js.map