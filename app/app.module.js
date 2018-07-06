"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_routing_1 = require("./app.routing");
var meal_service_1 = require("./meal.service");
var restaurant_service_1 = require("./restaurant.service");
var app_component_1 = require("./app.component");
var meal_entry_component_1 = require("./meal-entry.component");
var meal_list_component_1 = require("./meal-list.component");
var totals_component_1 = require("./totals.component");
var trends_component_1 = require("./trends.component");
var date_display_pipe_1 = require("./date-display.pipe");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, app_routing_1.routing],
            declarations: [app_component_1.AppComponent,
                meal_entry_component_1.MealEntryComponent,
                meal_list_component_1.MealListComponent,
                totals_component_1.TotalsComponent,
                trends_component_1.TrendsComponent,
                date_display_pipe_1.DateDisplayPipe],
            providers: [meal_service_1.MealService, restaurant_service_1.RestaurantService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map