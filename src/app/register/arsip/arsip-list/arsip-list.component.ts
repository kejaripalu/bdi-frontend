import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Month } from 'src/app/shared/month';
import { ToastService } from 'src/app/shared/toast.service';
import { Arsip } from '../arsip.model';
import { ArsipService } from '../arsip.service';

@Component({
  selector: 'app-arsip-list',
  templateUrl: './arsip-list.component.html',
  styleUrls: ['./arsip-list.component.css']
})
export class ArsipListComponent implements OnInit, OnDestroy {
  arsip: Arsip[] = [];
  month = Object.keys(Month).filter((v) => isNaN(Number(v)));
  currentMonth = new Date().getMonth() + 1; // get current month
  currentYear = new Date().getFullYear(); // get current year
  year: number[] = [];
  isLoading: boolean = false;
  error: string = null as any;
  jenisSurat: string = null as any;
  private arsipSub!: Subscription;
  private arsipQueryParamSub!: Subscription;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  isSearching: boolean = false;

  constructor(private arsipService: ArsipService,
              private router: Router,
              private route: ActivatedRoute,
              public toastService: ToastService) { }

  ngOnInit(): void {
    this.error = false as any;
    this.isLoading = true;
    this.getYear();
    this.checkMessage();
    this.loadData();
  }

  loadData() {
    this.arsipSub = this.arsipService.getAll(
      this.pageNumber - 1, 
      this.pageSize, 
      +this.currentMonth, 
      this.currentYear.toString())
        .subscribe({
          next: (responseData) => {
            // console.log(responseData);
            this.arsip = responseData.content;
            this.pageNumber = responseData.number + 1;
            this.pageSize = responseData.size;
            this.totalElements = responseData.totalElements;
            this.isLoading = false;
          },
          error: () => {
            this.error = 'Aduh... Gagal ambil data dari server!!!';
            this.isLoading = false;
          }
        });
  }

  checkMessage() {
    this.arsipQueryParamSub = this.route.queryParams
      .subscribe((queryParams: Params) => {
          if (queryParams['message'] === 'SimpanSukses') {
            this.toastService.show('Ashiiap.... Berhasil Input Data Arsip!', 
                                    { classname: 'bg-success text-light', delay: 5000 });
          } else if (queryParams['message'] === 'UpdateSukses') {
            this.toastService.show('Ashiiap.... Berhasil Update Data Arsip!', 
                                    { classname: 'bg-success text-light', delay: 5000 });
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

  onNewArsip() {
    throw new Error('Method not implemented.');
  }
  
    updatePageSize(arg0: any) {
    throw new Error('Method not implemented.');
    }
    loadDataArsip() {
    throw new Error('Method not implemented.');
    }
    onDeleteArsip(arg0: string) {
    throw new Error('Method not implemented.');
    }
    onDateTimeShowData() {
    throw new Error('Method not implemented.');
    }
    onSearchingMode() {
    throw new Error('Method not implemented.');
    }
    updateYearSelected(arg0: any) {
    throw new Error('Method not implemented.');
    }
    searchingArsip(arg0: string) {
    throw new Error('Method not implemented.');
    }
    updateMonthSelected(arg0: any) {
    throw new Error('Method not implemented.');
    }

  ngOnDestroy(): void {
    if (this.arsipSub) {
      this.arsipSub.unsubscribe();
    }
    if (this.arsipQueryParamSub) {
        this.arsipQueryParamSub.unsubscribe();
    }
    this.toastService.clear();
  }

}
