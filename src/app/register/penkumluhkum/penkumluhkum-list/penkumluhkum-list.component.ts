import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/message';
import { RegisterPenkumLuhkum } from '../penkumluhkum.model';
import { Month } from 'src/app/shared/month';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { PenkuluhkumService } from '../penkuluhkum.service';

@Component({
  selector: 'app-penkumluhkum-list',
  templateUrl: './penkumluhkum-list.component.html',
  styleUrls: ['./penkumluhkum-list.component.css']
})
export class PenkumluhkumListComponent implements OnInit, OnDestroy {
  private name: string = "Register Penerangan Hukum / Penyuluhan Hukum";
  private message: Message = new Message();
  penkumluhkum: RegisterPenkumLuhkum[] = [];
  month = Object.keys(Month).filter((v) => isNaN(Number(v)));
  currentMonth = new Date().getMonth() + 1; // get current month
  currentYear = new Date().getFullYear(); // get current year
  year: number[] = [];
  isLoading: boolean = false;
  error: string = null as any;
  jenisKegiatan: string = null as any;
  private penkumluhkumQueryParamSub!: Subscription;
  private penkumLuhkumSub!: Subscription;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  isSearching: boolean = false;
  currentNotificationStatus: boolean = false;

  constructor(
    private penkumluhkumService: PenkuluhkumService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private notificationStatusService: NotificationService) { }

  ngOnInit(): void {
    this.error = false as any;
    this.isLoading = true;
    this.getYear();
    this.penkumluhkumQueryParamSub = this.route.queryParams.subscribe((params: Params) => {
      this.jenisKegiatan = (params['jenisKegiatan'] == 'penkum' ? 'PENERANGAN_HUKUM' :
        (params['jenisKegiatan'] == 'luhkum' ? 'PENYULUHAN_HUKUM' : 'PENERANGAN_HUKUM'));
    });
    this.loadData();
    this.checkMessage();
  }

  loadData() {
     this.penkumLuhkumSub = this.penkumluhkumService.getAll(
      this.pageNumber - 1,
      this.pageSize,
      this.jenisKegiatan,
      +this.currentMonth,
      this.currentYear.toString())
      .subscribe(
        {
          next: (responseData) => {
            // console.log(responseData);
            this.penkumluhkum = responseData.content;
            this.pageNumber = responseData.number + 1;
            this.pageSize = responseData.size;
            this.totalElements = responseData.totalElements;
            this.isLoading = false;
          },
          error: () => {
            this.error = this.message.errorGetData;
            this.isLoading = false;
          }
        });
  }

  onNew() {
    let jenisGiat = null as any;
    switch (this.jenisKegiatan) {
      case 'PENERANGAN_HUKUM':
        jenisGiat = 'penkum';
        break;
      case 'PENYULUHAN_HUKUM':
        jenisGiat = 'luhkum';
        break;
      default:
        jenisGiat = 'PENERANGAN_HUKUM';
    }
    this.router.navigate(['/penkumluhkum', 'form'], {
      queryParams: { jenisSurat: jenisGiat }
    });
  }

  checkMessage() {
    this.penkumluhkumQueryParamSub = this.route.queryParams
      .subscribe((queryParams: Params) => {
        if (queryParams['message'] === 'SimpanSukses' && this.currentNotificationStatus) {
          this.toastService.show(this.message.saveMessage + this.name + '!!!',
            { classname: 'bg-success text-light', delay: 5000 });
          this.onNotificationStatusChange(false);
        } else if (queryParams['message'] === 'UpdateSukses' && this.currentNotificationStatus) {
          this.toastService.show(this.message.updateMessage + this.name + '!!!',
            { classname: 'bg-success text-light', delay: 5000 });
          this.onNotificationStatusChange(false);
        } else {
          return;
        }
      });
  }

  getYear() {
    for (let startYear = 2019; startYear <= this.currentYear; startYear++) {
      this.year.push(startYear);
    }
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadData();
  }

  updateMonthSelected(month: number) {
    this.currentMonth = +month;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadData();
  }

  updateYearSelected(year: number) {
    this.currentYear = +year;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadData();
  }

  onSearchingMode() {
    this.isSearching = true;
  }

  onDateTimeShowData() {
    this.isSearching = false;
  }

  onSearching(value: string) {
    if (value.trim() === '') {
      return;
    }
    this.isLoading = true;
    this.pageNumber = 1;
    this.penkumluhkumQueryParamSub = this.penkumluhkumService.getSearch(
      value,
      this.pageNumber - 1,
      this.pageSize,
      this.jenisKegiatan,
      this.currentYear.toString())
      .subscribe({
        next: (responseData) => {
          // console.log(responseData);
          this.penkumluhkum = responseData.content;
          this.pageNumber = responseData.number + 1;
          this.pageSize = responseData.size;
          this.totalElements = responseData.totalElements;
          this.isLoading = false;
        },
        error: () => {
          this.error = this.message.errorGetData;
          this.isLoading = false;
        }
      });
  }

  onNotificationStatusChange(status: boolean) {
    this.notificationStatusService.changeNotificationStatus(status);
  }

  ngOnDestroy(): void {
    if (this.penkumluhkumQueryParamSub) {
      this.penkumluhkumQueryParamSub.unsubscribe();
    }
    if (this.penkumLuhkumSub) {
      this.penkumLuhkumSub.unsubscribe();
    }
    this.toastService.clear();
  }

}
