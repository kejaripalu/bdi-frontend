import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
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
        return this.httpClient.get<Response>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                })
        );
    }

    getOneRKI(id: string) {
        const getEndPoint = `${this.endPoint}/${id}/detail`;
        return this.httpClient.get<RegisterKerjaIntelijen>(getEndPoint)
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

    createRKI(rki: RegisterKerjaIntelijen) {
        return this.httpClient.post<RegisterKerjaIntelijen>(this.endPoint, rki)
            .pipe(catchError(errorResponse => {
                let errorMessage = 'Aduh!!!... Gawat nih bro... GAGAL terhubung ke server';
                if (!errorResponse.error) {
                    return throwError(() => errorMessage);
                }
                switch (errorResponse.error.message) {
                    case 'INVALID_DATA_INTEGRITY':
                      errorMessage = 'Bro.. Gagal Simpan Data, Cek lagi data isian!!!, data yang dimasukan sudah ada atau format data yang dimasukan invalid!';
                      break;
                    default:
                      errorMessage = 'GAGAL Simpan data!!!';
                  }
                return throwError(() => errorMessage);
        }));
    }

    updateRKI(rki: RegisterKerjaIntelijen) {
        const putEndPoint = `${this.endPoint}/${rki.id}`;
        return this.httpClient.put<RegisterKerjaIntelijen>(putEndPoint, rki)
            .pipe(catchError(errorResponse => {
                let errorMessage = 'Aduh!!!... Gawat nih bro... GAGAL terhubung ke server';
                if (!errorResponse.error) {
                    return throwError(() => errorMessage);
                }
                switch (errorResponse.error.message) {
                    case 'ID_NOT_FOUND':
                        errorMessage = 'Bro... Data tidak ditemukan!!!'
                        break;
                    case 'INVALID_DATA_INTEGRITY':
                        errorMessage = 'Bro.. Gagal Simpan Data, Cek lagi data isian!!!, data yang dimasukan sudah ada atau format data yang dimasukan invalid!';
                        break;
                    default:
                        errorMessage = 'GAGAL Update data!!!';
                }
                return throwError(() => errorMessage);
        }));
    }

    deleteRKI(id: string) {
        const deleteEndPoint = `${this.endPoint}/${id}`;
        return this.httpClient.delete<RegisterKerjaIntelijen>(deleteEndPoint)
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

    getSearchRKI(value: string, page: number, size: number, bidang: string, tahun: string) {
        const startDate = tahun + '-01-01';        
        const endDate = tahun + '-12-31';    
        const getEndPoint = `${this.endPoint}/search?pages=${page}&sizes=${size}&bidangDirektorat=${bidang}&` +
            `startDate=${startDate}&endDate=${endDate}&value=${value}`;  
        return this.httpClient.get<Response>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }

}

interface Response {
    content: RegisterKerjaIntelijen[],
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
}
