import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BidangDirektoratSektorService } from 'src/app/shared/bidang-direktorat/bidang-direktorat-sektor.service';
import { Month } from 'src/app/shared/month';
import { ToastService } from 'src/app/shared/toast.service';
import { ProdukIntelijen } from '../prodin.model';
import { ProdukIntelijenService } from '../prodin.service';

@Component({
  selector: 'app-prodin-list',
  templateUrl: './prodin-list.component.html',
  styleUrls: ['./prodin-list.component.css']
})
export class ProdinListComponent implements OnInit, OnDestroy {
  prodin: ProdukIntelijen[] = [];
  month = Object.keys(Month).filter((v) => isNaN(Number(v)));
  currentMonth = new Date().getMonth() + 1; // get current month
  currentYear = new Date().getFullYear(); // get current year
  year: number[] = [];
  indexBidang!: number;
  namaBidang: string = null as any;
  isLoading: boolean = false;
  error: string = null as any;
  private prodinSub!: Subscription;
  private prodinQueryParamSub!: Subscription; 
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  isSearching: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private bidangDirektoratSektorService: BidangDirektoratSektorService,
              private prodinService: ProdukIntelijenService,
              public toastService: ToastService) { }

  ngOnInit(): void {
    this.error = false as any;
    this.isLoading = true;
    this.getYear();
    this.checkMessage();
    this.loadData();
  }
  
  loadData() {
    this.prodinSub = this.prodinService.getProdin(
      this.pageNumber - 1, 
      this.pageSize, 
      +this.currentMonth, 
      this.currentYear.toString())
        .subscribe({
          next: (responseData) => {
            // console.log(responseData);
            this.prodin = responseData.content;
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
    this.prodinQueryParamSub = this.route.queryParams
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


  updatePageSize(arg0: any) {
    throw new Error('Method not implemented.');
    }
    onDeleteProdin(arg0: any) {
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
    searchingProdin(arg0: string) {
    throw new Error('Method not implemented.');
    }
    updateMonthSelected(arg0: any) {
    throw new Error('Method not implemented.');
    }
    onNewProdin() {
    throw new Error('Method not implemented.');
    }

  ngOnDestroy(): void {
    if (this.prodinQueryParamSub) {
      this.prodinQueryParamSub.unsubscribe();
    }
    if (this.prodinSub) {
      this.prodinSub.unsubscribe();
    }
    this.toastService.clear();
  }

}
