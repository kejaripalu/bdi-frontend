import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { MonthConverterService } from "src/app/shared/month-converter.service";
import { environment } from "src/environments/environment";
import { ProdukIntelijen } from "./prodin.model";

@Injectable({ providedIn: "root" })
export class ProdukIntelijenService {
    private endPoint = environment.baseUrl + '/prodin';
    prodin: ProdukIntelijen[] = [];

    constructor(private httpClient: HttpClient,
                private monthConverterService: MonthConverterService) { }

    getProdin(page: number, size: number, bulan: number, tahun: string) {
        const startDate = this.monthConverterService.getStartDate(bulan, tahun);        
        const endDate = this.monthConverterService.getEndDate(bulan, tahun);    
        const getEndPoint = `${this.endPoint}?pages=${page}&sizes=${size}&` +
            `startDate=${startDate}&endDate=${endDate}`;        
        return this.httpClient.get<ResponseProdin>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
            })
        );
    }

}

interface ResponseProdin {
    content: ProdukIntelijen[],
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
}
