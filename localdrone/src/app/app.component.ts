import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  services: string[] = [
    'Aerial Photography',
    'Drone Videography',
    'Real Estate Drone Tours',
    'Agricultural Drone Services',
    'Delivery Drones',
    'Inspection Drones'
  ];
}
