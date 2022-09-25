import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Month } from 'src/app/shared/month';
import { SuratMasuk } from '../surat-masuk.model';
import { SuratMasukService } from '../surat-masuk.service';

@Component({
  selector: 'app-surat-masuk-list',
  templateUrl: './surat-masuk-list.component.html',
  styleUrls: ['./surat-masuk-list.component.css']
})
export class SuratMasukListComponent implements OnInit, OnDestroy {
  suratMasuk: SuratMasuk[] = [];
  month = Object.keys(Month).filter((v) => isNaN(Number(v)));
  currentMonth = new Date().getMonth() + 1; // get current month
  currentYear = new Date().getFullYear(); // get current year
  year: number[] = [];
  isLoading: boolean = false;
  error: string = null as any;
  jenisSurat: string = null as any;
  private suratMasukSub!: Subscription;
  private suratMasukQueryParamSub!: Subscription;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  
  constructor(private suratMasukService: SuratMasukService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.error = false as any;
    this.isLoading = true;
    this.getYear();
    this.suratMasukQueryParamSub = this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.jenisSurat = queryParams['jenisSurat']?.toUpperCase() !== 'RAHASIA' ? 'BIASA' : 'RAHASIA';
    });
    this.loadDataSuratMasuk();
  }

  loadDataSuratMasuk() {
    this.suratMasukSub = this.suratMasukService.getSuratMasuk(
      this.pageNumber - 1, 
      this.pageSize, 
      this.jenisSurat, 
      +this.currentMonth, 
      this.currentYear.toString())
        .subscribe({
          next: (responseData) => {
            // console.log(responseData);
            this.suratMasuk = responseData.content;
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

  onNewSuratMasuk() {
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
    this.router.navigate(['/surat-masuk', jenisSrt, 'form'], {
      queryParams: {jenisSurat: this.jenisSurat}
    });
  }

  onDeleteSuratMasuk(id: string) {
    if (confirm('Yakin ente mau hapus data ini?')) {
      this.isLoading = true;
      this.suratMasukSub = this.suratMasukService.deleteSuratMasuk(id)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.loadDataSuratMasuk();
            alert('Asiaapp... Sukses hapus data!!!');
          },
          error: (errorMessage) => {
            this.error = errorMessage;
            this.isLoading = false;
          }
        });
    }
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
    this.loadDataSuratMasuk();
  }

  updateMonthSelected(month: number) {
    this.currentMonth = +month;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadDataSuratMasuk();
  }

  updateYearSelected(year: number) {
    this.currentYear = +year;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadDataSuratMasuk();
  }

  ngOnDestroy(): void {
      if (this.suratMasukSub) {
          this.suratMasukSub.unsubscribe();
      }
      if (this.suratMasukQueryParamSub) {
          this.suratMasukQueryParamSub.unsubscribe();
      }
  }

}
