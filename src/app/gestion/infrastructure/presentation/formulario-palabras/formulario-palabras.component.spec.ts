import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormularioPalabrasComponent } from "./formulario-palabras.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

describe("FormularioPalabrasComponent", () => {
  let component: FormularioPalabrasComponent;
  let fixture: ComponentFixture<FormularioPalabrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioPalabrasComponent],
      imports:[ToastModule, BrowserModule, FormsModule, ReactiveFormsModule,HttpClientModule],
      providers: [MessageService,FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPalabrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

    it('should ...', () => {
      expect(component).toBeTruthy();
    });


})