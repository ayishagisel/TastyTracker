import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { Meal } from './meal';
import { Restaurant } from './restaurant';
import { MealService } from './meal.service';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'meal-list',
  templateUrl: 'app/meal-list.component.html'
})
export class MealListComponent implements OnInit {
  meals: Meal[];
  selectedMeal: Meal;
  restaurants: Restaurant[];
  selectedRestaurant = 0;

  constructor(private router: Router,
              private mealService: MealService,
              private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurants = this.restaurantService.getList();
  }

  getMeals(id: number): void {
    if (!id) {
      return null;
    }
    this.meals = this.mealService.getList(id, '', '');
  }

  onSelect(value: string): void {
    let numValue = parseInt(value);

    if (numValue) {
      this.selectedRestaurant = numValue;
      this.getMeals(numValue);
    }
    else
    {
      this.selectedRestaurant = 0;
    }
  }

  save(amount: string, newtype: string, newdate: string, oldtype: string, olddate: string) {
    let mydate = moment(newdate, 'MM/DD/YYYY');

    newdate = mydate.format('YYYYMMDD');
    console.log('delete before save:', olddate, oldtype, this.selectedRestaurant);
    this.mealService.delete(olddate, oldtype, this.selectedRestaurant);

    console.log('save', amount, newdate, newtype, this.selectedRestaurant);
    this.mealService.create(newdate, newtype, this.selectedRestaurant, amount);
  }

  delete(mealtype: string, mealdate: string) {
    console.log('delete', mealdate, mealtype, this.selectedRestaurant);
    this.mealService.delete(mealdate, mealtype, this.selectedRestaurant);
    this.getMeals(this.selectedRestaurant); // refresh list
  }

  gotoMain(): void {
    this.router.navigateByUrl('/meal-entry');
  }

}