import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { DashboardComponent } from './templates/dashboard/dashboard.component';
import { SuratMasukComponent } from './register/surat-masuk/surat-masuk.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SuratMasukBiasaComponent as SuratMasukBiasaComponent } from './register/surat-masuk/surat-masuk-biasa/surat-masuk-biasa.component';
import { SuratMasukRahasiaComponent } from './register/surat-masuk/surat-masuk-rahasia/surat-masuk-rahasia.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { SuratMasukBiasaFormComponent } from './register/surat-masuk/surat-masuk-biasa/surat-masuk-biasa-form/surat-masuk-biasa-form.component';
import { ReversePipe } from './shared/reverse.pipe';
import { DatePickerDirective } from './shared/date-picker.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    SuratMasukComponent,
    SuratMasukBiasaComponent,
    SuratMasukRahasiaComponent,
    LoadingSpinnerComponent,
    SuratMasukBiasaFormComponent,
    ReversePipe,
    DatePickerDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
