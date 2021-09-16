import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AnimacionServiceService } from '../../services/animacion-service.service';
import { IdiomaService } from '../../services/idioma.service';

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
    private idiomaService: IdiomaService,
    private readonly animacionService: AnimacionServiceService,
  ) { }

  ngOnInit(): void {
    localStorage.setItem('idioma','esp');
    this.palabrasEspanol();
    this.cambioLenguaje.emit('esp')
  }

  cambioIdioma(event:any) {
    if (localStorage.getItem('idioma') === 'en') {
      this.animacionService.seleccionAnimacion();
      this.idiomaService.seleccionIdioma('esp');
      this.palabrasEspanol();
      this.cambioLenguaje.emit('esp')
    } else {
      this.idiomaService.seleccionIdioma('en');
      this.animacionService.seleccionAnimacion();
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
