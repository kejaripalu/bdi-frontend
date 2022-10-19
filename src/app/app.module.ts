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
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ReversePipe } from './shared/reverse.pipe';
import { SuratMasukFormComponent } from './register/surat-masuk/surat-masuk-form/surat-masuk-form.component';
import { NoDataAlertComponent } from './shared/no-data-alert/no-data-alert.component';
import { SuratMasukDetailComponent } from './register/surat-masuk/surat-masuk-detail/surat-masuk-detail.component';
import { DangerAlertComponent } from './shared/danger-alert/danger-alert.component';
import { SuratMasukListComponent } from './register/surat-masuk/surat-masuk-list/surat-masuk-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuratKeluarComponent } from './register/surat-keluar/surat-keluar.component';
import { SuratMasukHelpComponent } from './register/surat-masuk/surat-masuk-help/surat-masuk-help.component';
import { SuratKeluarListComponent } from './register/surat-keluar/surat-keluar-list/surat-keluar-list.component';
import { SuratKeluarFormComponent } from './register/surat-keluar/surat-keluar-form/surat-keluar-form.component';
import { SuratKeluarDetailComponent } from './register/surat-keluar/surat-keluar-detail/surat-keluar-detail.component';
import { SuratKeluarHelpComponent } from './register/surat-keluar/surat-keluar-help/surat-keluar-help.component';
import { ToastComponent } from './shared/toast/toast.component';
import { RkiComponent } from './register/rki/rki.component';
import { RkiListComponent } from './register/rki/rki-list/rki-list.component';
import { RkiDetailComponent } from './register/rki/rki-detail/rki-detail.component';
import { RkiFormComponent } from './register/rki/rki-form/rki-form.component';
import { RkiHelpComponent } from './register/rki/rki-help/rki-help.component';
import { EkspedisiComponent } from './register/ekspedisi/ekspedisi.component';
import { EkspedisiListComponent } from './register/ekspedisi/ekspedisi-list/ekspedisi-list.component';
import { EkspedisiFormComponent } from './register/ekspedisi/ekspedisi-form/ekspedisi-form.component';
import { EkspedisiDetailComponent } from './register/ekspedisi/ekspedisi-detail/ekspedisi-detail.component';
import { EkspedisiHelpComponent } from './register/ekspedisi/ekspedisi-help/ekspedisi-help.component';
import { ProdinComponent } from './register/prodin/prodin.component';
import { ProdinListComponent } from './register/prodin/prodin-list/prodin-list.component';
import { SektorPipe } from './shared/bidang-direktorat/sektor.pipe';
import { ProdinPipe } from './shared/prodin/prodin.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    SuratMasukComponent,
    SuratMasukListComponent,
    LoadingSpinnerComponent,
    SuratMasukFormComponent,
    ReversePipe,
    NoDataAlertComponent,
    SuratMasukDetailComponent,
    DangerAlertComponent,
    SuratKeluarComponent,
    SuratMasukHelpComponent,
    SuratKeluarListComponent,
    SuratKeluarFormComponent,
    SuratKeluarDetailComponent,
    SuratKeluarHelpComponent,
    ToastComponent,
    RkiComponent,
    RkiListComponent,
    RkiDetailComponent,
    RkiFormComponent,
    RkiHelpComponent,
    EkspedisiComponent,
    EkspedisiListComponent,
    EkspedisiFormComponent,
    EkspedisiDetailComponent,
    EkspedisiHelpComponent,
    ProdinComponent,
    ProdinListComponent,
    SektorPipe,
    ProdinPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
