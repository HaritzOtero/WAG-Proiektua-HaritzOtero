import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { tap } from 'rxjs/operators'; // Importar el operador tap

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  userId?: string;
  isAdmin?: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private alertController: AlertController,
    private navCtrl: NavController // Inyectar NavController
  ) {}

  ngOnInit() {
    this.refreshData(); // Llamar a la función para refrescar los datos en ngOnInit
  }

  ionViewWillEnter() {
    this.refreshData(); // Llamar a la función para refrescar los datos en ionViewWillEnter
  }

  refreshData() {
    // Acceder al estado pasado por el router
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userId']) {
      this.userId = state['userId'];
    }

    this.http.get<any>('http://localhost:8000/api/usuarioas/' + this.userId).pipe(
      tap((response: any) => {
        // Actualizar isAdmin después de recibir la respuesta HTTP
        this.isAdmin = response.type === 'Admin';
      })
    ).subscribe(
      async (response: any) => {
        // No se necesita nada aquí porque el trabajo ya se ha hecho en el operador tap
      },
      async error => {
        console.error('Error:', error);
      }
    );
  }

  gimnasioGestioaClicked() {
    this.router.navigate(['/tabs/gimnasioGestioa'], { state: { userId: this.userId } });
  }

  igerilekuGestioaClicked() {
    this.router.navigate(['/tabs/igerilekuGestioa'], { state: { userId: this.userId } });
  }

  igerilekuaClicked() {
    this.router.navigate(['/tabs/kaleAlokairua'], { state: { userId: this.userId } });
  }

  gimnasioaClicked() {
    this.router.navigate(['/tabs/gimnasioErreserba'], { state: { userId: this.userId } });
  }

  backClicked() {
    // Vaciar las variables al retroceder
    this.userId = '';
    this.router.navigate(['/tabs/tab1']);
  }
}
