import { Component } from '@angular/core';
import { CarService } from '../carservice';
import { Car } from '../car';
import { LazyLoadEvent } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  providers: [MessageService],
})
export class MyComponent {
  cars: Car[];

  virtualCars: Car[] = Array.from({ length: 10000 });

  cols: any[] = [
    { field: 'id', header: 'Id' },
    { field: 'vin', header: 'Vin' },
    { field: 'year', header: 'Year' },
    { field: 'brand', header: 'Brand' },
    { field: 'color', header: 'Color' },
  ];

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit() {
    this.cars = Array.from({ length: 10000 }).map((_, i) =>
      this.carService.generateCar(i + 1)
    );
  }

  loadCarsLazy(event: LazyLoadEvent) {
    //simulate remote connection with a timeout
    setTimeout(() => {
      //load data of required page
      let loadedCars = this.cars.slice(event.first, event.first + event.rows);

      //populate page of virtual cars
      Array.prototype.splice.apply(this.virtualCars, [
        ...[event.first, event.rows],
        ...loadedCars,
      ]);

      //trigger change detection
      this.virtualCars = [...this.virtualCars];
    }, Math.random() * 1000 + 250);
  }

  navigate() {
    this.router.navigate(['/other']);
  }
}
