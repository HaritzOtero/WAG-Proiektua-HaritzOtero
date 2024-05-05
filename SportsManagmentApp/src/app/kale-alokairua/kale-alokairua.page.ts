import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-kale-alokairua',
  templateUrl: './kale-alokairua.page.html',
  styleUrls: ['./kale-alokairua.page.scss'],
})
export class KaleAlokairuaPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }
  backClicked() {
    this.router.navigate(['/tabs/tab2']);
  }
}
