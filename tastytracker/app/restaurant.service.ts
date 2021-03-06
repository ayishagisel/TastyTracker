import { Injectable } from '@angular/core';

import { Restaurant } from './restaurant';

@Injectable()
export class RestaurantService {

  getList(): Restaurant[] {
    let rests: Array<Restaurant> = [];

    for (let x = 0; x < localStorage.length; x++) {
      let rest = new Restaurant;
      let key = localStorage.key(x);
// Local storage keys for restaurants are named in the format
// TTR_N+ where N+ is the ID number of the restaurant
      let re = /^TTR_(\d+)$/;
      let results: Array<string>;

      if ((results = re.exec(key)) !== null) {
        rest.id = parseInt(results[1]);
        rest.name = localStorage.getItem(key);
        rests.push(rest);
	 } 
    }

    rests.sort(this.compare);
    return rests;
  }

  create(name: string): Restaurant {
    let rest = new Restaurant;
    let key = 'TTR_';
    let newid = 0;

    for (let x = 0; x < localStorage.length; x++) {
      let pk = localStorage.key(x);
      let re = /^TTR_(\d+)$/;
      let results: Array<string>;

      if ((results = re.exec(pk)) !== null) {
        let oldid = parseInt(results[1]);
        if (oldid > newid) {
          newid = oldid;
        }
      }
    }
    newid = newid + 1;
    key = key + newid.toString();
    localStorage.setItem(key, name);

    rest.id = newid;
    rest.name = name;

    return rest;
  }

  update(id: number, name: string): Restaurant {
    let rest = new Restaurant;
    let key = 'TTR_' + id.toString();

    localStorage.setItem(key, name);

    rest.id = id;
    rest.name = name;

    return rest;
  }

  delete(id: number): void {
    let key = 'TTR_' + id.toString();

    localStorage.removeItem(key);
    return null;
  }

  compare(a: Restaurant, b: Restaurant): number {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1; }
    return 0;
  }
}