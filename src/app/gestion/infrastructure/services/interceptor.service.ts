import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable } from '@angular/core'
import { catchError } from "rxjs/operators";
import { MessageToastService } from "./message-toast.service";
import { environment } from "src/environments/environment";
import { MessageService } from "primeng/api";
import { RouteConfigLoadEnd, Router } from "@angular/router";

 
@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {
    errorData:string;
    constructor(private readonly messageToastService: MessageService,
        private router: Router) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(this.manejarError)
        )
    }
 
    manejarError(error: HttpErrorResponse) {
        console.log('interceptor',error.status)
        return throwError(error.status)
    }
}