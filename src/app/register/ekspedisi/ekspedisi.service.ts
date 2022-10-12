import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { MonthConverterService } from "src/app/shared/month-converter.service";
import { environment } from "src/environments/environment";
import { Ekspedisi } from "./ekspedisi.model";

@Injectable({ providedIn: "root" })
export class EkspedisiService {
    private endPoint = environment.baseUrl + '/ekspedisi';
    ekspedisi: Ekspedisi[] = [];

    constructor(private httpClient: HttpClient, 
                private monthConverterService: MonthConverterService) { }

    getEkspedisi(page: number, size: number, jenisSurat: string, bulan: number, tahun: string) {
        const startDate = this.monthConverterService.getStartDate(bulan, tahun);        
        const endDate = this.monthConverterService.getEndDate(bulan, tahun);    
        const getEndPoint = `${this.endPoint}?pages=${page}&sizes=${size}&jenisSurat=${jenisSurat}&` +
            `startDate=${startDate}&endDate=${endDate}`;        
        return this.httpClient.get<ResponseEkspedisi>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                })
        );
    }

}

interface ResponseEkspedisi {
    content: Ekspedisi[],
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
}
