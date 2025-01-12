import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private userSub: Subscription = null as any;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
