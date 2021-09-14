import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DeleteComponent } from "./delete.component";

describe("DeleteComponent", () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteComponent],
      imports: [ReactiveFormsModule,HttpClientModule,ToastModule,MatAutocompleteModule],
      providers: [
        { provide: MessageService, useValue: {} }
      ]
      
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });


    it('should ...', () => {
      expect(component).toBeTruthy();
    });

})