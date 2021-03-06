import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { routing } from './app.routing';

import { MealService } from './meal.service';
import { RestaurantService } from './restaurant.service';

import { AppComponent }  from './app.component';
import { MealEntryComponent } from './meal-entry.component';
import { MealListComponent } from './meal-list.component';
import { TotalsComponent } from './totals.component';
import { TrendsComponent } from './trends.component';
import { DatepickerComponent } from './datepicker.component';

import { DateDisplayPipe } from './date-display.pipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule, routing ],
  declarations: [ AppComponent,
                  MealEntryComponent,
                  MealListComponent,
                  TotalsComponent,
                  TrendsComponent,
                  DatepickerComponent,
                  DateDisplayPipe ],
  providers:    [ MealService, RestaurantService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}
