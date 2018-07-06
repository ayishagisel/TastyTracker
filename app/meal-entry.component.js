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
var meal_1 = require("./meal");
var restaurant_1 = require("./restaurant");
var meal_service_1 = require("./meal.service");
var restaurant_service_1 = require("./restaurant.service");
var MealEntryComponent = /** @class */ (function () {
    function MealEntryComponent(router, restaurantService, mealService) {
        this.router = router;
        this.restaurantService = restaurantService;
        this.mealService = mealService;
        this.showRestDiv = false;
        this.selectedRestaurant = '';
        this.meal = new meal_1.Meal;
        this.thumper = 0;
    }
    MealEntryComponent.prototype.ngOnInit = function () {
        var curdate = moment().format('MM/DD/YYYY');
        this.meal.date = curdate; // Storing in WRONG FORMAT for display reasons
        this.meal.name = 'B';
        this.meal.location = 0;
        this.restaurants = this.restaurantService.getList();
    };
    MealEntryComponent.prototype.onSelect = function (value, label) {
        var numValue = parseInt(value);
        console.log('select', numValue, label);
        if (numValue > 0) {
            this.selectedRestaurant = label;
        }
        else {
            this.selectedRestaurant = '';
        }
        this.meal.location = numValue;
    };
    MealEntryComponent.prototype.update = function (id, name) {
        var numID = parseInt(id);
        var newrest = new restaurant_1.Restaurant;
        console.log('update', numID, name);
        newrest = this.restaurantService.update(numID, name);
        this.restaurants = this.restaurantService.getList();
        this.meal.location = newrest.id;
        this.selectedRestaurant = name;
        this.showRestDiv = false;
    };
    MealEntryComponent.prototype.add = function (name) {
        var newrest = new restaurant_1.Restaurant;
        console.log('add', name);
        newrest = this.restaurantService.create(name);
        this.restaurants.push(newrest);
        this.meal.location = newrest.id;
        this.selectedRestaurant = name;
        this.showRestDiv = false;
    };
    MealEntryComponent.prototype.delete = function (id) {
        var numID = parseInt(id);
        console.log('delete', numID);
        this.restaurantService.delete(numID);
        // Also need to delete all meals for this restaurant, a meal service call
        this.restaurants = this.restaurantService.getList();
        this.meal.location = 0;
        this.selectedRestaurant = '';
        this.showRestDiv = false;
    };
    // Need to replace console logging with user-visible error indications
    MealEntryComponent.prototype.save = function () {
        var mydate = moment(this.meal.date, 'MM/DD/YYYY');
        var newdate = '';
        var amtAsNum = parseFloat(this.meal.amount);
        if (isNaN(amtAsNum)) {
            console.log('amount is empty or not a number');
            return null;
        }
        else {
            if (amtAsNum <= 0) {
                console.log('amount must be positive/nonzero');
                return null;
            }
        }
        if (!this.meal.name) {
            console.log('invalid meal type');
            return null;
        }
        if (!this.meal.location) {
            console.log('invalid restaurant');
            return null;
        }
        if (!this.meal.date || !mydate.isValid()) {
            console.log('invalid date');
            return null;
        }
        // If here then do actual stuff
        newdate = mydate.format('YYYYMMDD');
        console.log('save', this.meal.amount, this.meal.location, this.meal.name, this.meal.date);
        this.mealService.create(newdate, this.meal.name, this.meal.location, this.meal.amount);
        // clear the amount for the next go - the rest of the fields can stay as is
        // this will also help prevent save button stutter
        this.meal.amount = '';
        // Thump the thumper
        this.thumper++;
    };
    MealEntryComponent.prototype.showRestaurants = function () {
        this.showRestDiv = !this.showRestDiv;
    };
    MealEntryComponent.prototype.gotoList = function () {
        this.router.navigateByUrl('/meal-list');
    };
    var _a, _b;
    MealEntryComponent = __decorate([
        core_1.Component({
            selector: 'meal-entry',
            templateUrl: 'app/meal-entry.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, typeof (_a = typeof restaurant_service_1.RestaurantService !== "undefined" && restaurant_service_1.RestaurantService) === "function" && _a || Object, typeof (_b = typeof meal_service_1.MealService !== "undefined" && meal_service_1.MealService) === "function" && _b || Object])
    ], MealEntryComponent);
    return MealEntryComponent;
}());
exports.MealEntryComponent = MealEntryComponent;
//# sourceMappingURL=meal-entry.component.js.map