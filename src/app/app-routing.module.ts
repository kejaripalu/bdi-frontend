import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdinListComponent } from "./register/prodin/prodin-list/prodin-list.component";
import { ProdinComponent } from "./register/prodin/prodin.component";
import { EkspedisiDetailComponent } from "./register/ekspedisi/ekspedisi-detail/ekspedisi-detail.component";
import { EkspedisiFormComponent } from "./register/ekspedisi/ekspedisi-form/ekspedisi-form.component";
import { EkspedisiListComponent } from "./register/ekspedisi/ekspedisi-list/ekspedisi-list.component";
import { EkspedisiComponent } from "./register/ekspedisi/ekspedisi.component";
import { RkiDetailComponent } from "./register/rki/rki-detail/rki-detail.component";
import { RkiFormComponent } from "./register/rki/rki-form/rki-form.component";
import { RkiListComponent } from "./register/rki/rki-list/rki-list.component";
import { RkiComponent } from "./register/rki/rki.component";
import { SuratKeluarDetailComponent } from "./register/surat-keluar/surat-keluar-detail/surat-keluar-detail.component";
import { SuratKeluarFormComponent } from "./register/surat-keluar/surat-keluar-form/surat-keluar-form.component";
import { SuratKeluarListComponent } from "./register/surat-keluar/surat-keluar-list/surat-keluar-list.component";
import { SuratKeluarComponent } from "./register/surat-keluar/surat-keluar.component";
import { SuratMasukDetailComponent } from "./register/surat-masuk/surat-masuk-detail/surat-masuk-detail.component";
import { SuratMasukFormComponent } from "./register/surat-masuk/surat-masuk-form/surat-masuk-form.component";
import { SuratMasukListComponent } from "./register/surat-masuk/surat-masuk-list/surat-masuk-list.component";
import { SuratMasukComponent } from "./register/surat-masuk/surat-masuk.component";
import { DashboardComponent } from "./templates/dashboard/dashboard.component";
import { ProdinDetailComponent } from "./register/prodin/prodin-detail/prodin-detail.component";
import { ProdinFormComponent } from "./register/prodin/prodin-form/prodin-form.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'surat-masuk', component: SuratMasukComponent, children: [
        { path: '', redirectTo: '/surat-masuk/biasa', pathMatch: 'full' },
        { path: 'biasa', component: SuratMasukListComponent },
        { path: 'biasa/form', component: SuratMasukFormComponent },
        { path: 'biasa/:id/form', component: SuratMasukFormComponent },
        { path: 'biasa/:id/detail', component: SuratMasukDetailComponent },
        { path: 'rahasia', component: SuratMasukListComponent },
        { path: 'rahasia/form', component: SuratMasukFormComponent },
        { path: 'rahasia/:id/form', component: SuratMasukFormComponent },
        { path: 'rahasia/:id/detail', component: SuratMasukDetailComponent }
    ]},
    { path: 'surat-keluar', component: SuratKeluarComponent, children: [
        { path: '', redirectTo: '/surat-keluar/biasa', pathMatch: 'full' },
        { path: 'biasa', component: SuratKeluarListComponent },
        { path: 'biasa/form', component: SuratKeluarFormComponent },
        { path: 'biasa/:id/form', component: SuratKeluarFormComponent },
        { path: 'biasa/:id/detail', component: SuratKeluarDetailComponent },
        { path: 'rahasia', component: SuratKeluarListComponent },
        { path: 'rahasia/form', component: SuratKeluarFormComponent },
        { path: 'rahasia/:id/form', component: SuratKeluarFormComponent },
        { path: 'rahasia/:id/detail', component: SuratKeluarDetailComponent }
    ]},
    { path: 'rki', component: RkiComponent, children: [
        { path: '', redirectTo: '/rki/list', pathMatch: 'full' },
        { path: 'list', component: RkiListComponent },
        { path: 'list/:id/detail', component: RkiDetailComponent },
        { path: 'list/form', component: RkiFormComponent },
        { path: 'list/:id/form', component: RkiFormComponent }
    ]},
    { path: 'ekspedisi', component: EkspedisiComponent, children: [
        { path: '', redirectTo: '/ekspedisi/biasa', pathMatch: 'full' },
        { path: 'biasa', component: EkspedisiListComponent },
        { path: 'biasa/form', component: EkspedisiFormComponent },
        { path: 'biasa/:id/form', component: EkspedisiFormComponent },
        { path: 'biasa/:id/detail', component: EkspedisiDetailComponent },
        { path: 'rahasia', component: EkspedisiListComponent },
        { path: 'rahasia/form', component: EkspedisiFormComponent },
        { path: 'rahasia/:id/form', component: EkspedisiFormComponent },
        { path: 'rahasia/:id/detail', component: EkspedisiDetailComponent }
    ]},
    { path: 'prodin', component: ProdinComponent, children:[
        { path: '', redirectTo: '/prodin/list', pathMatch: 'full' },
        { path: 'list', component: ProdinListComponent },
        { path: 'list/:id/detail', component: ProdinDetailComponent },
        { path: 'list/form', component: ProdinFormComponent },
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
