import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { BuscadorComponent } from './buscador.component';


describe("BuscadorComponent", () => {
  let component: BuscadorComponent;
  let fixture: ComponentFixture<BuscadorComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorComponent],
      imports: [MatDialogModule,HttpClientModule,MatAutocompleteModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MessageService, useValue: {} },
        
      ]


    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });


    it('should ...', () => {
      expect(component).toBeTruthy();
    });

})