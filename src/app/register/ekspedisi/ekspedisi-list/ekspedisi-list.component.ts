import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Month } from 'src/app/shared/month';
import { ToastService } from 'src/app/shared/toast.service';
import { Ekspedisi } from '../ekspedisi.model';
import { EkspedisiService } from '../ekspedisi.service';

@Component({
  selector: 'app-ekspedisi-list',
  templateUrl: './ekspedisi-list.component.html',
  styleUrls: ['./ekspedisi-list.component.css']
})
export class EkspedisiListComponent implements OnInit, OnDestroy {
  ekspedisi: Ekspedisi[] = [];
  month = Object.keys(Month).filter((v) => isNaN(Number(v)));
  currentMonth = new Date().getMonth() + 1; // get current month
  currentYear = new Date().getFullYear(); // get current year
  year: number[] = [];
  isLoading: boolean = false;
  error: string = null as any;
  jenisSurat: string = null as any;
  private ekspedisiSub!: Subscription;
  private ekspedisiQueryParamSub!: Subscription;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  isSearching: boolean = false;

  constructor(private ekspedisiService: EkspedisiService,
              private router: Router,
              private route: ActivatedRoute,
              public toastService: ToastService) { }

  ngOnInit(): void {
    this.error = false as any;
    this.isLoading = true;
    this.getYear();
    this.checkMessage();
    this.ekspedisiQueryParamSub = this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.jenisSurat = queryParams['jenisSurat']?.toUpperCase() !== 'RAHASIA' ? 'BIASA' : 'RAHASIA';
    });
    this.loadDataEkspedisi();
  }

  loadDataEkspedisi() {
    this.ekspedisiSub = this.ekspedisiService.getEkspedisi(
      this.pageNumber - 1, 
      this.pageSize, 
      this.jenisSurat, 
      +this.currentMonth, 
      this.currentYear.toString())
        .subscribe({
          next: (responseData) => {
            // console.log(responseData);
            this.ekspedisi = responseData.content;
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
  
  getYear() {
    for (let startYear = 2019; startYear <= this.currentYear; startYear++) {
      this.year.push(startYear);
    }
  }
  
  checkMessage() {
    this.ekspedisiQueryParamSub = this.route.queryParams
      .subscribe((queryParams: Params) => {
          if (queryParams['message'] === 'SimpanSukses') {
            this.toastService.show('Ashiiap.... Berhasil Input Data Surat Masuk!', 
                                    { classname: 'bg-success text-light', delay: 5000 });
          } else if (queryParams['message'] === 'UpdateSukses') {
            this.toastService.show('Ashiiap.... Berhasil Update Data Surat Masuk!', 
                                    { classname: 'bg-success text-light', delay: 5000 });
          } else {
            return;
          }
    });
  }
  
  onNewEkspedisi() {
    throw new Error('Method not implemented.');
  }

  searchingEkspedisi(arg0: string) {
    throw new Error('Method not implemented.');
  }
  
  onDeleteEkspedisi(arg0: string) {
    throw new Error('Method not implemented.');
  }
  
  updatePageSize(arg0: any) {
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
  updateMonthSelected(arg0: any) {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    if (this.ekspedisiSub) {
        this.ekspedisiSub.unsubscribe();
    }
    if (this.ekspedisiQueryParamSub) {
        this.ekspedisiQueryParamSub.unsubscribe();
    }
    this.toastService.clear();
}
  
}
