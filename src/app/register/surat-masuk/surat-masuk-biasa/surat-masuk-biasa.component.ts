import { Component, OnInit } from '@angular/core';
import { Month } from 'src/app/shared/month';
import { SuratMasuk } from '../surat-masuk.model';
import { SuratMasukService } from '../surat-masuk.service';

@Component({
  selector: 'app-surat-masuk-biasa',
  templateUrl: './surat-masuk-biasa.component.html',
  styleUrls: ['./surat-masuk-biasa.component.css']
})
export class SuratMasukBiasaComponent implements OnInit {
  suratMasuk!: SuratMasuk[];
  month = Object.keys(Month).filter((v) => isNaN(Number(v)));
  currentMonth = new Date().getMonth();

  constructor(private suratMasukService: SuratMasukService) { }

  ngOnInit(): void {
    console.log(this.currentMonth);
    this.suratMasukService.getSuratMasuk(0, 20, 'BIASA', 10).subscribe(
      data => {
        this.suratMasuk = data.content;
      }
    );
  }

}
