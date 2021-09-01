import { Component, OnInit } from '@angular/core';
import { IdiomaService } from '../../infrastructure/services/idioma.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  
  idiomaEsp:string;
  idiomaIng:string;
  
  constructor(
    private idiomaService: IdiomaService
  ) { }

  ngOnInit(): void {
    localStorage.setItem('idioma','esp');
    this.palabrasEspanol();
  }

  cambioIdioma(event:any) {
    if (localStorage.getItem('idioma') === 'en') {
      this.idiomaService.seleccionIdioma('esp');
      this.palabrasEspanol();
    } else {
      this.idiomaService.seleccionIdioma('en');
      this.palabrasIngles();
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
