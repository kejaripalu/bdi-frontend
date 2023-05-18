import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { MonthConverterService } from "src/app/shared/month-converter.service";
import { environment } from "src/environments/environment";
import { RegisterKegiatanIntelijenPamstra } from "./kegiatan-pamstra.model";

@Injectable({ providedIn: 'root' })
export class RegisterKegiatanIntelijenPamstraService {
    private endPoint = environment.baseUrl + '/kegiatan-pamstra';

    constructor(private httpClient: HttpClient,
                private monthConverterService: MonthConverterService) { }

    getAll(page: number, size: number, bulan: number, tahun: string) {
        const startDate = this.monthConverterService.getStartDate(bulan, tahun);        
        const endDate = this.monthConverterService.getEndDate(bulan, tahun);    
        const getEndPoint = `${this.endPoint}?pages=${page}&sizes=${size}&` +
            `startDate=${startDate}&endDate=${endDate}`;        
        return this.httpClient.get<ResponseGiat>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                })
        );
    }

    getOne(id: string) {
        const getEndPoint = `${this.endPoint}/${id}/detail`;
        return this.httpClient.get<RegisterKegiatanIntelijenPamstra>(getEndPoint)
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
                            errorMessage = 'GAGAL menampilkan data!!!';
                    }
                    return throwError(() => errorMessage);
                })
        );
    }

    create(giat: RegisterKegiatanIntelijenPamstra) {
        return this.httpClient.post<RegisterKegiatanIntelijenPamstra>(this.endPoint, giat)
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

    update(giat: RegisterKegiatanIntelijenPamstra) {
        const putEndPoint = `${this.endPoint}/${giat.id}`;
        return this.httpClient.put<RegisterKegiatanIntelijenPamstra>(putEndPoint, giat)
            .pipe(catchError(errorResponse => {
                let errorMessage = 'Aduh!!!... Gawat nih bro... GAGAL terhubung ke server';
                if (!errorResponse.error) {
                    return throwError(() => errorMessage);
                }
                switch (errorResponse.error.message) {
                    case 'ID_NOT_FOUND':
                        errorMessage = 'Bro... Data tidak ditemukan!!!'
                        break;
                    case 'DUPLICATE_DATA_FIELD':
                        errorMessage = 'Bro.. Data ini sudah pernah diinput!!!';
                        break;
                    default:
                        errorMessage = 'GAGAL Update data!!!';
                }
                return throwError(() => errorMessage);
        }));
    }

    delete(id: string) {
        const deleteEndPoint = `${this.endPoint}/${id}`;
        return this.httpClient.delete<RegisterKegiatanIntelijenPamstra>(deleteEndPoint)
            .pipe(catchError(errorResponse => {
                let errorMessage = 'Aduh!!!... Gawat nih bro... GAGAL terhubung ke server';
                if (!errorResponse.error) {
                    return throwError(() => errorMessage);
                }
                switch (errorResponse.error.message) {
                    case 'ID_NOT_FOUND':
                        errorMessage = 'Bro... Data tidak ditemukan!!!'
                        break;
                    default:
                        errorMessage = 'GAGAL menghapus data!!!';
                }
                return throwError(() => errorMessage);
        }));
    }

    getSearch(value: string, page: number, size: number, tahun: string) {
        const startDate = tahun + '-01-01';        
        const endDate = tahun + '-12-31';    
        const getEndPoint = `${this.endPoint}/search?pages=${page}&sizes=${size}&` +
            `startDate=${startDate}&endDate=${endDate}&value=${value}`;  
        return this.httpClient.get<ResponseGiat>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }

}

interface ResponseGiat {
    content: RegisterKegiatanIntelijenPamstra[],
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
}
