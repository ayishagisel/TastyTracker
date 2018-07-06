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
var router_1 = require("@angular/router");
var moment = require("moment");
var meal_service_1 = require("./meal.service");
var restaurant_service_1 = require("./restaurant.service");
var MealListComponent = /** @class */ (function () {
    function MealListComponent(router, mealService, restaurantService) {
        this.router = router;
        this.mealService = mealService;
        this.restaurantService = restaurantService;
        this.selectedRestaurant = 0;
    }
    MealListComponent.prototype.ngOnInit = function () {
        this.restaurants = this.restaurantService.getList();
    };
    MealListComponent.prototype.getMeals = function (id) {
        if (!id) {
            return null;
        }
        this.meals = this.mealService.getList(id, '', '');
    };
    MealListComponent.prototype.onSelect = function (value) {
        var numValue = parseInt(value);
        if (numValue) {
            this.selectedRestaurant = numValue;
            this.getMeals(numValue);
        }
        else {
            this.selectedRestaurant = 0;
        }
    };
    MealListComponent.prototype.save = function (amount, newtype, newdate, oldtype, olddate) {
        var mydate = moment(newdate, 'MM/DD/YYYY');
        newdate = mydate.format('YYYYMMDD');
        console.log('delete before save:', olddate, oldtype, this.selectedRestaurant);
        this.mealService.delete(olddate, oldtype, this.selectedRestaurant);
        console.log('save', amount, newdate, newtype, this.selectedRestaurant);
        this.mealService.create(newdate, newtype, this.selectedRestaurant, amount);
    };
    MealListComponent.prototype.delete = function (mealtype, mealdate) {
        console.log('delete', mealdate, mealtype, this.selectedRestaurant);
        this.mealService.delete(mealdate, mealtype, this.selectedRestaurant);
        this.getMeals(this.selectedRestaurant); // refresh list
    };
    MealListComponent.prototype.gotoMain = function () {
        this.router.navigateByUrl('/meal-entry');
    };
    var _a, _b;
    MealListComponent = __decorate([
        core_1.Component({
            selector: 'meal-list',
            templateUrl: 'app/meal-list.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, typeof (_a = typeof meal_service_1.MealService !== "undefined" && meal_service_1.MealService) === "function" && _a || Object, typeof (_b = typeof restaurant_service_1.RestaurantService !== "undefined" && restaurant_service_1.RestaurantService) === "function" && _b || Object])
    ], MealListComponent);
    return MealListComponent;
}());
exports.MealListComponent = MealListComponent;
//# sourceMappingURL=meal-list.component.js.map