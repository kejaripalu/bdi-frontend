import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Month } from 'src/app/shared/month';
import { SuratKeluar } from '../surat-keluar.model';
import { SuratKeluarService } from '../surat-keluar.service';

@Component({
  selector: 'app-surat-keluar-list',
  templateUrl: './surat-keluar-list.component.html',
  styleUrls: ['./surat-keluar-list.component.css']
})
export class SuratKeluarListComponent implements OnInit, OnDestroy {
  suratKeluar: SuratKeluar[] = [];
  month = Object.keys(Month).filter((v) => isNaN(Number(v)));
  currentMonth = new Date().getMonth() + 1; // get current month
  currentYear = new Date().getFullYear(); // get current year
  year: number[] = [];
  isLoading: boolean = false;
  error: string = null as any;
  jenisSurat: string = null as any;
  private suratKeluarSub!: Subscription;
  private suratKeluarQueryParamSub!: Subscription;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  isSearching: boolean = false;

  constructor(private suratKeluarService: SuratKeluarService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.error = false as any;
    this.isLoading = true;
    this.getYear();
    this.suratKeluarQueryParamSub = this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.jenisSurat = queryParams['jenisSurat']?.toUpperCase() !== 'R' ? 'B' : 'R';
      });
      this.loadDataSuratKeluar();
  }

  loadDataSuratKeluar() {
    this.suratKeluarSub = this.suratKeluarService.getSuratKeluar(
      this.pageNumber - 1,
      this.pageSize,
      this.jenisSurat,
      +this.currentMonth,
      this.currentYear.toString())
        .subscribe({
          next: (responseData) => {
            this.suratKeluar = responseData.content;
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

  onNewSuratKeluar() {
    let jenisSrt = null as any;
    switch (this.jenisSurat) {
      case 'B':
        jenisSrt = 'biasa';
        break;
      case 'R':
        jenisSrt = 'rahasia';
        break;
      default:
        jenisSrt = 'biasa';
    }
    this.router.navigate(['/surat-keluar', jenisSrt, 'form'], {
      queryParams: {jenisSurat: this.jenisSurat}
    });
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadDataSuratKeluar();
  }

  updateMonthSelected(month: string) {
    this.currentMonth = +month;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadDataSuratKeluar();
  }

  updateYearSelected(year: string) {
    this.currentYear = +year;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadDataSuratKeluar();
  }

  searchingSuratKeluar(value: string) {

  }

  onSearchingMode() {
    this.isSearching = true;
  }

  onDateTimeShowData() {
    this.isSearching = false;
  }

  onDeleteSuratKeluar(id: string) {

  }

  ngOnDestroy(): void {
    if (this.suratKeluarSub) {
      this.suratKeluarSub.unsubscribe();
    }
    if (this.suratKeluarQueryParamSub) {
      this.suratKeluarQueryParamSub.unsubscribe();
    }
  }

}
