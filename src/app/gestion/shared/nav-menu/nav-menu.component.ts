import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IdiomaService } from '../../infrastructure/services/idioma.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  @Output() cambioLenguaje: EventEmitter<string> = new EventEmitter()
  idiomaEsp:string;
  idiomaIng:string;
  
  constructor(
    private idiomaService: IdiomaService
  ) { }

  ngOnInit(): void {
    localStorage.setItem('idioma','esp');
    this.palabrasEspanol();
    this.cambioLenguaje.emit('esp')
  }

  cambioIdioma(event:any) {
    if (localStorage.getItem('idioma') === 'en') {
      this.idiomaService.seleccionIdioma('esp');
      this.palabrasEspanol();
      this.cambioLenguaje.emit('esp')
    } else {
      this.idiomaService.seleccionIdioma('en');
      this.palabrasIngles();
      this.cambioLenguaje.emit('en')
      }
  }

  public palabrasEspanol(){
    this.idiomaEsp='ESPAÑOL';
    this.idiomaIng='INGLÉS';
  }
  public palabrasIngles(){
    this.idiomaEsp='SPANISH';
    this.idiomaIng='ENGLISH';
  }
}
