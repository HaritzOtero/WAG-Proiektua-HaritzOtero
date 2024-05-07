import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gimnasio-gestioa',
  templateUrl: './gimnasio-gestioa.page.html',
  styleUrls: ['./gimnasio-gestioa.page.scss'],
})
export class GimnasioGestioaPage implements OnInit {
  gelakList: any[] = []; // Array para almacenar la lista de kaleak
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
  // Método para obtener la lista de kaleak desde la API
  getKaleakList() {
    this.http.get<any[]>('http://localhost:8000/api/gelak').subscribe(
      (response: any[]) => {
        this.gelakList = response; // Asignar la respuesta a la lista de kaleak
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  // Método para eliminar una kalea
  eliminarGela(gela: any) {
    this.http.delete<any[]>('http://localhost:8000/api/gelak/' + gela.id).subscribe(
      (response: any[]) => {
        console.log('Gela eliminada:', gela);
        this.cargarGelak(); // Llama a la función para cargar las gelak nuevamente después de eliminar una
      },
      error => {
        console.error('Error al eliminar la gela:', error);
      }
    );
  }

  // Método para agregar una nueva gela
  gelaGehitu() {
    this.router.navigate(['/tabs/gelaGehitu'], { state: { userId: this.userId } });
  }

  cargarGelak() {
    this.getKaleakList(); // Llamar a la función para obtener la lista de kaleak al inicializar la página
  }

  // Método para editar una kalea
  editarGela(gela: any) {
    this.router.navigate(['/tabs/editGela'], { state: { gela: gela, userId: this.userId } });
  }

  backClicked() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/tabs/tab2'], { state: { userId: this.userId } });
  }
}
