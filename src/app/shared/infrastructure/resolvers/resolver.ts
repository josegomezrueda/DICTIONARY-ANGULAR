import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { EMPTY, observable, Observable } from "rxjs";
import { catchError, delay } from 'rxjs/operators';
import { IdiomaService } from "../services/idioma.service";
import { ServicioPalabrasService } from "../services/servicio-palabras.service";

@Injectable({
    providedIn: 'root' //no tengo que incluirlo en app module
})

export class AplicacionResolver implements Resolve<Observable<any>> {

    valor: string = 'esp';

    constructor(private palabra: ServicioPalabrasService,
        private readonly idioma: IdiomaService,
    ) {}
    resolve(route: ActivatedRouteSnapshot) {
        
        if (localStorage.getItem('idioma')==='esp') {
            return this.palabra.cargarPalabrasEsp().pipe(
                catchError((error: any) => {
                    alert('El id indicado no existe');
                    console.log(error)
                    return EMPTY;
                })
            )
        } else {
            return this.palabra.cargarPalabrasIng().pipe(
                catchError((error: any) => {
                    alert('El id indicado no existe');
                    console.log(error)
                    return EMPTY;
                })
            )
        }
    }

}
