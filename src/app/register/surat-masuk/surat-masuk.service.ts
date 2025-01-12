import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { MonthConverterService } from "src/app/shared/month-converter.service";
import { environment } from "src/environments/environment";
import { SuratMasuk } from "./surat-masuk.model";
import { Message } from "src/app/shared/message";

@Injectable({ providedIn: 'root' })
export class SuratMasukService {
    private endPoint = environment.baseUrl + '/surat-masuk';
    registerSuratMasuk: SuratMasuk[] = [];
    private message: Message = new Message();

    constructor(private httpClient: HttpClient, 
                private monthConverterService: MonthConverterService) { }

    getSuratMasuk(page: number, size: number, jenisSurat: string, bulan: number, tahun: string) {
        const startDate = this.monthConverterService.getStartDate(bulan, tahun);        
        const endDate = this.monthConverterService.getEndDate(bulan, tahun);    
        const getEndPoint = `${this.endPoint}?pages=${page}&sizes=${size}&jenisSurat=${jenisSurat}&` +
            `startDate=${startDate}&endDate=${endDate}`;        
        return this.httpClient.get<Response>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }

    getSearchSuratMasuk(value: string, page: number, size: number, jenisSurat: string, tahun: string) {
        const startDate = tahun + '-01-01';        
        const endDate = tahun + '-12-31';    
        const getEndPoint = `${this.endPoint}/search?pages=${page}&sizes=${size}&jenisSurat=${jenisSurat}&` +
            `startDate=${startDate}&endDate=${endDate}&value=${value}`;  
        return this.httpClient.get<Response>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }

    getOneSuratMasuk(id: string) {
        const getEndPoint = `${this.endPoint}/${id}/detail`;
        return this.httpClient.get<SuratMasuk>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(errorResponse => {
                    let errorMessage =  this.message.errorGetData;
                    if (!errorResponse.error) {
                        return throwError(() => errorMessage);
                    }
                    switch (errorResponse.error.message) {
                        case 'ID_NOT_FOUND':
                            errorMessage = this.message.errorDataNotFound;
                            break;
                        default:
                            errorMessage = this.message.errorShowData;
                    }
                    return throwError(() => errorMessage);
                })
            );
    }

    createSuratMasuk(suratMasuk: SuratMasuk) {
        return this.httpClient.post<SuratMasuk>(this.endPoint, suratMasuk)
            .pipe(catchError(errorResponse => {
                let errorMessage = this.message.errorConnection;
                if (!errorResponse.error) {
                    return throwError(() => errorMessage);
                }
                switch (errorResponse.error.message) {
                    case 'INVALID_DATA_INTEGRITY':
                      errorMessage = this.message.errorDataInvalid;
                      break;
                    default:
                      errorMessage = this.message.errorSaveData;
                  }
                return throwError(() => errorMessage);
            }));
    }

    updateSuratMasuk(suratMasuk: SuratMasuk) {
        const putEndPoint = `${this.endPoint}/${suratMasuk.id}`;
        return this.httpClient.put<SuratMasuk>(putEndPoint, suratMasuk)
            .pipe(catchError(errorResponse => {
                let errorMessage = this.message.errorConnection;
                if (!errorResponse.error) {
                    return throwError(() => errorMessage);
                }
                switch (errorResponse.error.message) {
                    case 'ID_NOT_FOUND':
                        errorMessage = this.message.errorDataNotFound;
                        break;
                    case 'INVALID_DATA_INTEGRITY':
                        errorMessage = this.message.errorDataInvalid;
                        break;
                    default:
                        errorMessage = this.message.errorSaveData;
                }
                return throwError(() => errorMessage);
            }));
    }

    deleteSuratMasuk(id: string) {
        const deleteEndPoint = `${this.endPoint}/${id}`;
        return this.httpClient.delete<SuratMasuk>(deleteEndPoint)
            .pipe(catchError(errorResponse => {
                let errorMessage = this.message.errorConnection;;
                if (!errorResponse.error) {
                    return throwError(() => errorMessage);
                }
                switch (errorResponse.error.message) {
                    case 'ID_NOT_FOUND':
                        errorMessage = this.message.errorDataNotFound;
                        break;
                    default:
                        errorMessage = this.message.errorSaveData;
                }
                return throwError(() => errorMessage);
        }));
    }

}

interface Response {
    content: SuratMasuk[],
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
}
