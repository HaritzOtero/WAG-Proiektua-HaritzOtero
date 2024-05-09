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
    if (!this.orduakList || !this.orduakList.length) {
      return;
    }
  
    const generatedButtonsContainer = document.querySelector('.generated-buttons');
    if (!generatedButtonsContainer) {
      console.error('No se encontró el contenedor para los botones generados.');
      return;
    }
    
    generatedButtonsContainer.innerHTML = "";
  this.getKalearenOrduak();
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
  closeDatePicker(event: any) {
    // Verificar si se ha seleccionado una fecha
    if (event && event.detail && event.detail.value) {
      // Asignar la fecha seleccionada a selectedDate
      this.selectedDate = event.detail.value;
    }
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

  console.log(formData)

  this.http.post('http://localhost:8000/api/IgerilekuErreserbak', formData)
    .subscribe(async response => {
      console.log('Registro exitoso:', response);
      await this.presentAlert(kalea,data,this.selectedOrdua);
    }, error => {
      console.error('Error al registrar:', error);
      // Manejar cualquier error aquí, como mostrar un mensaje de error al usuario
    });
  }
  getKalearenOrduak(){
    const formattedDate = new Date(this.selectedDate).toISOString().split('T')[0];
    console.log('http://localhost:8000/api/GetLibreOrduak/' + this.selectedKalea.id + '/'+ formattedDate)
    this.http.get<any[]>('http://localhost:8000/api/GetLibreOrduak/' + this.selectedKalea.id + '/'+ formattedDate).subscribe(
      (response: any[]) => {
        this.orduakList = response; // Asignar la respuesta a la lista de kaleak
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  async presentAlert(kalea: string, data: string, selectedOrdua: string) {
    const alert = await this.alertController.create({
      header: '¡Reserva confirmada!',
      message: 'Tu reserva: calle: ' + kalea + ', día: ' + data + ', hora: ' + selectedOrdua,
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
