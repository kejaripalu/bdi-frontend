import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SuratMasuk } from '../surat-masuk.model';
import { SuratMasukService } from '../surat-masuk.service';

@Component({
  selector: 'app-surat-masuk-form',
  templateUrl: './surat-masuk-form.component.html',
  styleUrls: ['./surat-masuk-form.component.css']
})
export class SuratMasukFormComponent implements OnInit, OnDestroy {
  suratMasukForm!: FormGroup;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  error: string = null as any;
  private suratMasukFormSub!: Subscription;

  constructor(private suratMasukService: SuratMasukService,
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.suratMasukFormSub = this.suratMasukForm.statusChanges.subscribe(
      // (status) => console.log(status)
    )
  }

  onSubmit() {
    this.isLoading = true;
    this.error = null as any;
    console.log(this.suratMasukForm);

    if (this.isEditMode) {
      // TODO..
    } else {
      const newSuratMasuk = new SuratMasuk();
      let waktuPenerimaanSuratConverted = 
                    this.suratMasukForm.value['waktuPenerimaanSurat'].replace('T', ' ');
     
      newSuratMasuk.waktuPenerimaanSurat = waktuPenerimaanSuratConverted;
      newSuratMasuk.asal = this.suratMasukForm.value['asal'];
      newSuratMasuk.nomorSurat = this.suratMasukForm.value['nomorSurat'];
      newSuratMasuk.tanggalSurat = this.suratMasukForm.value['tanggalSurat'];
      newSuratMasuk.perihal = this.suratMasukForm.value['perihal'];
      newSuratMasuk.jenisSurat = 'BIASA';
      newSuratMasuk.isiDisposisi = this.suratMasukForm.value['isiDisposisi'];
      newSuratMasuk.tindakLanjutDisposisi = this.suratMasukForm.value['tindakLanjutDisposisi'];
      newSuratMasuk.keterangan = this.suratMasukForm.value['keterangan'];
      newSuratMasuk.urlFile = this.suratMasukForm.value['urlFile'];

      this.suratMasukFormSub = this.suratMasukService.createSuratMasuk(newSuratMasuk).subscribe({
        next: (responseData) => {
          console.log(responseData);
          this.isLoading = false;
          this.onCancel();
        },
        error: (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      });
    }    
  }

  onCancel() {
    this.suratMasukForm.reset();
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
    let urlFile = '';

    this.suratMasukForm = new FormGroup({
      'waktuPenerimaanSurat': new FormControl(waktuPenerimaanSurat, [Validators.required, Validators.minLength(15)]),
      'asal': new FormControl(asal, [Validators.required, Validators.minLength(3)]),
      'nomorSurat': new FormControl(nomorSurat, Validators.required),
      'perihal': new FormControl(perihal, [Validators.required, Validators.minLength(5)]),
      'tanggalSurat': new FormControl(tanggalSurat, [Validators.required]),
      'isiDisposisi': new FormControl(isiDisposisi),
      'tindakLanjutDisposisi': new FormControl(tindakLanjutDisposisi),
      'keterangan': new FormControl(keterangan),
      'urlFile': new FormControl(urlFile)
    });
  }

  ngOnDestroy(): void {
      this.suratMasukFormSub.unsubscribe();
  }

}
