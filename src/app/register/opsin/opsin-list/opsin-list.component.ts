import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterOpsin } from '../opsin.model';
import { Month } from 'src/app/shared/month';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BidangDirektoratSektorService } from 'src/app/shared/bidang-direktorat/bidang-direktorat-sektor.service';
import { RegisterOpsinService } from '../opsin.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-opsin-list',
  templateUrl: './opsin-list.component.html',
  styleUrls: ['./opsin-list.component.css']
})
export class OpsinListComponent implements OnInit, OnDestroy {
  giat: RegisterOpsin[] = [];
  month = Object.keys(Month).filter((v) => isNaN(Number(v)));
  currentMonth = new Date().getMonth() + 1; // get current month
  currentYear = new Date().getFullYear(); // get current year
  year: number[] = [];
  indexBidang!: number;
  namaBidang: string = null as any;
  isLoading: boolean = false;
  error: string = null as any;
  private giatSub!: Subscription;
  private giatQueryParamSub!: Subscription; 
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  isSearching: boolean = false;  

  constructor(private router: Router,
              private route: ActivatedRoute,
              private bidangDirektoratSektorService: BidangDirektoratSektorService,
              private opsinService: RegisterOpsinService,
              public toastService: ToastService) { }

  ngOnInit(): void {
    this.error = false as any;
    this.isLoading = true;
    this.getYear();
    this.checkMessage();
    this.giatQueryParamSub = this.route.queryParams
        .subscribe((queryParams: Params) => {
          this.indexBidang = this.bidangDirektoratSektorService.getBidangDirektori()
              .findIndex(obj => {
                return obj.namaBidang === queryParams['bidang'];
          });
          // if index not found set to index 0 (IPOLHANKAM)
          if (this.indexBidang < 0) {
            this.indexBidang = 0;
          }       
          this.namaBidang = this.bidangDirektoratSektorService.getBidangDirektori()[this.indexBidang].namaBidang!;          
          this.loadDataOpsin();
    });
  }

  loadDataOpsin() {
    this.giatSub = this.opsinService.getAll(
      this.pageNumber - 1, 
      this.pageSize, 
      this.namaBidang, 
      +this.currentMonth, 
      this.currentYear.toString())
        .subscribe({
          next: (responseData) => {
            // console.log(responseData);
            this.giat = responseData.content;
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
    this.giatQueryParamSub = this.route.queryParams
    .subscribe((queryParams: Params) => {
      if (queryParams['message'] === 'SimpanSukses') {
        this.toastService.show('Ashiiap.... Berhasil Input Data Operasi Intelijen!', 
          { classname: 'bg-success text-light', delay: 5000 });
      } else if (queryParams['message'] === 'UpdateSukses') {
        this.toastService.show('Ashiiap.... Berhasil Update Data Operasi Intelijen!', 
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

  onNewOpsin() {
    this.router.navigate(['/opsin', 'list', 'form'], {
      queryParams: { bidang: this.namaBidang }
    });
  }

  onDelete(id: string) {
    if (confirm('Yakin ente mau hapus data ini?')) {
      this.isLoading = true;
      this.giatSub = this.opsinService.delete(id)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.loadDataOpsin();
            this.toastService.show('Ashiiap.... Berhasil Hapus Data Operasi Intelijen!', 
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
    this.loadDataOpsin();
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
    this.loadDataOpsin();
  }

  searchingOpsin(value: string) {
    if (value.trim() === '') {
      return;
    }
    this.isLoading = true;
    this.pageNumber = 1;
    this.giatSub = this.opsinService.getSearch(
      value,
      this.pageNumber - 1, 
      this.pageSize, 
      this.namaBidang, 
      this.currentYear.toString())
        .subscribe({
          next: (responseData) => {
            // console.log(responseData);
            this.giat = responseData.content;
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
    this.loadDataOpsin();
  }

  ngOnDestroy(): void {
    if (this.giatQueryParamSub) {
      this.giatQueryParamSub.unsubscribe();
    }
    if (this.giatSub) {
      this.giatSub.unsubscribe();
    }
    this.toastService.clear();
  }

}
