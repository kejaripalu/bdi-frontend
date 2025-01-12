import { Component, OnDestroy, OnInit } from '@angular/core';
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
    console.log('Is authentication = ' + this.isAuthenticated);
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
