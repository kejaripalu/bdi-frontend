import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  isLoadingEditForm: boolean = false;
  error: string = null as any;
  editModeError: boolean = false;
  private suratMasukFormSub!: Subscription;
  private suratMasukSub!: Subscription;
  private suratMasukParamSub!: Subscription;
  private suratMasukQueryParamSub!: Subscription;
  private id: string = null as any;
  jenisSurat: string = null as any;

  constructor(private suratMasukService: SuratMasukService,
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.isLoadingEditForm = false;
    this.suratMasukParamSub = this.route.params
      .subscribe((params: Params) => {
          this.isEditMode = params['id'] != null;
          this.id = params['id'];
    });
    this.suratMasukQueryParamSub = this.route.queryParams
      .subscribe((queryParams: Params) => {
          this.jenisSurat = queryParams['jenisSurat']?.toUpperCase() !== 'RAHASIA' ? 'BIASA' : 'RAHASIA';
    });
    this.initForm();
    this.suratMasukFormSub = this.suratMasukForm.statusChanges.subscribe(
      // (status) => console.log(status)
    )
  }

  onSubmit() {
    this.isLoading = true;
    this.error = null as any;
       
    if (this.isEditMode) {
      // console.log(this.suratMasukForm);
      const suratMasuk = new SuratMasuk();
      let waktuPenerimaanSuratConverted = 
                    this.suratMasukForm.value['waktuPenerimaanSurat'].replace('T', ' ');
     
      suratMasuk.id = this.id;
      suratMasuk.waktuPenerimaanSurat = waktuPenerimaanSuratConverted;
      suratMasuk.asal = this.suratMasukForm.value['asal'];
      suratMasuk.nomorSurat = this.suratMasukForm.value['nomorSurat'];
      suratMasuk.tanggalSurat = this.suratMasukForm.value['tanggalSurat'];
      suratMasuk.perihal = this.suratMasukForm.value['perihal'];
      suratMasuk.jenisSurat = this.jenisSurat;
      suratMasuk.isiDisposisi = this.suratMasukForm.value['isiDisposisi'];
      suratMasuk.tindakLanjutDisposisi = this.suratMasukForm.value['tindakLanjutDisposisi'];
      suratMasuk.keterangan = this.suratMasukForm.value['keterangan'];
      suratMasuk.urlFile = this.suratMasukForm.value['urlFile'];

      this.suratMasukSub = this.suratMasukService.updateSuratMasuk(suratMasuk).subscribe({
        next: () => {
          this.isLoading = false;
          this.onCancel();
          alert('Asiappp... berhasil update data!!!')
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      });
    } else {
      // console.log(this.suratMasukForm);
      const suratMasuk = new SuratMasuk();
      let waktuPenerimaanSuratConverted = 
                    this.suratMasukForm.value['waktuPenerimaanSurat'].replace('T', ' ');
     
      suratMasuk.waktuPenerimaanSurat = waktuPenerimaanSuratConverted;
      suratMasuk.asal = this.suratMasukForm.value['asal'];
      suratMasuk.nomorSurat = this.suratMasukForm.value['nomorSurat'];
      suratMasuk.tanggalSurat = this.suratMasukForm.value['tanggalSurat'];
      suratMasuk.perihal = this.suratMasukForm.value['perihal'];
      suratMasuk.jenisSurat = this.jenisSurat;
      suratMasuk.isiDisposisi = this.suratMasukForm.value['isiDisposisi'];
      suratMasuk.tindakLanjutDisposisi = this.suratMasukForm.value['tindakLanjutDisposisi'];
      suratMasuk.keterangan = this.suratMasukForm.value['keterangan'];
      suratMasuk.urlFile = this.suratMasukForm.value['urlFile'];

      this.suratMasukSub = this.suratMasukService.createSuratMasuk(suratMasuk).subscribe({
        next: () => {
          // console.log(responseData);
          this.isLoading = false;
          this.onCancel();
          alert('Asiappp... berhasil simpan data!!!')
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      });
    }    
  }

  onCancel() {
    this.suratMasukForm.reset();
    if (this.jenisSurat === 'RAHASIA') {
        this.router.navigate(['/surat-masuk', 'rahasia'], {queryParams: {jenisSurat: 'RAHASIA'}});
    } else {
        this.router.navigate(['/surat-masuk', 'biasa'], {queryParams: {jenisSurat: 'BIASA'}});
    }   
  }

  private initForm() {
    let waktuPenerimaanSurat = null as any;
    let asal = null as any;
    let nomorSurat = null as any;
    let perihal = null as any;
    let tanggalSurat = null as any;
    let isiDisposisi = null as any;
    let tindakLanjutDisposisi = null as any;
    let keterangan = null as any;
    let urlFile = null as any;

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

    if (this.isEditMode) {
      this.isLoadingEditForm = true;
      this.suratMasukSub = this.suratMasukService.getOneSuratMasuk(this.id).subscribe({
        next: (suratMasuk) => {
          this.suratMasukForm = new FormGroup({
            'waktuPenerimaanSurat': new FormControl(suratMasuk.waktuPenerimaanSurat, [Validators.required, Validators.minLength(15)]),
            'asal': new FormControl(suratMasuk.asal, [Validators.required, Validators.minLength(3)]),
            'nomorSurat': new FormControl(suratMasuk.nomorSurat, Validators.required),
            'perihal': new FormControl(suratMasuk.perihal, [Validators.required, Validators.minLength(5)]),
            'tanggalSurat': new FormControl(suratMasuk.tanggalSurat, [Validators.required]),
            'isiDisposisi': new FormControl(suratMasuk.isiDisposisi),
            'tindakLanjutDisposisi': new FormControl(suratMasuk.tindakLanjutDisposisi),
            'keterangan': new FormControl(suratMasuk.keterangan),
            'urlFile': new FormControl(suratMasuk.urlFile)
          });
          this.isLoadingEditForm = false;
          this.editModeError = false;
        },
        error: (errorMessage) => {
          this.isLoadingEditForm = false;
          this.error = errorMessage;
          this.editModeError = true;
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.suratMasukFormSub) {
        this.suratMasukFormSub.unsubscribe();
    }
    if (this.suratMasukSub) {
        this.suratMasukSub.unsubscribe();
    }
    if (this.suratMasukParamSub) {
      this.suratMasukParamSub.unsubscribe();
    }
    if (this.suratMasukQueryParamSub) {
      this.suratMasukQueryParamSub.unsubscribe();
    }
  }

}
