import { Injectable } from '@angular/core';
import { RegisterPenkumLuhkum } from './penkumluhkum.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MonthConverterService } from 'src/app/shared/month-converter.service';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PenkuluhkumService {
  private endPoint = environment.baseUrl + '/penkumluhkum';

  constructor(private httpClient: HttpClient,
    private monthConverterService: MonthConverterService) { }

  getAll(page: number, size: number, jenisKegiatan: string, bulan: number, tahun: string) {
    const startDate = this.monthConverterService.getStartDate(bulan, tahun);
    const endDate = this.monthConverterService.getEndDate(bulan, tahun);
    const getEndPoint = `${this.endPoint}?pages=${page}&sizes=${size}&jenisKegiatan=${jenisKegiatan}&` +
      `startDate=${startDate}&endDate=${endDate}`;
    return this.httpClient.get<Response>(getEndPoint)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getOne(ids: string) {
    const getEndPoint = `${this.endPoint}/${ids}/detail`;
    return this.httpClient.get<RegisterPenkumLuhkum>(getEndPoint)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(errorResponse => {
          let errorMessage = 'Aduh... Parah nih bos.. gagal ambil data dari server!!!';
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

  create(penkumluhkum: RegisterPenkumLuhkum) {
    return this.httpClient.post<RegisterPenkumLuhkum>(this.endPoint, penkumluhkum)
      .pipe(catchError(errorResponse => {
        let errorMessage = 'Aduh!!!... Gawat nih bro... GAGAL terhubung ke server';
        if (!errorResponse.error) {
          return throwError(() => errorMessage);
        }
        switch (errorResponse.error.message) {
          case 'INVALID_DATA_INTEGRITY':
            errorMessage = 'Bro.. Gagal Simpan Data, Cek lagi data isian!!!, data yang dimasukan duplikat atau format data yang dimasukan invalid!';
            break;
          default:
            errorMessage = 'GAGAL Simpan data!!!';
        }
        return throwError(() => errorMessage);
      }));
  }

   update(penkumluhkum: RegisterPenkumLuhkum, ids: string) {
          const putEndPoint = `${this.endPoint}/${ids}`;
          return this.httpClient.put<RegisterPenkumLuhkum>(putEndPoint, penkumluhkum)
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
                          errorMessage = 'Bro.. Gagal Simpan Data, Cek lagi data isian!!!, data yang dimasukan duplikat atau format data yang dimasukan invalid!';
                          break;
                      default:
                          errorMessage = 'GAGAL Update data!!!';
                  }
                  return throwError(() => errorMessage);
          }));
      }



}

interface Response {
  content: RegisterPenkumLuhkum[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
