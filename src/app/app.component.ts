import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'diccionario';
  diccionario: string;
  crear: string;
  editar: string;
  borrar: string;
  ngOnInit(): void {

  }
  onCambioIdioma(cambio: string) {
    if (cambio === 'esp') {
      this.diccionario='BÚSQUEDA';
      this.crear='Crear';
      this.editar='Editar';
      this.borrar='Borrar';
    } else {
      this.diccionario='SEARCH';
      this.crear='Create';
      this.editar='Edit';
      this.borrar='Delete';
    }
  }
}


