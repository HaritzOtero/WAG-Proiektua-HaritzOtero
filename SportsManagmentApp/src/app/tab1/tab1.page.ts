import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {}
  
  ngOnInit() {
    this.http.delete<any[]>('http://localhost:8000/api/GimnasioErreserbaZaharrakEzabatu').subscribe(
      (response: any[]) => {
      },
      error => {
      }
    );

    this.http.delete<any[]>('http://localhost:8000/api/IgerrilekuErreserbaZaharrakEzabatu').subscribe(
      (response: any[]) => {
        console.log('Gimnasio erreserba zaharrak ezabatuta');
      },
      error => {
        console.error('Errorea gimnasio erreserba zaharrak ezabatzerakoan:', error);
      }
    );
  }

  registerClicked() {
    this.router.navigate(['/tabs/tab3']);
  }

  async loginClicked() {
    const gmail = (document.querySelector('.email') as HTMLInputElement).value.trim();
    const password = (document.querySelector('.pasahitza') as HTMLInputElement).value.trim();

    this.http.get<any>('http://localhost:8000/api/usuarioasGetByGmail/' + gmail).subscribe(
      async (response: any) => {
        if (response.password === password) {
          // Obtener el ID del usuario
          var userId = response.id;
          await this.presentAlert('Bienvenido', 'Hola ' + response.izena);
          // Navegar a TabsPage y pasar el userId como parámetro
          this.router.navigate(['/tabs/tab2'], { state: { userId: userId } });
        } else {
          await this.presentAlert('Error', 'Correo electrónico o contraseña incorrectos');
        }
      },
      async error => {
        console.error('Error:', error);
        await this.presentAlert('Error', 'Usuario o contraseña incorrectos.');
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
