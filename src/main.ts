import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
  `,
})
export class App implements OnInit{
  name = 'Angular';
  values: number[] = [];
  errorMessage!: string;

  constructor() {}

  ngOnInit(): void {
    // Create an observable
    const myObservable = new Observable((observer: Observer<number>) => {
      for (let i = 0; i <= 5; i++) {
        observer.next(i);
        console.log(i); // Log the emitted value
      }
      observer.error('An error occurred');
      observer.complete();
    });

    // Create an observer
    const myObserver: Observer<number> = {
      next: value => {this.values.push(value);
      console.log(this.values)},
      error: err => {this.errorMessage = err;
      console.log(this.errorMessage);},
      complete: () => console.log('Observable completed')
    };

    // Subscribe to the observable using the observer
    myObservable.subscribe(myObserver);
  }
}

bootstrapApplication(App);


