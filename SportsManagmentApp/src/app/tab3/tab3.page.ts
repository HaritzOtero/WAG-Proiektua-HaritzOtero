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

  async register() {
    const gmail = (document.querySelector('.email') as HTMLInputElement).value;
    const izena = (document.querySelector('.izena') as HTMLInputElement).value;
    const abizena = (document.querySelector('.abizena') as HTMLInputElement).value;
    const password = (document.querySelector('.pasahitza') as HTMLInputElement).value;
    const passwordConfirm = (document.querySelector('.pasahitzaErrep') as HTMLInputElement).value;

    if (password !== passwordConfirm) {
        // Si las contraseñas no coinciden, muestra un mensaje de error
        this.presentErrorAlert('Las contraseñas no coinciden.');
        return; // Sale de la función sin continuar con el registro
    }

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

    this.http.post('http://localhost:8000/api/usuarioas', formData)
      .subscribe(async response => {
        console.log('Registro exitoso:', response);
        await this.presentAlert(formData.izena);
      }, error => {
        console.error('Error al registrar:', error);
        // Manejar cualquier error aquí, como mostrar un mensaje de error al usuario
      });
}

async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
        header: 'Error',
        message: message,
        buttons: ['OK']
    });

    await alert.present();
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
