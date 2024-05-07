import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-igerileku-gestioa',
  templateUrl: './igerileku-gestioa.page.html',
  styleUrls: ['./igerileku-gestioa.page.scss'],
})
export class IgerilekuGestioaPage implements OnInit {

  kaleakList: any[] = []; // Array para almacenar la lista de kaleak
  userId: any; // Variable para almacenar el userId

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userId']) {
      this.userId = state['userId'];
      console.log(this.userId);
      this.getKaleakList();
    }
  }
  ionViewDidEnter() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userId']) {
      this.userId = state['userId'];
      console.log(this.userId);
    }
    this.getKaleakList();
  }
  getKaleakList() {
    this.http.get<any[]>('http://localhost:8000/api/kaleak').subscribe(
      (response: any[]) => {
        this.kaleakList = response; // Asignar la respuesta a la lista de kaleak
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  eliminarKalea(kalea: any) {
    this.http.delete<any[]>('http://localhost:8000/api/kaleak/' + kalea.id).subscribe(
      (response: any[]) => {
        console.log('Gela eliminada:', kalea);
        this.cargarKaleak(); // Llama a la función para cargar las gelak nuevamente después de eliminar una
      },
      error => {
        console.error('Error al eliminar la gela:', error);
      }
    );
  }

  kaleaGehitu() {
    this.router.navigate(['/tabs/kaleaGehitu'], { state: { userId: this.userId } });
  }

  cargarKaleak() {
    this.getKaleakList(); // Llamar a la función para obtener la lista de kaleak al inicializar la página
  }

// Método para editar una kalea
editarKalea(kalea: any) {
  this.router.navigate(['/tabs/editKalea'], { state: { kalea: kalea, userId: this.userId } });
}
  backClicked() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  
  this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/tabs/tab2'], { state: { userId: this.userId } });
  }
}
