import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-gimnasio-erreserba',
  templateUrl: './gimnasio-erreserba.page.html',
  styleUrls: ['./gimnasio-erreserba.page.scss'],
})
export class GimnasioErreserbaPage implements OnInit {
  pertsonaErreserbKop:any;
  pertsonaErreserbaKopTotala:any;
 erreserbaKop:any;
 pertsonaKopMax:any;
  gelakList:any;  
  userId: any; // Variable para almacenar el userId
  selectedGela: any;
  selectedDate:any;
  selectedOrdua:any;
  minDate: any;
  orduakList: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00','14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {
    
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
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }
  ionViewDidEnter() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userId']) {
      this.userId = state['userId'];
      console.log(this.userId);
    }
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }
  backClicked() {
    this.router.navigate(['/tabs/tab2']);
  }
// Función para verificar si tanto la fecha como el select están rellenados
  checkSelections() {
    if (this.selectedDate && this.selectedGela) {
      console.log('Fecha seleccionada:', this.selectedDate);
      console.log('Opción seleccionada:', this.selectedGela);
      this.loadButtons();
    }
  }
  getKaleenIzenak(){
    this.http.get<any[]>('http://localhost:8000/api/gelak').subscribe(
      (response: any[]) => {
        this.gelakList = response; // Asignar la respuesta a la lista de gelak
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
    const gela = (document.querySelector('.select') as HTMLInputElement).value;
  
    const erreserbaKop$ = this.http.get<number>('http://localhost:8000/api/GetPertsonaErreserbatutaGelaEgunOrdu/' + this.selectedGela + '/' + data + '/' + this.selectedOrdua);
    const pertsonaErreserbKop$ = this.http.get<number>('http://localhost:8000/api/GetGimnasioErreserbakUsuarioEguneko/' + this.userId + '/' + data);
    const pertsonaErreserbaKopTotala$ = this.http.get<number>('http://localhost:8000/api/GetGimnasioErreserbakUsuario/' + this.userId);
    const pertsonaKopMax$ = this.http.get<number>('http://localhost:8000/api/getPertsonaKopMaxGela/' + this.selectedGela);
  
    forkJoin([erreserbaKop$, pertsonaErreserbKop$, pertsonaErreserbaKopTotala$, pertsonaKopMax$]).subscribe(
      ([erreserbaKop, pertsonaErreserbKop, pertsonaErreserbaKopTotala, pertsonaKopMax]) => {
        console.log('Erreserba kop: ', erreserbaKop);
        console.log('Erreserba kop egunean pertsona: ', pertsonaErreserbKop);
        console.log('Erreserba kop totala pertsona: ', pertsonaErreserbaKopTotala);
        console.log('Pertsona kopuru max: ', pertsonaKopMax);
  
        // Realizar las comprobaciones después de recibir todas las respuestas
        if (erreserbaKop >= pertsonaKopMax) {
          this.presentAlertErreserbaTopea();
        } else if (pertsonaErreserbKop >= 2) {
          this.presentAlertErreserbaTopeaEguneko();
        } else if (pertsonaErreserbaKopTotala >= 7) {
          this.presentAlertErreserbaTopeaTotala();
        } else {
          const formData = {
            user_id: this.userId,
            gela_id: gela,
            gym_erreserba_eguna: data,
            gym_erreserba_ordua: this.selectedOrdua
          };
  
          this.http.post('http://localhost:8000/api/GimnasioErreserbak', formData).subscribe(
            async response => {
              console.log('Registro exitoso:', response);
              await this.presentAlert(data, this.selectedOrdua);
            },
            error => {
              console.error('Error al registrar:', error);
              // Manejar cualquier error aquí, como mostrar un mensaje de error al usuario
            }
          );
        }
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
        },
      ]
    });

    await alert.present();
}

 
presentAlertErreserbaTopea() {
  this.alertController.create({
    header: 'Gela beteta ordu horretan',
    buttons: [
      {
        text: 'Vale',
      }
    ]
  }).then(alert => alert.present());
}

presentAlertErreserbaTopeaEguneko() {
  this.alertController.create({
    header: 'Eguneko gimnasio 2 orduko erreserba topera heldu zara.',
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