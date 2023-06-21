import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterLahin } from '../lahin.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RegisterTelaahanIntelijenService } from '../lahin.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Month } from 'src/app/shared/month';

@Component({
  selector: 'app-lahin-list',
  templateUrl: './lahin-list.component.html',
  styleUrls: ['./lahin-list.component.css']
})
export class LahinListComponent implements OnInit, OnDestroy {
  lahin: RegisterLahin[] = [];
  month = Object.keys(Month).filter((v) => isNaN(Number(v)));
  currentMonth = new Date().getMonth() + 1; // get current month
  currentYear = new Date().getFullYear(); // get current year
  year: number[] = [];
  isLoading: boolean = false;
  error: string = null as any;
  private lahinSub!: Subscription;
  private lahinQueryParamSub!: Subscription; 
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  isSearching: boolean = false;  

  constructor(private router: Router,
              private route: ActivatedRoute,
              private lahinService: RegisterTelaahanIntelijenService,
              public toastService: ToastService) { }

  ngOnInit(): void {
    this.error = false as any;
    this.isLoading = true;
    this.getYear();
    this.checkMessage();
    this.loadData();
  }

  loadData() {
    this.lahinSub = this.lahinService.getAll(
      this.pageNumber - 1, 
      this.pageSize, 
      +this.currentMonth, 
      this.currentYear.toString())
        .subscribe({
          next: (responseData) => {
            // console.log(responseData);
            this.lahin = responseData.content;
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
    this.lahinQueryParamSub = this.route.queryParams
    .subscribe((queryParams: Params) => {
      if (queryParams['message'] === 'SimpanSukses') {
        this.toastService.show('Ashiiap.... Berhasil Input Data Telaahan Intelijen!', 
          { classname: 'bg-success text-light', delay: 5000 });
      } else if (queryParams['message'] === 'UpdateSukses') {
        this.toastService.show('Ashiiap.... Berhasil Update Data Telaahan Intelijen!', 
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

  onNewLahin() {
    this.router.navigate(['/lahin', 'list', 'form']);
  }

  onDelete(id: string) {
    if (confirm('Yakin ente mau hapus data ini?')) {
      this.isLoading = true;
      this.lahinSub = this.lahinService.delete(id)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.loadData();
            this.toastService.show('Ashiiap.... Berhasil Hapus Data Telaahan Intelijen!', 
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
    this.loadData();
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
    this.loadData();
  }

  searchingLahin(value: string) {
    if (value.trim() === '') {
      return;
    }
    this.isLoading = true;
    this.pageNumber = 1;
    this.lahinSub = this.lahinService.getSearch(
      value,
      this.pageNumber - 1, 
      this.pageSize, 
      this.currentYear.toString())
        .subscribe({
          next: (responseData) => {
            // console.log(responseData);
            this.lahin = responseData.content;
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

  updateMonthSelected(month: number) {
    this.currentMonth = +month;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.lahinQueryParamSub) {
      this.lahinQueryParamSub.unsubscribe();
    }
    if (this.lahinSub) {
      this.lahinSub.unsubscribe();
    }
    this.toastService.clear();
  }

}
