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
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
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
            const user = new User(resData.token, new Date(new Date().getTime() + 30 * 60 * 1000)); //set user with time
            this.user.next(user);
            this.autoLogout(30 * 60000); //set auto logout ke 30 x 60000 milidetik (30 menit) 
            localStorage.setItem('userData', JSON.stringify(user));
          })
      );
  }

  autoLogin() {
    const userData: {
      token: string,
      tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData')!);

    if (!userData) {
      return;
    }    
    const loadedUser = new User(userData.token, new Date(userData.tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(loadedUser.tokenExpirationDate).getTime() - (new Date().getTime()); //set sisa waktu auto logout
      this.autoLogout(expirationDuration)
    }
  }

  logout() {
    this.user.next(null as any);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    
    if(this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log('Expired time: ' + expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
    }, expirationDuration);
  }

}

interface Response {
  token: string;
}
