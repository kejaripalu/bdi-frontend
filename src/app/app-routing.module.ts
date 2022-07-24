import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SuratMasukComponent } from "./register/surat-masuk/surat-masuk.component";
import { DashboardComponent } from "./templates/dashboard/dashboard.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'surat-masuk', component: SuratMasukComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }