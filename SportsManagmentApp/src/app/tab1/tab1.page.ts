import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  registerClicked() {
    this.router.navigate(['/tabs/tab3']);
  }
  
  async loginClicked() {
    const gmail = (document.querySelector('.email') as HTMLInputElement).value;
    const password = (document.querySelector('.pasahitza') as HTMLInputElement).value;
  
    // Realizar una solicitud HTTP para obtener la contraseña del usuario
    this.http.get<any>('http://localhost:8000/api/usuarioasGetByGmail/' + gmail).subscribe(async (response: any) => {
      if (response.password === password) {
        await this.presentAlert('Bienvenido', 'Hola ' + response.izena);
        this.router.navigate(['/tabs/tab2']);
      } else {
        // Si la contraseña no coincide, mostrar un mensaje de error
        await this.presentAlert('Error', 'Correo electrónico o contraseña incorrectos');
      }
    }, async error => {
      // Manejar cualquier error de la solicitud HTTP
      console.error('Error:', error);
      await this.presentAlert('Error', 'Usuario o contraseña incorrectos.');
    });
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
