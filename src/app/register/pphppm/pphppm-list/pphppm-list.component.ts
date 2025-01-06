import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterPPHPPM } from '../pphppm.model';
import { Month } from 'src/app/shared/month';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RegisterPPHPPMService } from '../pphppm.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-pphppm-list',
  templateUrl: './pphppm-list.component.html',
  styleUrls: ['./pphppm-list.component.css']
})
export class PphppmListComponent implements OnInit, OnDestroy {

  pphppm: RegisterPPHPPM[] = [];
  month = Object.keys(Month).filter((v) => isNaN(Number(v)));
  currentMonth = new Date().getMonth() + 1; // get current month
  currentYear = new Date().getFullYear(); // get current year
  year: number[] = [];
  isLoading: boolean = false;
  error: string = null as any;
  private pphppmSub!: Subscription;
  private pphppmQueryParamSub!: Subscription;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  isSearching: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private pphppmService: RegisterPPHPPMService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.error = false as any;
    this.isLoading = true;
    this.getYear();
    this.checkMessage();
    this.loadData();
  }

  loadData() {
    this.pphppmSub = this.pphppmService.getAll(
      this.pageNumber - 1,
      this.pageSize,
      +this.currentMonth,
      this.currentYear.toString())
      .subscribe({
        next: (responseData) => {
          // console.log(responseData);
          this.pphppm = responseData.content;
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
    this.pphppmQueryParamSub = this.route.queryParams
      .subscribe((queryParams: Params) => {
        if (queryParams['message'] === 'SimpanSukses') {
          this.toastService.show('Ashiiap.... Berhasil Input Data Register Tamu PPH & PPM!',
            { classname: 'bg-success text-light', delay: 5000 });
        } else if (queryParams['message'] === 'UpdateSukses') {
          this.toastService.show('Ashiiap.... Berhasil Update Data Register Tamu PPH & PPM!',
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

  onNewPPHPPM() {
    this.router.navigate(['/pphppm', 'list', 'form']);
  }

  onDeletePPHPPM(id: string) {
    if (confirm('Yakin ente mau hapus data ini?')) {
      this.isLoading = true;
      this.pphppmSub = this.pphppmService.delete(id)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.loadData();
            this.toastService.show('Ashiiap.... Berhasil Hapus Data Register Tamu PPH & PPM!',
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

  onDateTimeShowData() {
    this.isSearching = false;
  }

  onSearchingMode() {
    this.isSearching = true;
  }

  updateYearSelected(year: number) {
    this.currentYear = +year;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadData();
  }

  searchingPPHPPM(value: string) {
    if (value.trim() === '') {
      return;
    }
    this.isLoading = true;
    this.pageNumber = 1;
    this.pphppmSub = this.pphppmService.getSearch(
      value,
      this.pageNumber - 1,
      this.pageSize,
      this.currentYear.toString())
      .subscribe({
        next: (responseData) => {
          // console.log(responseData);
          this.pphppm = responseData.content;
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
    if (this.pphppmQueryParamSub) {
      this.pphppmQueryParamSub.unsubscribe();
    }
    if (this.pphppmSub) {
      this.pphppmSub.unsubscribe();
    }
    this.toastService.clear();
  }

}
