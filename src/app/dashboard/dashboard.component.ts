import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private userSub: Subscription = null as any;
  private countProdinSub: Subscription = null as any;
  countLapinhar: number = 0;
  countLapinsus: number = 0;
  countLaphastug: number = 0;
  countLapopsin: number = 0;
  isAuthenticated: boolean = false;
  currentYear = new Date().getFullYear(); // get current year
  error: string = null as any;
  year: number[] = [];
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private dasboardService: DashboardService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    this.checkLogedReloadPage();

    this.isLoading = true;
    this.getYear();
    this.loadCardDataView();
  }

  checkLogedReloadPage() {
    const appData: {
      loged: string
    } = JSON.parse(localStorage.getItem('appData')!);

    if (!appData) {
      const appData = {
        'loged': 'yes'
      }
      localStorage.setItem('appData', JSON.stringify(appData));
      window.location.reload();
    }
  }

  loadCardDataView() {
    this.countProdin('LAPINHAR');
    this.countProdin('LAPINSUS');
    this.countProdin('LAPHASTUG');
    this.countProdin('LAPOPSIN');
  }

  countProdin(jenisProdin: string) {
    this.countProdinSub = this.dasboardService.getCountProdin(
      this.currentYear.toString(),
      jenisProdin)
      .subscribe({
        next: (response) => {
          switch(jenisProdin) {
            case 'LAPINHAR': 
              this.countLapinhar = response.count;
              break;
              case 'LAPINSUS': 
                this.countLapinsus = response.count;
                break;
                case 'LAPHASTUG':
                  this.countLaphastug = response.count;
                  break;
                  case 'LAPOPSIN':
                    this.countLapopsin = response.count
                    break;
          }
          this.isLoading = false;            
        },
        error: () => {
          this.error = "Error show data";
          this.isLoading = false;
        }
      });
  }

  getYear() {
    for (let startYear = 2019; startYear <= this.currentYear; startYear++) {
      this.year.push(startYear);
    }
  }

  updateYearSelected(year: any) {
    this.currentYear = +year;
    this.isLoading = true;
    this.loadCardDataView();
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.countProdinSub) {
      this.countProdinSub.unsubscribe();
    }
  }

}
