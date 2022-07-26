import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { MonthConverter } from "src/app/shared/month-converter";
import { environment } from "src/environments/environment";
import { SuratMasuk } from "./surat-masuk.model";

@Injectable({ providedIn: 'root' })
export class SuratMasukService {
    private endPoint = environment.baseUrl + '/surat-masuk';
    registerSuratMasuk: SuratMasuk[] = [];

    constructor(private httpClient: HttpClient) { }

    getSuratMasuk(page: number, size: number, jenisSurat: string, bulan: number) {
        const startDate = new MonthConverter().getStartDate(bulan, '2020');
        const endDate = new MonthConverter().getEndDate(bulan, '2022');
        const getEndPoint = `${this.endPoint}?page=${page}&size=${size}&jenisSurat=${jenisSurat}&` +
            `startDate=${startDate}&endDate=${endDate}`;
        return this.httpClient.get<ResponseSuratMasuk>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                }
            ));
    }

    createSuratMasuk(suratMasuk: SuratMasuk) {
        return this.httpClient.post<SuratMasuk>(this.endPoint, suratMasuk)
            .pipe(catchError(errorResponse => {
                let errorMessage = 'Aduh!!!... Gawat nih bro... GAGAL terhubung ke server';
                if (!errorResponse.error) {
                    return throwError(() => errorMessage);
                }
                switch (errorResponse.error.message) {
                    case 'DUPLICATE_DATA_FIELD':
                      errorMessage = 'Bro.. Datanya sudah pernah dimasukan!!!';
                      break;
                  }
                return throwError(() => errorMessage);
            }));
    }
}

interface ResponseSuratMasuk {
    content: SuratMasuk[];
}
