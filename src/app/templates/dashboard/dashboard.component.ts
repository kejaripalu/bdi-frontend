import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private userSub: Subscription = null as any;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    this.checkLogedReloadPage();
  }

  checkLogedReloadPage() {
    const appData: {
      loged: string
    } = JSON.parse(localStorage.getItem('appData')!);    
    
    if (!appData) {
      const appData = {
        'loged': 'yes'
      }
      localStorage.setItem('appData', JSON.stringify(appData));
      window.location.reload();
    }
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
