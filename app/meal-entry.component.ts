import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { Meal } from './meal';
import { Restaurant } from './restaurant';
import { MealService } from './meal.service';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'meal-entry',
  templateUrl: 'app/meal-entry.component.html'
})
export class MealEntryComponent implements OnInit {
  showRestDiv = false;
  selectedRestaurant = '';
  meal = new Meal;
  restaurants: Restaurant[];
  thumper: number = 0;

  constructor(private router: Router,
              private restaurantService: RestaurantService,
              private mealService: MealService) {}

  ngOnInit(): void {
    let curdate = moment().format('MM/DD/YYYY');
    this.meal.date = curdate; // Storing in WRONG FORMAT for display reasons
    this.meal.name = 'B';
    this.meal.location = 0;
    this.restaurants = this.restaurantService.getList();
  }

  onSelect(value: string, label: string): void {
    let numValue = parseInt(value);

    console.log('select', numValue, label);
    if (numValue > 0) {
      this.selectedRestaurant = label;
    }
    else {
      this.selectedRestaurant = '';
    }
    this.meal.location = numValue;
  }

  update(id: string, name: string): void {
    let numID = parseInt(id);
    let newrest = new Restaurant;

    console.log('update', numID, name);
    newrest = this.restaurantService.update(numID, name);
    this.restaurants = this.restaurantService.getList();
    this.meal.location = newrest.id;
    this.selectedRestaurant = name;
    this.showRestDiv = false;
  }

  add(name: string): void {
    let newrest = new Restaurant;

    console.log('add', name);
    newrest = this.restaurantService.create(name);
    this.restaurants.push(newrest);
    this.meal.location = newrest.id;
    this.selectedRestaurant = name;
    this.showRestDiv = false;
  }

  delete(id: string): void {
    let numID = parseInt(id);

    console.log('delete', numID);
    this.restaurantService.delete(numID);
    // Also need to delete all meals for this restaurant, a meal service call
    this.restaurants = this.restaurantService.getList();
    this.meal.location = 0;
    this.selectedRestaurant = '';
    this.showRestDiv = false;
  }

  // Need to replace console logging with user-visible error indications
  save(): void {
    let mydate = moment(this.meal.date, 'MM/DD/YYYY');
    let newdate = '';
    let amtAsNum = parseFloat(this.meal.amount);

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

    console.log('save', this.meal.amount, this.meal.location,
                this.meal.name, this.meal.date);
    this.mealService.create(newdate, this.meal.name,
                            this.meal.location, this.meal.amount);

    // clear the amount for the next go - the rest of the fields can stay as is
    // this will also help prevent save button stutter
    this.meal.amount = '';

    // Thump the thumper
    this.thumper++;
  }

  showRestaurants(): void {
    this.showRestDiv = !this.showRestDiv;
  }

  gotoList(): void {
    this.router.navigateByUrl('/meal-list');
  }

}

