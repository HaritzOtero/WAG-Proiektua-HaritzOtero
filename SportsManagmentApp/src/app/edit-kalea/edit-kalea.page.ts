import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-kalea',
  templateUrl: './edit-kalea.page.html',
  styleUrls: ['./edit-kalea.page.scss'],
})
export class EditKaleaPage implements OnInit {

  kaleaId: any; // Variable para almacenar el ID de la gela
  kaleaIzena: string = ''; // Variable para almacenar el nombre de la gela
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
    if (state && state['kalea']) {
      const kalea = state['kalea'];
      this.kaleaId = kalea.id;
      this.kaleaIzena = kalea.kalea_izena;
    }
    });
  }

  ngOnInit() {
    // Obtener el userId de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });
    

    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['kalea']) {
      const kalea = state['kalea'];
      this.kaleaId = kalea.id;
      this.kaleaIzena = kalea.kalea_izena;
    }
  }
  
  save(){
    const formData = {
      kalea_izena: this.kaleaIzena,
    };

    this.http.put('http://localhost:8000/api/kaleak/' + this.kaleaId, formData)
      .subscribe(async response => {
        await this.presentAlert();
      }, error => {
        console.error('Error al registrar:', error);
        // Manejar cualquier error aquí, como mostrar un mensaje de error al usuario
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Kalea eguneratuta.',
      buttons: ['OK']
    });
    await alert.present();
  }

  backClicked() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/tabs/igerilekuGestioa'], { state: { userId: this.userId } });
  }

}
