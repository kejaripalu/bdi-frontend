import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SuratMasukBiasaComponent } from "./register/surat-masuk/surat-masuk-biasa/surat-masuk-biasa.component";
import { SuratMasukFormComponent } from "./register/surat-masuk/surat-masuk-form/surat-masuk-form.component";
import { SuratMasukRahasiaComponent } from "./register/surat-masuk/surat-masuk-rahasia/surat-masuk-rahasia.component";
import { SuratMasukComponent } from "./register/surat-masuk/surat-masuk.component";
import { DashboardComponent } from "./templates/dashboard/dashboard.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'surat-masuk', component: SuratMasukComponent, children: [
        { path: '', redirectTo: '/surat-masuk/biasa', pathMatch: 'full' },
        { path: 'biasa', component: SuratMasukBiasaComponent },
        { path: 'biasa/form', component: SuratMasukFormComponent },
        { path: 'rahasia', component: SuratMasukRahasiaComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
