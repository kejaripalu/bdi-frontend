import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BidangDirektoratSektorService } from 'src/app/shared/bidang-direktorat/bidang-direktorat-sektor.service';
import { Month } from 'src/app/shared/month';
import { ToastService } from 'src/app/shared/toast.service';
import { RegisterKegiatanIntelijenPamstra } from '../kegiatan-pamstra.model';
import { RegisterKegiatanIntelijenPamstraService } from '../kegiatan-pamstra.service';

@Component({
  selector: 'app-kegiatan-pamstra-list',
  templateUrl: './kegiatan-pamstra-list.component.html',
  styleUrls: ['./kegiatan-pamstra-list.component.css']
})
export class KegiatanPamstraListComponent implements OnInit, OnDestroy {
  giat: RegisterKegiatanIntelijenPamstra[] = [];
  month = Object.keys(Month).filter((v) => isNaN(Number(v)));
  currentMonth = new Date().getMonth() + 1; // get current month
  currentYear = new Date().getFullYear(); // get current year
  year: number[] = [];
  isLoading: boolean = false;
  error: string = null as any;
  indexBidang!: number;
  namaBidang: string = null as any;
  private giatSub!: Subscription;
  private giatQueryParamSub!: Subscription; 
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  isSearching: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private bidangDirektoratSektorService: BidangDirektoratSektorService,
              private giatService: RegisterKegiatanIntelijenPamstraService,
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
          // if index not found set to index 3 (PAMSTRA)
          if (this.indexBidang < 0) {
            this.indexBidang = 3;
          }       
          this.namaBidang = this.bidangDirektoratSektorService.getBidangDirektori()[this.indexBidang].namaBidang!;          
          this.loadDataGiat();
    });
  }

  loadDataGiat() {
    this.giatSub = this.giatService.getAll(
      this.pageNumber - 1, 
      this.pageSize, 
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

  getYear() {
    for (let startYear = 2019; startYear <= this.currentYear; startYear++) {
      this.year.push(startYear);
    }
  }

  checkMessage() {
    this.giatQueryParamSub = this.route.queryParams
    .subscribe((queryParams: Params) => {
      if (queryParams['message'] === 'SimpanSukses') {
        this.toastService.show('Ashiiap.... Berhasil Input Data Kegiatan Intelijen!', 
          { classname: 'bg-success text-light', delay: 5000 });
      } else if (queryParams['message'] === 'UpdateSukses') {
        this.toastService.show('Ashiiap.... Berhasil Update Data Kegiatan Intelijen!', 
          { classname: 'bg-success text-light', delay: 5000 });
      } else {
        return;
      }
    });  
  }

  onNewGiat() {
    this.router.navigate(['/kegiatan', 'list', 'pamstra-form'], {
      queryParams: { bidang: this.namaBidang }
    });
  }

  onDelete(id: string) {
    if (confirm('Yakin ente mau hapus data ini?')) {
      this.isLoading = true;
      this.giatSub = this.giatService.delete(id)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.loadDataGiat();
            this.toastService.show('Ashiiap.... Berhasil Hapus Data Kegiatan Intelijen!', 
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
    this.loadDataGiat();
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
    this.loadDataGiat();
  }

  searchingGiat(value: string) {
    if (value.trim() === '') {
      return;
    }
    this.isLoading = true;
    this.pageNumber = 1;
    this.giatSub = this.giatService.getSearch(
      value,
      this.pageNumber - 1, 
      this.pageSize, 
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
    this.loadDataGiat();
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
