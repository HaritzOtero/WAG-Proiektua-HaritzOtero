import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nire-erreserbak',
  templateUrl: './nire-erreserbak.page.html',
  styleUrls: ['./nire-erreserbak.page.scss'],
})
export class NireErreserbakPage implements OnInit {
  igeriekuErreserbakList: any[] = []; 
  userId: any; // Variable para almacenar el userId
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userId']) {
      this.userId = state['userId'];
      console.log(this.userId);
      this.getIgerilekuErreserbakList();
    }
  }
  ionViewDidEnter() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userId']) {
      this.userId = state['userId'];
      console.log(this.userId);
    }
    this.getIgerilekuErreserbakList();
  }
  getIgerilekuErreserbakList() {
    this.http.get<any[]>('http://localhost:8000/api/GetNireIgerilekuErreserbakUsuario/' + this.userId).subscribe(
      (response: any[]) => {
        this.igeriekuErreserbakList = response; // Asignar la respuesta a la lista de kaleak
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  
  gimnasioErreserbakClicked(){
    this.router.navigate(['/tabs/nireGymErreserbak'], { state: { userId: this.userId } });
  }
  backClicked() {
    this.router.navigate(['/tabs/tab2'], { state: { userId: this.userId } });
  }
  presentAlert(igerilekuErreserba:any) {
    console.log(igerilekuErreserba.id)
    this.alertController.create({
      header: 'Seguro erreserba desegin nahi duzula?',
      buttons: [
        {
          text: 'Vale',
          handler: () => {
            this.http.delete<any[]>('http://localhost:8000/api/IgerilekuErreserbak/' + igerilekuErreserba.id).subscribe(
              (response: any[]) => {
                console.log('Reserva eliminada:', igerilekuErreserba);
                this.getIgerilekuErreserbakList(); // Llama a la función para cargar las gelak nuevamente después de eliminar una
              },
              error => {
                console.error('Error al eliminar la gela:', error);
              }
            );
          }
        },
        {
          text: 'Ez',
          role: 'cancel'
        }
      ]
    }).then(alert => alert.present());
  }
}
