import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  email!: string; // Agrega la propiedad email aquí
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  backClicked() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/tabs/tab1']);
  }

  register() {
    var gmail = (document.querySelector('.email') as HTMLInputElement).value.trim();
    var izena = (document.querySelector('.izena') as HTMLInputElement).value.trim();
    var abizena = (document.querySelector('.abizena') as HTMLInputElement).value.trim();
    var password = (document.querySelector('.pasahitza') as HTMLInputElement).value.trim();
    var passwordConfirm = (document.querySelector('.pasahitzaErrep') as HTMLInputElement).value.trim();
    
    // Verificar si las contraseñas coinciden
    if (password !== passwordConfirm) {
      console.log(password);
      console.log(passwordConfirm);
      this.presentErrorAlert('Las contraseñas no coinciden.');
      return; // Sale de la función sin continuar con el registro
    }
  
    // Verificar si el correo electrónico es válido
    if (!gmail) {
      this.presentErrorAlert('Gmaila beharrezkoa da.');
      return;
    } else if (!this.isValidEmail(gmail)) {
      this.presentErrorAlert('Gmailaren formatua okerra da.');
      return;
    }
  
    // Realizar la solicitud HTTP para verificar si existe un usuario con el mismo correo electrónico
    this.http.get<any>('http://localhost:8000/api/usuarioasGetByGmail/' + gmail).subscribe(
      (response: any) => {
        // Si se encuentra un usuario con el mismo correo electrónico, muestra la alerta y devuelve
        if (response) {
          this.presentErrorAlert('Ya existe un usuario con ese gmail');
          return;
        }
  
        // Si no hay ningún usuario con el mismo correo electrónico, procede con el registro
        let type: string;
        if (gmail === 'admin@sportscenter.com') {
          type = 'Admin';
        } else {
          type = 'Usuario';
        }
  
        const formData = {
          gmail: gmail,
          izena: izena,
          abizena: abizena,
          password: password,
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
      },
      error => {
        console.error('Error al verificar el correo electrónico:', error);
        // Si hay un error al verificar el correo electrónico, simplemente continuar con el registro
        let type: string;
        if (gmail === 'admin@sportscenter.com') {
          type = 'Admin';
        } else {
          type = 'Usuario';
        }
  
        const formData = {
          gmail: gmail,
          izena: izena,
          abizena: abizena,
          password: password,
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
