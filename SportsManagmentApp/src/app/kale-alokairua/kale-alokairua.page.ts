import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-kale-alokairua',
  templateUrl: './kale-alokairua.page.html',
  styleUrls: ['./kale-alokairua.page.scss'],
})
export class KaleAlokairuaPage implements OnInit {
  pertsonaErreserbKop:any;
  pertsonaErreserbaKopTotala:any;
  kaleakList:any;  
  userId: any; // Variable para almacenar el userId
  selectedKalea: any;
  selectedDate:any;
  selectedOrdua:any;
  orduakList:any;
  minDate: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]
  }

  pickerOptions: any = {
    cssClass: 'datepicker-class'
  };
  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userId']) {
      this.userId = state['userId'];
      console.log(this.userId);
      this.getKaleenIzenak();
    }
  }
  ionViewDidEnter() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userId']) {
      this.userId = state['userId'];
      console.log(this.userId);
    }
    this.getKaleenIzenak();
  }
  backClicked() {
    this.router.navigate(['/tabs/tab2']);
  }
// Función para verificar si tanto la fecha como el select están rellenados
  checkSelections() {
    if (this.selectedDate && this.selectedKalea) {
      console.log('Fecha seleccionada:', this.selectedDate);
      console.log('Opción seleccionada:', this.selectedKalea);
      this.getKalearenOrduak();
      this.loadButtons();
    }
  }
  getKaleenIzenak(){
    this.http.get<any[]>('http://localhost:8000/api/kaleak').subscribe(
      (response: any[]) => {
        this.kaleakList = response; // Asignar la respuesta a la lista de kaleak
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  
  loadButtons() {
  
    const generatedButtonsContainer = document.querySelector('.generated-buttons');
    if (!generatedButtonsContainer) {
      console.error('No se encontró el contenedor para los botones generados.');
      return;
    }
    
    generatedButtonsContainer.innerHTML = "";
    console.log(this.orduakList)
    this.orduakList.forEach((element: any) => {
    const button = document.createElement('ion-button');
    button.setAttribute('shape', 'round');
    button.setAttribute('class', 'back-button');
    button.innerText = element;
    button.addEventListener('click', (event) => this.orduaClicked(event)); // Agrega el evento click

  generatedButtonsContainer.appendChild(button);
});
  }
  orduaClicked(event: any) {
    const buttons = document.querySelectorAll('.back-button');
    buttons.forEach((button: any) => {
      button.classList.remove('selected'); // Elimina la clase de todos los botones
    });
  
    const clickedButton = event.target;
    clickedButton.classList.add('selected'); // Agrega la clase al botón clickeado
    
  
    const buttonText = clickedButton.innerText;
    this.selectedOrdua = buttonText;
  }
  alokatu() {
    const data = (document.querySelector('.eguna') as HTMLInputElement).value;
    const kalea = (document.querySelector('.select') as HTMLInputElement).value;
    console.log(this.userId)
    const formData = {
      user_id: this.userId,
      kalea_id: kalea,
      igerileku_erreserba_eguna: data,
      igeileku_erreserba_ordua: this.selectedOrdua
    };
  
    this.http.get<any[]>('http://localhost:8000/api/GetIgerilekuErreserbakUsuarioEguneko/' + this.userId + '/' + data).subscribe(
      (response: any[]) => {
        this.pertsonaErreserbKop = response; // Asignar la respuesta a la variable erreserbaKop
        console.log('Erreserba kop egunean pertsona: ', this.pertsonaErreserbKop);
  
        // Realizar la segunda solicitud HTTP dentro de la suscripción de la primera
        this.http.get<any[]>('http://localhost:8000/api/GetIgerilekuErreserbakUsuario/' + this.userId).subscribe(
          (response: any[]) => {
            this.pertsonaErreserbaKopTotala = response; // Asignar la respuesta a la variable erreserbaKop
            console.log('Erreserba kop totala pertsona: ', this.pertsonaErreserbaKopTotala);
            if (this.pertsonaErreserbKop !== undefined && this.pertsonaErreserbKop >= 2) {
              this.presentAlertErreserbaTopeaEguneko();
              return;
            } else if (this.pertsonaErreserbaKopTotala !== undefined &&  this.pertsonaErreserbaKopTotala >= 7) {
              this.presentAlertErreserbaTopeaTotala();
              return;
            } else {
              this.registrar(formData, data, this.selectedOrdua);
            }
          },
          error => {
            console.error('Error:', error);
          }
        );
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  
  registrar(formData: any, data: string, selectedOrdua: string) {
    this.http.post('http://localhost:8000/api/IgerilekuErreserbak', formData).subscribe(
      async response => {
        console.log('Registro exitoso:', response);
        await this.presentAlert(data, selectedOrdua);
      },
      error => {
        console.error('Error al registrar:', error);
        // Manejar cualquier error aquí, como mostrar un mensaje de error al usuario
      }
    );
  }
  getKalearenOrduak() {
    const formattedDate = new Date(this.selectedDate).toISOString().split('T')[0];
    console.log('http://localhost:8000/api/GetLibreOrduak/' + this.selectedKalea + '/' + formattedDate)
    this.http.get<any[]>('http://localhost:8000/api/GetLibreOrduak/' + this.selectedKalea + '/' + formattedDate).subscribe(
      (response: any[]) => {
        this.orduakList = response; // Asignar la respuesta a la lista de kaleak
        this.loadButtons(); // Llamar a loadButtons() después de que se haya asignado this.orduakList
      },
      error => {
        console.error('Error:', error);
      }
    );
}


  async presentAlert(data: string, selectedOrdua: string) {
    const alert = await this.alertController.create({
      header: 'Zure zain gaude!',
      message: 'Zure erreserba: Eguna: ' + data + ', ordua: ' + selectedOrdua,
      buttons: [
        {
          text: 'Vale',
          handler: () => {
            this.router.navigate(['/tabs/tab2'], { state: { userId: this.userId } });
          }
        }
      ]
    });

    await alert.present();
}
presentAlertErreserbaTopeaEguneko() {
  this.alertController.create({
    header: 'Eguneko igerieku 2 orduko erreserba topera heldu zara.',
    buttons: [
      {
        text: 'Vale',
      }
    ]
  }).then(alert => alert.present());
}

presentAlertErreserbaTopeaTotala() {
  this.alertController.create({
    header: '7 gimnasio orduko erreserba topere heldu zara.',
    buttons: [
      {
        text: 'Vale',
      }
    ]
  }).then(alert => alert.present());
}


}
