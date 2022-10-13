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
            this.toastService.show('Ashiiap.... Berhasil Input Data Ekspedisi Surat!', 
                                    { classname: 'bg-success text-light', delay: 5000 });
          } else if (queryParams['message'] === 'UpdateSukses') {
            this.toastService.show('Ashiiap.... Berhasil Update Data Ekspedisi Surat!', 
                                    { classname: 'bg-success text-light', delay: 5000 });
          } else {
            return;
          }
    });
  }
  
  onNewEkspedisi() {
    let jenisSrt = null as any;
    switch (this.jenisSurat) {
      case 'BIASA':
        jenisSrt = 'biasa';
        break;
      case 'RAHASIA':
        jenisSrt = 'rahasia';
        break;
      default:
        jenisSrt = 'biasa';
    }
    this.router.navigate(['/ekspedisi', jenisSrt, 'form'], {
      queryParams: {jenisSurat: this.jenisSurat}
    });
  }

  searchingEkspedisi(value: string) {
    if (value.trim() === '') {
      return;
    }
    this.isLoading = true;
    this.pageNumber = 1;
    this.ekspedisiSub = this.ekspedisiService.getSearchEkspedisi(
      value,
      this.pageNumber - 1, 
      this.pageSize, 
      this.jenisSurat, 
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
  
  onDeleteEkspedisi(id: string) {
    if (confirm('Yakin ente mau hapus data ini?')) {
      this.isLoading = true;
      this.ekspedisiSub = this.ekspedisiService.deleteEkspedisi(id)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.loadDataEkspedisi();
            this.toastService.show('Ashiiap.... Berhasil Hapus Data Surat Masuk!', 
                                    { classname: 'bg-success text-light', delay: 5000 });
          },
          error: (errorMessage) => {
            this.error = errorMessage;
            this.isLoading = false;
          }
        });
    }
  }
  
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadDataEkspedisi();
  }
  
  onSearchingMode() {
    this.isSearching = true;
  }

  onDateTimeShowData() {
    this.isSearching = false;
  }

  updateYearSelected(year: number) {
    this.currentYear = +year;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadDataEkspedisi();
  }

  updateMonthSelected(month: number) {
    this.currentMonth = +month;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadDataEkspedisi();
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
