import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gimnasio-gestioa',
  templateUrl: './gimnasio-gestioa.page.html',
  styleUrls: ['./gimnasio-gestioa.page.scss'],
})
export class GimnasioGestioaPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }
  backClicked() {
    this.router.navigate(['/tabs/tab2']);
  }
}
