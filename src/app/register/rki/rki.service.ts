import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { MonthConverterService } from "src/app/shared/month-converter.service";
import { environment } from "src/environments/environment";
import { RegisterKerjaIntelijen } from "./rki.model";

@Injectable({ providedIn: 'root' })
export class RegisterKerjaIntelijenService {
    private endPoint = environment.baseUrl + '/rki';
    rki: RegisterKerjaIntelijen[] = [];

    constructor(private httpClient: HttpClient,
                private monthConverterService: MonthConverterService) { }

    getRKI(page: number, size: number, bidang: string, bulan: number, tahun: string) {
        const startDate = this.monthConverterService.getStartDate(bulan, tahun);        
        const endDate = this.monthConverterService.getEndDate(bulan, tahun);    
        const getEndPoint = `${this.endPoint}?pages=${page}&sizes=${size}&bidangDirektorat=${bidang}&` +
            `startDate=${startDate}&endDate=${endDate}`;        
        return this.httpClient.get<ResponseRKI>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }

}

interface ResponseRKI {
    content: RegisterKerjaIntelijen[],
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
}
