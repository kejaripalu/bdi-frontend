import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BidangDirektoratSektorService } from 'src/app/shared/bidang-direktorat/bidang-direktorat-sektor.service';
import { Month } from 'src/app/shared/month';
import { ToastService } from 'src/app/shared/toast.service';
import { RegisterKerjaIntelijen } from '../rki.model';
import { RegisterKerjaIntelijenService } from '../rki.service';

@Component({
  selector: 'app-rki-list',
  templateUrl: './rki-list.component.html',
  styleUrls: ['./rki-list.component.css']
})
export class RkiListComponent implements OnInit, OnDestroy {
  rki: RegisterKerjaIntelijen[] = [];
  title?: string;
  month = Object.keys(Month).filter((v) => isNaN(Number(v)));
  currentMonth = new Date().getMonth() + 1; // get current month
  currentYear = new Date().getFullYear(); // get current year
  year: number[] = [];
  indexBidang!: number;
  namaBidang: string = null as any;
  isLoading: boolean = false;
  error: string = null as any;
  private rkiSub!: Subscription;
  private rkiQueryParamSub!: Subscription; 
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  isSearching: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private bidangDirektoratSektorService: BidangDirektoratSektorService,
              private rkiService: RegisterKerjaIntelijenService,
              public toastService: ToastService) { }
  
  ngOnInit(): void {
    this.error = false as any;
    this.isLoading = true;
    this.getYear();
    this.checkMessage();
    this.rkiQueryParamSub = this.route.queryParams
        .subscribe((queryParams: Params) => {
          this.indexBidang = this.bidangDirektoratSektorService.getBidangDirektori()
              .findIndex(obj => {
                return obj.namaBidang === queryParams['bidang'];
          });
          // if index not found set to index 0 (IPOLHANKAM)
          if (this.indexBidang < 0) {
            this.indexBidang = 0;
          }       
          this.title = this.bidangDirektoratSektorService.getBidangDirektori()[this.indexBidang].deskripsiBidang;           
          this.namaBidang = this.bidangDirektoratSektorService.getBidangDirektori()[this.indexBidang].namaBidang!;          
          this.loadDataRKI();
    });
  }
  
  loadDataRKI() {
    this.rkiSub = this.rkiService.getRKI(
      this.pageNumber - 1, 
      this.pageSize, 
      this.namaBidang, 
      +this.currentMonth, 
      this.currentYear.toString())
        .subscribe({
          next: (responseData) => {
            // console.log(responseData);
            this.rki = responseData.content;
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
    this.rkiQueryParamSub = this.route.queryParams
    .subscribe((queryParams: Params) => {
      if (queryParams['message'] === 'SimpanSukses') {
        this.toastService.show('Ashiiap.... Berhasil Input Data RKI!', 
          { classname: 'bg-success text-light', delay: 5000 });
      } else if (queryParams['message'] === 'UpdateSukses') {
        this.toastService.show('Ashiiap.... Berhasil Update Data RKI!', 
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
  
  onNewRKI() {
    this.router.navigate(['/rki', 'list', 'form'], {
      queryParams: { bidang: this.namaBidang }
    });
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadDataRKI();
  }
  
  onDeleteSuratMasuk(id: string) {
    if (confirm('Yakin ente mau hapus data ini?')) {
      this.isLoading = true;
      this.rkiSub = this.rkiService.deleteRKI(id)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.loadDataRKI();
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
    this.loadDataRKI();
  }
  
  searchingRKI(value: string) {
    throw new Error('Method not implemented.');
  }
  
  updateMonthSelected(month: number) {
    this.currentMonth = +month;
    this.pageNumber = 1;
    this.isLoading = true;
    this.loadDataRKI();
  }

  ngOnDestroy(): void {
    if (this.rkiQueryParamSub) {
      this.rkiQueryParamSub.unsubscribe();
    }
    if (this.rkiSub) {
      this.rkiSub.unsubscribe();
    }
    this.toastService.clear();
  }

}
