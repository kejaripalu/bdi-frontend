import { Component } from '@angular/core';

@Component({
  selector: 'bdi',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tahun = new Date().getFullYear();
  loadedNav = '';

  onNavigate(select: string) {
    this.loadedNav = select;
  }
}
