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
var TotalsComponent = /** @class */ (function () {
    function TotalsComponent(mealService) {
        this.mealService = mealService;
        this.totalToday = 0;
        this.totalThisWeek = 0;
    }
    TotalsComponent.prototype.ngOnChanges = function () {
        this.getTotals();
    };
    TotalsComponent.prototype.getTotals = function () {
        var workdate = moment();
        var curdate = workdate.format('YYYYMMDD');
        this.totalToday = this.sumMeals(curdate);
        this.totalThisWeek = this.totalToday;
        for (var i = 0; i < 7; i++) {
            var curDailySum = 0;
            workdate.subtract(1, 'days');
            curdate = workdate.format('YYYYMMDD');
            curDailySum = this.sumMeals(curdate);
            this.totalThisWeek = this.totalThisWeek + curDailySum;
        }
    };
    TotalsComponent.prototype.sumMeals = function (curdate) {
        var meals = [];
        var curSum = 0;
        meals = this.mealService.getList(0, '', curdate);
        for (var m in meals) {
            curSum = curSum + parseFloat(meals[m].amount);
        }
        return curSum;
    };
    var _a;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TotalsComponent.prototype, "thumper", void 0);
    TotalsComponent = __decorate([
        core_1.Component({
            selector: 'totals',
            templateUrl: 'app/totals.component.html'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof meal_service_1.MealService !== "undefined" && meal_service_1.MealService) === "function" && _a || Object])
    ], TotalsComponent);
    return TotalsComponent;
}());
exports.TotalsComponent = TotalsComponent;
//# sourceMappingURL=totals.component.js.map