import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-nire-erreserbak-gym',
  templateUrl: './nire-erreserbak-gym.page.html',
  styleUrls: ['./nire-erreserbak-gym.page.scss'],
})
export class NireErreserbakGymPage implements OnInit {
  userId: any; // Variable para almacenar el userId
  gimnasioErreserbakList: any[] = []; 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userId']) {
      this.userId = state['userId'];
      this.getGimnasioErreserbakList();
    }
  }
  
  ionViewDidEnter() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userId']) {
      this.userId = state['userId'];
    }
    this.getGimnasioErreserbakList();
  }

  getGimnasioErreserbakList() {
    this.http.get<any[]>('http://localhost:8000/api/GetNireGimnasioErreserbakUsuario/' + this.userId).subscribe(
      (response: any[]) => {
        this.gimnasioErreserbakList = response; // Asignar la respuesta a la lista de kaleak
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  
  backClicked() {
    this.router.navigate(['/tabs/nireErreserbak'], { state: { userId: this.userId } });
  }

  presentAlert(igerilekuErreserba: any) {
    this.alertController.create({
      header: 'Seguro erreserba desegin nahi duzula?',
      buttons: [
        {
          text: 'Bai',
          handler: () => {
            this.http.delete<any[]>('http://localhost:8000/api/GimnasioErreserbak/' + igerilekuErreserba.id).subscribe(
              (response: any[]) => {
                this.getGimnasioErreserbakList(); // Llama a la función para cargar las gelak nuevamente después de eliminar una
              },
              error => {
                console.error('Error al eliminar la gela:', error);
              }
            );
          }
        },
        {
          text: 'Ez', // Botón para cerrar el alert sin realizar ninguna acción
          role: 'cancel'
        }
      ]
    }).then(alert => alert.present());
  }
  
}
