import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorsService implements HttpInterceptor {
   
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.authService.user.pipe(take(1), exhaustMap(user => {
            if (!user) {
                return next.handle(req);
            }
            const autReq = req.clone({
                setHeaders: {
                    Authorization: "Bearer " + user.getToken().toString()
                }
            });            
            return next.handle(autReq);
        }));
    }

}
