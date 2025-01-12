import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPoint = environment.baseUrl + '/login';

  user = new BehaviorSubject<User>(null as any);

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    console.log(this.endPoint);
    
    return this.http.post<Response>(this.endPoint,
        {
          username: username,
          password: password
        }        
      ).pipe(catchError(errorResponse => {
            let errorMessage = 'GAGAL Login';
            if (!errorResponse.error) {
                return throwError(() => errorMessage);
            }
            switch (errorResponse.error.message) {
                case 'INVALID_DATA_INTEGRITY':
                  errorMessage = 'Bro.. Gagal Login, Cek lagi data isian!!!, Cek koneksi ke server';
                  break;
                default:
                  errorMessage = 'GAGAL Login!!! ' //+ errorResponse.error.message;
                  console.log('GAGAL Login!!!' + errorResponse.error.message);
              }
            return throwError(() => errorMessage);
      }), tap(resData => {
            const user = new User(resData.token);
            this.user.next(user);
          })
      );
  }

  logout() {
    this.user.next(null as any);
    this.router.navigate(['/auth']);
  }

}

interface Response {
  token: string;
}
