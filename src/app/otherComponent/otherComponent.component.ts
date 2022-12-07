import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-component',
  templateUrl: './otherComponent.component.html',
})
export class OtherComponent {
  constructor(private router: Router) {}

  navigate() {
    this.router.navigate(['/']);
  }
}
