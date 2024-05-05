import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gimnasio-erreserba',
  templateUrl: './gimnasio-erreserba.page.html',
  styleUrls: ['./gimnasio-erreserba.page.scss'],
})
export class GimnasioErreserbaPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }
  backClicked() {
    this.router.navigate(['/tabs/tab2']);
  }
}
