import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { EditarFormularioComponent } from "./editar-formulario.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe("EditarFormularioComponent", () => {
  let component: EditarFormularioComponent;
  let fixture: ComponentFixture<EditarFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarFormularioComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule,ToastModule,MatAutocompleteModule],
      providers:[MessageService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

    it('should ...', () => {
      expect(component).toBeTruthy();
    });


})