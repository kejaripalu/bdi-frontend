import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { LayoutsComponent } from './templates/layouts/layouts.component';
import { DashboardComponent } from './templates/layouts/dashboard/dashboard.component';
import { ContentsComponent } from './contents/contents.component';
import { SuratMasukComponent } from './contents/surat-masuk/surat-masuk.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    LayoutsComponent,
    DashboardComponent,
    ContentsComponent,
    SuratMasukComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
