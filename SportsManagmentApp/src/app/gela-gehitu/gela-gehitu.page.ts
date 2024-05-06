import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gela-gehitu',
  templateUrl: './gela-gehitu.page.html',
  styleUrls: ['./gela-gehitu.page.scss'],
})
export class GelaGehituPage implements OnInit {
  gelaIzena: string = ''; // Variable para almacenar el nombre de la gela
  pertsonaKopuruMax: number = 0; // Variable para almacenar el número máximo de personas
  userId: any; // Variable para almacenar el userId

  constructor(
    private router: Router,
    private route: ActivatedRoute, // Agrega ActivatedRoute para recibir los parámetros de la ruta
    private http: HttpClient,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Obtener el userId de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });

    console.log(this.userId);
  }

  save() {
    const formData = {
      gela_izena: this.gelaIzena,
      pertsona_kopMax: this.pertsonaKopuruMax,
    };

    this.http.post('http://localhost:8000/api/gelak', formData)
      .subscribe(async response => {
        await this.presentAlert();
      }, error => {
        console.error('Error al registrar:', error);
        // Manejar cualquier error aquí, como mostrar un mensaje de error al usuario
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Gela gehituta.',
      buttons: ['OK']
    });
    await alert.present();
  }

  backClicked() {
    this.router.navigate(['/tabs/gimnasioGestioa'], { state: { userId: this.userId } });
  }
}
