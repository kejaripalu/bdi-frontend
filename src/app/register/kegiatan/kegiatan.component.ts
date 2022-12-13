import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BidangDirektoratSektorService } from 'src/app/shared/bidang-direktorat/bidang-direktorat-sektor.service';

@Component({
  selector: 'app-kegiatan',
  templateUrl: './kegiatan.component.html',
  styleUrls: ['./kegiatan.component.css']
})
export class KegiatanComponent implements OnInit, OnDestroy {
  namaBidang: string = null as any;
  private bidangQueryParamSub!: Subscription;

  constructor(private bidangDirektoratSektorService: BidangDirektoratSektorService,
              private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.bidangQueryParamSub = this.route.queryParams
      .subscribe((queryParams: Params) => {
        let indexBidang = this.bidangDirektoratSektorService.getBidangDirektori()
            .findIndex(obj => {
              return obj.namaBidang === queryParams['bidang'];
            });
            // if index not found set to index 0 (IPOLHANKAM)
            if (indexBidang < 0) {
                indexBidang = 0;
            }
            // if bidang IPOLHANKAM custom description namaBidang
            if (indexBidang === 0) {
              this.namaBidang = 'Ideologi, Politik, Pertahanan dan Keamanan, Cegah Tangkal dan Pengawasan Orang Asing, Pengamanan Sumber Daya Organisasi Kejaksaan dan Pengamanan Penanganan Perkara';
            } else {
              this.namaBidang = this.bidangDirektoratSektorService.getBidangDirektori()[indexBidang].deskripsiBidang!;
            }
      });
  }

  onOpenHelp() {
    
  }

  ngOnDestroy(): void {
    if (this.bidangQueryParamSub) {
      this.bidangQueryParamSub.unsubscribe();
    }
  }

}
