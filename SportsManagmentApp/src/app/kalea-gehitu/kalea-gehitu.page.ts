import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { GimnasioGestioaPage } from '../gimnasio-gestioa/gimnasio-gestioa.page';

@Component({
  selector: 'app-kalea-gehitu',
  templateUrl: './kalea-gehitu.page.html',
  styleUrls: ['./kalea-gehitu.page.scss'],
})
export class KaleaGehituPage implements OnInit {

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
      console.log(this.userId);
    });
  }
  ionViewDidEnter(){
     // Obtener el userId de los parámetros de la ruta
     this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });

    console.log(this.userId);
  }
  ngOnInit() {
    // Obtener el userId de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });

    console.log(this.userId);
  }

  save() {
    const formData = {
      kalea_izena: this.kaleaIzena,
    };

    this.http.post('http://localhost:8000/api/kaleak', formData)
      .subscribe(async response => {
        await this.presentAlert();
      }, error => {
        console.error('Error al registrar:', error);
        // Manejar cualquier error aquí, como mostrar un mensaje de error al usuario
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Kalea gehituta.',
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
