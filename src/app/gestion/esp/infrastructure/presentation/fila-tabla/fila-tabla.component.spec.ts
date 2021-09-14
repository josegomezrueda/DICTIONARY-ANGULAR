
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FilaTablaComponent } from './fila-tabla.component';
import { PalabraEsp } from 'src/app/gestion/esp/domain/palabra-esp';



fdescribe("FilaTablaComponent", () => {
  let component: FilaTablaComponent;
  let fixture: ComponentFixture<FilaTablaComponent>;

  beforeEach( async () => {

    TestBed.configureTestingModule({
      declarations: [ FilaTablaComponent ],
      imports:[MatCardModule, MatToolbarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilaTablaComponent);
    component = fixture.componentInstance;

    const filaPalabraEspMock:PalabraEsp = {
      descripcion:'descripcion mock',
      fechaAlta: new Date(),
      fechaModificacion: new Date(),
      id: 1,
      palabra:'palabra mock',
      palabrasIngles: [{
        descripcion:'description mock',
        fechaAlta: new Date(),
        fechaModificacion: new Date(),
        id: 2,
        palabra: 'word mock',
        espanolSimpleOutputDto:{
          descripcion:'descripcion mock',
          fechaAlta: new Date(),
          fechaModificacion: new Date(),
          id: 1,
          palabra:'palabra mock',
        }
      }]
    };

    component.filaPalabraEsp = filaPalabraEspMock;
    
    fixture.detectChanges();
  });

  it('should create', () => {
   const description = document.querySelector('[data-testid=description]')
   expect(description).not.toBeNull();
   expect(description?.innerHTML).toEqual(' descripcion mock ')
  });
})