import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  gmail:any;
  izena:any;
  abizena:any;
  password:any;
  passwordConfirm:any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {
    this.gmail = ''; // Inicializar variables
    this.izena = '';
    this.abizena = '';
    this.password = '';
    this.passwordConfirm = '';
  }

  backClicked() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/tabs/tab1']);
  }

  register() {

    // Verificar si las contraseñas coinciden
    if (this.password !== this.passwordConfirm) {
      this.presentErrorAlert('Las contraseñas no coinciden.');
      return; // Sale de la función sin continuar con el registro
    }
  
    // Verificar si el correo electrónico es válido
    if (!this.gmail) {
      this.presentErrorAlert('Gmaila beharrezkoa da.');
      return;
    } else if (!this.isValidEmail(this.gmail)) {
      this.presentErrorAlert('Gmailaren formatua okerra da.');
      return;
    }
  
    // Realizar la solicitud HTTP para verificar si existe un usuario con el mismo correo electrónico
    this.http.get<any>('http://localhost:8000/api/usuarioasGetByGmail/' + this.gmail).subscribe(
      (response: any) => {
        if (response) {
          // Si se encuentra un usuario con el mismo correo electrónico, muestra la alerta y devuelve
          this.presentErrorAlert('Ya existe un usuario con ese gmail');
        } else {
          // Si no hay ningún usuario con el mismo correo electrónico, procede con el registro
          let type: string;
          if (this.gmail === 'admin@sportscenter.com') {
            type = 'Admin';
          } else {
            type = 'Usuario';
          }
  
          const formData = {
            gmail: this.gmail,
            izena: this.izena,
            abizena: this.abizena,
            password: this.password,
            type: type
          };
  
          // Realizar la solicitud HTTP para registrar al usuario
          this.http.post('http://localhost:8000/api/usuarioas/', formData).subscribe(
            (registerResponse: any) => {
              console.log('Registro exitoso:', registerResponse);
              this.presentAlert(formData.izena); // Mostrar la alerta de registro exitoso
            },
            error => {
              console.error('Error al registrar:', error);
              // Manejar cualquier error aquí, como mostrar un mensaje de error al usuario
            }
          );
        }
      },
      error => {
        console.error('Error al verificar el correo electrónico:', error);
        // Si se produce un error al verificar el correo electrónico, continuar con el registro
        let type: string;
        if (this.gmail === 'admin@sportscenter.com') {
          type = 'Admin';
        } else {
          type = 'Usuario';
        }
  
        const formData = {
          gmail: this.gmail,
          izena: this.izena,
          abizena: this.abizena,
          password: this.password,
          type: type
        };
  
        // Realizar la solicitud HTTP para registrar al usuario
        this.http.post('http://localhost:8000/api/usuarioas/', formData).subscribe(
          (registerResponse: any) => {
            console.log('Registro exitoso:', registerResponse);
            this.presentAlert(formData.izena); // Mostrar la alerta de registro exitoso
          },
          error => {
            console.error('Error al registrar:', error);
            // Manejar cualquier error aquí, como mostrar un mensaje de error al usuario
          }
        );
      }
    );
  }
  

  
  
  

async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
        header: 'Error',
        message: message,
        buttons: ['OK']
    });

    await alert.present();
}

isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

  async presentAlert(izena: string) {
    const alert = await this.alertController.create({
      header: '¡Registro Exitoso!',
      message: `Bienvenido ${izena}`,
      buttons: [
        {
          text: 'Vale',
          handler: () => {
            this.router.navigateByUrl('/tabs/tab1');
          }
        }
      ]
    });

    await alert.present();
  }
}
