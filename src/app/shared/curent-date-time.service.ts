import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CurrentDateTimeService {
    getCurrentDate() {
        let day: string | number = new Date().getDate();
        let month: string | number = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    }

    getCurrentTime() {
        let hours: string | number = new Date().getHours();
        let minutes: string | number = new Date().getMinutes();
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return hours + ':' + minutes;
    }

    getConvertCurrentDate(year: string | number, month: string | number, day: string | number) {
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    }

}
