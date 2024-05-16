import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-gela',
  templateUrl: './edit-gela.page.html',
  styleUrls: ['./edit-gela.page.scss'],
})
export class EditGelaPage implements OnInit {
  gelaId: any; // Variable para almacenar el ID de la gela
  gelaIzena: string = ''; // Variable para almacenar el nombre de la gela
  pertsonaKopuruMax: number = 0; // Variable para almacenar el número máximo de personas
  userId: any; // Variable para almacenar el userId

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private alertController: AlertController,
  ) {
    route.params.subscribe(val => {
     // Obtener el userId de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });
    

    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['gela']) {
      const gela = state['gela'];
      this.gelaId = gela.id;
      this.gelaIzena = gela.gelaIzena;
      this.pertsonaKopuruMax = gela.pertsonaKopuruMaximoa;
    }
    });
  }

  ionViewDidEnter(){
    // Obtener el userId de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });    

    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['gela']) {
      const gela = state['gela'];
      this.gelaId = gela.id;
      this.gelaIzena = gela.gelaIzena;
      this.pertsonaKopuruMax = gela.pertsonaKopuruMaximoa;
    }
  }
  ngOnInit() {
    // Obtener el userId de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });
    

    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['gela']) {
      const gela = state['gela'];
      this.gelaId = gela.id;
      this.gelaIzena = gela.gelaIzena;
      this.pertsonaKopuruMax = gela.pertsonaKopuruMaximoa;
    }
  }
  
  save(){
    const formData = {
      gela_izena: this.gelaIzena,
      pertsona_kopMax: this.pertsonaKopuruMax,
    };

    this.http.put('http://localhost:8000/api/gelak/' + this.gelaId, formData)
      .subscribe(async response => {
        await this.presentAlert();
      }, error => {
        console.error('Error al registrar:', error);
        // Manejar cualquier error aquí, como mostrar un mensaje de error al usuario
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Gela eguneratuta.',
      buttons: ['OK']
    });
    await alert.present();
  }

  backClicked() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/tabs/gimnasioGestioa'], { state: { userId: this.userId } });
  }
}
