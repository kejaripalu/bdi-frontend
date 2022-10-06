import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
        { path: 'rahasia/:id/detail', component: SuratKeluarDetailComponent },
    ]},
    { path: 'rki', component: RkiComponent, children: [
        { path: '', redirectTo: '/rki/list', pathMatch: 'full' },
        { path: 'list', component: RkiListComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
