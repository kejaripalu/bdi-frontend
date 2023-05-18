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
import { ProdinDetailComponent } from './register/prodin/prodin-detail/prodin-detail.component';
import { ProdinFormComponent } from './register/prodin/prodin-form/prodin-form.component';
import { ProdinHelpComponent } from './register/prodin/prodin-help/prodin-help.component';
import { ArsipComponent } from './register/arsip/arsip.component';
import { ArsipListComponent } from './register/arsip/arsip-list/arsip-list.component';
import { ArsipFormComponent } from './register/arsip/arsip-form/arsip-form.component';
import { ArsipDetailComponent } from './register/arsip/arsip-detail/arsip-detail.component';
import { ArsipHelpComponent } from './register/arsip/arsip-help/arsip-help.component';
import { ShortenPipe } from './shared/shorten.pipe';
import { KegiatanComponent } from './register/kegiatan/kegiatan.component';
import { KegiatanListComponent } from './register/kegiatan/kegiatan-list/kegiatan-list.component';
import { KegiatanFormComponent } from './register/kegiatan/kegiatan-form/kegiatan-form.component';
import { KegiatanDetailComponent } from './register/kegiatan/kegiatan-detail/kegiatan-detail.component';
import { KegiatanHelpComponent } from './register/kegiatan/kegiatan-help/kegiatan-help.component';
import { KegiatanPamstraListComponent } from './register/kegiatan/kegiatan-pamstra-list/kegiatan-pamstra-list.component';

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
    ProdinPipe,
    ProdinDetailComponent,
    ProdinFormComponent,
    ProdinHelpComponent,
    ArsipComponent,
    ArsipListComponent,
    ArsipFormComponent,
    ArsipDetailComponent,
    ArsipHelpComponent,
    ShortenPipe,
    KegiatanComponent,
    KegiatanListComponent,
    KegiatanFormComponent,
    KegiatanDetailComponent,
    KegiatanHelpComponent,
    KegiatanPamstraListComponent
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
