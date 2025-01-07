import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class NotificationService {

    private notificationStatus = new BehaviorSubject<boolean>(false);
    currentNotificationStatus = this.notificationStatus.asObservable();

    changeNotificationStatus(notificationStatus: boolean) {
        this.notificationStatus.next(notificationStatus);
    }

}