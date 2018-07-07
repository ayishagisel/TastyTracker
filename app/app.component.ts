import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
            <header style="background-color: #00746B">
            <h1>{{title}}</h1>
            </header>

            <router-outlet></router-outlet>
            `
})
export class AppComponent {
  title = 'TastyTracker';
}