import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { MonthConverterService } from "../shared/month-converter.service";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DashboardService {
    private endPointProdin = environment.baseUrl + '/prodin';

    constructor(
        private httpClient: HttpClient,
        private monthConverterService: MonthConverterService) { }

    getCountProdin(tahun: string, jenisProdin: string) {
        const startDate = tahun + '-01-01';        
        const endDate = tahun + '-12-31';  
        const getEndPoint = `${this.endPointProdin}/count?jenisProdin=${jenisProdin}&` +
            `startDate=${startDate}&endDate=${endDate}`;
        return this.httpClient.get<Response>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }

}

interface Response {
    count: number
}
