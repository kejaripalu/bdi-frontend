import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { SuratMasuk } from "./surat-masuk.model";
import { SuratMasukService } from "./surat-masuk.service";

@Injectable({providedIn: "root"})
export class SuratMasukResolverService implements Resolve<SuratMasuk> {

    constructor(private suratMasukService: SuratMasukService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SuratMasuk | Observable<SuratMasuk> | Promise<SuratMasuk> {
        throw new Error("Method not implemented.");
    }

}
