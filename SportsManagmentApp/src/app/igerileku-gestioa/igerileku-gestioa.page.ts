import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-igerileku-gestioa',
  templateUrl: './igerileku-gestioa.page.html',
  styleUrls: ['./igerileku-gestioa.page.scss'],
})
export class IgerilekuGestioaPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }
  backClicked() {
    this.router.navigate(['/tabs/tab2']);
  }
}
