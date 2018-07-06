"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var meal_entry_component_1 = require("./meal-entry.component");
var meal_list_component_1 = require("./meal-list.component");
var appRoutes = [
    { path: '', redirectTo: '/meal-entry', pathMatch: 'full' },
    { path: 'meal-entry', component: meal_entry_component_1.MealEntryComponent },
    { path: 'meal-list', component: meal_list_component_1.MealListComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map