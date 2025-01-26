import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DashboardService {
    private endPointProdin = environment.baseUrl + '/prodin';
    private endPointPphPpm = environment.baseUrl + '/pphppm';
    private endPointPenkumLuhkum = environment.baseUrl + '/penkumluhkum';
    
    constructor(
        private httpClient: HttpClient) { }

    getProdinCount(tahun: string) {
        const startDate = tahun + '-01-01';        
        const endDate = tahun + '-12-31';  
        const getEndPoint = `${this.endPointProdin}/count?&startDate=${startDate}&endDate=${endDate}`;
        return this.httpClient.get<ResponseProdinCount>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }

    getPphPpmCount(tahun: string) {
        const startDate = tahun + '-01-01';        
        const endDate = tahun + '-12-31';  
        const getEndPoint = `${this.endPointPphPpm}/count?&startDate=${startDate}&endDate=${endDate}`;
        return this.httpClient.get<ResponsePpmPphCount>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }

    getProgramPenkumLuhkumCount(tahun: string) {
        const startDate = tahun + '-01-01';        
        const endDate = tahun + '-12-31';  
        const getEndPoint = `${this.endPointPenkumLuhkum}/count?&startDate=${startDate}&endDate=${endDate}`;
        return this.httpClient.get<ResponseProgramPenkumLuhkumCount>(getEndPoint)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }


}

interface ResponseProdinCount {
    countLapinhar: number;
    countLapinsus: number;
    countLaphastug: number;
    countLapopsin: number;
}

interface ResponsePpmPphCount {
    countPPH: number;
    countPPM: number;
}

interface ResponseProgramPenkumLuhkumCount {
    countBinmatkum: number;
    countJms: number;
    countJaksaMenyapa: number;
}
