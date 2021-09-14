import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MuestraDatosComponent } from "./muestra-datos.component";

describe("MuestraDatosComponent", () => {
  let component: MuestraDatosComponent;
  let fixture: ComponentFixture<MuestraDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MuestraDatosComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {}},
        { provide: Router , useValue :{}}
      ]


    }).compileComponents();
});

beforeEach(() => {
  fixture = TestBed.createComponent(MuestraDatosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();

});

it('should ...', () => {
  expect(component).toBeTruthy();
});

})