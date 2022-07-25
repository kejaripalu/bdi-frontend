import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuratMasuk } from '../../surat-masuk.model';
import { SuratMasukService } from '../../surat-masuk.service';

@Component({
  selector: 'app-surat-masuk-biasa-form',
  templateUrl: './surat-masuk-biasa-form.component.html',
  styleUrls: ['./surat-masuk-biasa-form.component.css']
})
export class SuratMasukBiasaFormComponent implements OnInit {
  suratMasukForm!: FormGroup;
  editMode: boolean = false;
  isLoading: boolean = false;

  constructor(private suratMasukService: SuratMasukService,
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.isLoading = true;
    console.log(this.isLoading);
    
    const newSuratMasuk = new SuratMasuk();
    newSuratMasuk.waktuPenerimaanSurat = this.suratMasukForm.value['waktuPenerimaanSurat'];
    newSuratMasuk.asal = this.suratMasukForm.value['asal'];
    newSuratMasuk.nomorSurat = this.suratMasukForm.value['nomorSurat'];
    newSuratMasuk.tanggalSurat = this.suratMasukForm.value['tanggalSurat'];
    newSuratMasuk.perihal = this.suratMasukForm.value['perihal'];
    newSuratMasuk.jenisSurat = 'BIASA';
    newSuratMasuk.isiDisposisi = this.suratMasukForm.value['isiDisposisi'];
    newSuratMasuk.tindakLanjutDisposisi = this.suratMasukForm.value['tindakLanjutDisposisi'];
    newSuratMasuk.keterangan = this.suratMasukForm.value['keterangan'];

    this.suratMasukService.createSuratMasuk(newSuratMasuk);
    console.log(this.isLoading);
    // this.onCancel();
  }

  onCancel() {
    this.isLoading = false;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let waktuPenerimaanSurat = '';
    let asal = '';
    let nomorSurat = '';
    let perihal = '';
    let tanggalSurat = '';
    let isiDisposisi = '';
    let tindakLanjutDisposisi = '';
    let keterangan = '';

    this.suratMasukForm = new FormGroup({
      'waktuPenerimaanSurat': new FormControl(waktuPenerimaanSurat, Validators.required),
      'asal': new FormControl(asal, Validators.required),
      'nomorSurat': new FormControl(nomorSurat, Validators.required),
      'perihal': new FormControl(perihal, Validators.required),
      'tanggalSurat': new FormControl(tanggalSurat, Validators.required),
      'isiDisposisi': new FormControl(isiDisposisi),
      'tindakLanjutDisposisi': new FormControl(tindakLanjutDisposisi),
      'keterangan': new FormControl(keterangan)
    });
  }

}
