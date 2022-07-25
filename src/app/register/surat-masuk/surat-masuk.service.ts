import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { MonthConverter } from "src/app/shared/month-converter";
import { environment } from "src/environments/environment";
import { SuratMasuk } from "./surat-masuk.model";

@Injectable({ providedIn: 'root' })
export class SuratMasukService {
    private baseUrl = environment.baseUrl + '/surat-masuk';
    registerSuratMasuk: SuratMasuk[] = [];

    constructor(private httpClient: HttpClient) { }

    getSuratMasuk(page: number, size: number, jenisSurat: string, bulan: number) {
        const startDate = new MonthConverter().getStartDate(bulan, '2020');
        const endDate = new MonthConverter().getEndDate(bulan, '2022');
        const getUrl = `${this.baseUrl}?page=${page}&size=${size}&jenisSurat=${jenisSurat}&` +
            `startDate=${startDate}&endDate=${endDate}`;
        return this.httpClient.get<ResponseSuratMasuk>(getUrl).pipe(
            map(response => {
                return response;
            }));
    }
}

interface ResponseSuratMasuk {
    content: SuratMasuk[];
}
