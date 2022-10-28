import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { MonthConverterService } from "src/app/shared/month-converter.service";
import { environment } from "src/environments/environment";
import { Arsip } from "./arsip.model";

@Injectable({ providedIn: "root" })
export class ArsipService {
    private endPoint = environment.baseUrl + '/arsip';
    arsip: Arsip[] = [];

    constructor(private httpClient: HttpClient, 
                private monthConverterService: MonthConverterService) { }

    getAll(page: number, size: number, bulan: number, tahun: string) {
        const startDate = this.monthConverterService.getStartDate(bulan, tahun);        
        const endDate = this.monthConverterService.getEndDate(bulan, tahun);    
        const getEndPoint = `${this.endPoint}?pages=${page}&sizes=${size}&` +
            `startDate=${startDate}&endDate=${endDate}`;        
        return this.httpClient.get<ResponseArsip>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }
    
    create(arsip: Arsip) {
        return this.httpClient.post<Arsip>(this.endPoint, arsip)
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

    getOne(id: string) {
        const getEndPoint = `${this.endPoint}/${id}/detail`;
        return this.httpClient.get<Arsip>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(errorResponse => {
                    let errorMessage =  'Aduh... Parah nih bos.. gagal ambil data dari server!!!';
                    if (!errorResponse.error) {
                        return throwError(() => errorMessage);
                    }
                    switch (errorResponse.error.message) {
                        case 'ID_NOT_FOUND':
                            errorMessage = 'Bro... Data tidak ditemukan!!!'
                            break;
                        default:
                            errorMessage = 'GAGAL Menampilkan data!!!';
                    }
                    return throwError(() => errorMessage);
                })
        );
    }

}

interface ResponseArsip {
    content: Arsip[],
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
}
