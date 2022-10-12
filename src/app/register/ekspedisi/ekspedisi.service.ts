import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
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
    
    createEkspedisi(ekspedisi: Ekspedisi) {
        return this.httpClient.post<Ekspedisi>(this.endPoint, ekspedisi)
            .pipe(catchError(errorResponse => {
                let errorMessage = 'Aduh!!!... Gawat nih bro... GAGAL terhubung ke server';
                if (!errorResponse.error) {
                    return throwError(() => errorMessage);
                }
                switch (errorResponse.error.message) {
                    case 'DUPLICATE_DATA_FIELD':
                      errorMessage = 'Bro.. Data ini sudah pernah diinput!!!';
                      break;
                    default:
                      errorMessage = 'GAGAL Simpan data!!!';
                  }
                return throwError(() => errorMessage);
            }));
    }
}

interface ResponseEkspedisi {
    content: Ekspedisi[],
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
}
