import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public userId: string;

  constructor() {
    this.userId = ''; // Inicializamos la variable userId aquí
  }
}
