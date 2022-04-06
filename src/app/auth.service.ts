import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private webService: WebRequestService, private router: Router) { }

  login(email: string, password: string) {
    console.log(email);
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any> ) => {

        const userId = res.body.user._id;
        const bearerToken = res.body.token.token;
        this.setSession(userId, bearerToken);
        console.log("LOGGED IN!");
      })
    )
  }

  logout() {
    this.webService.logout();
    this.removeSession();
    
  }


  private setSession(userId: string, bearerToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('Bearer', bearerToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('Bearer');
  }
}
