import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-login-page',
  templateUrl: './auth-login-page.component.html',
  styleUrls: ['./auth-login-page.component.css']
})
export class AuthLoginPageComponent implements OnInit {
  tahun = new Date().getFullYear();
  version = environment.version;

  constructor() { }

  ngOnInit(): void {
  }

}
