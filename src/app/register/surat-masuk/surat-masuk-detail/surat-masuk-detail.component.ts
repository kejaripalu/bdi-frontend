import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SuratMasuk } from '../surat-masuk.model';
import { SuratMasukService } from '../surat-masuk.service';

@Component({
  selector: 'app-surat-masuk-detail',
  templateUrl: './surat-masuk-detail.component.html',
  styleUrls: ['./surat-masuk-detail.component.css']
})
export class SuratMasukDetailComponent implements OnInit, OnDestroy {
  suratMasuk!: SuratMasuk;
  isLoading: boolean = false;
  error: string = null as any;
  id!: string;
  private suratMasukChangeSub!: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private suratMasukService: SuratMasukService) { }

  ngOnInit(): void {
    this.error = null as any;
    this.isLoading = true;
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    )

    this.suratMasukChangeSub = this.suratMasukService.getOneSuratMasuk(this.id).subscribe({
      next: (responseData) => {
        this.suratMasuk = responseData;
        this.isLoading = false;
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    })
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  getColor() {
    return this.suratMasuk.jenisSurat === 'RAHASIA' ? 'red' : 'green';
  }

  ngOnDestroy(): void {
      if (this.suratMasukChangeSub) {
        this.suratMasukChangeSub.unsubscribe();
      }
  }

}
