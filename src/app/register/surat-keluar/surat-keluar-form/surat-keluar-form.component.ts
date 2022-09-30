import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurrentDateTimeService } from 'src/app/shared/curent-date-time.service';
import { SuratKeluar } from '../surat-keluar.model';
import { SuratKeluarService } from '../surat-keluar.service';

@Component({
  selector: 'app-surat-keluar-form',
  templateUrl: './surat-keluar-form.component.html',
  styleUrls: ['./surat-keluar-form.component.css']
})
export class SuratKeluarFormComponent implements OnInit, OnDestroy {
  suratKeluarForm!: FormGroup;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  isLoadingEditForm: boolean = false;
  error: string = null as any;
  editModeError: boolean = false;
  private suratKeluarFormSub!: Subscription;
  private suratKeluarSub!: Subscription;
  private suratKeluarParamSub!: Subscription;
  private suratKeluarQueryParamSub!: Subscription;
  private id: string = null as any;
  jenisSurat: string = null as any;

  constructor(private suratKeluarService: SuratKeluarService,
              private route: ActivatedRoute, 
              private router: Router,
              private currentDateTimeService: CurrentDateTimeService) { }
            
  ngOnInit(): void {
    this.isLoading = false;
    this.isLoadingEditForm = false;
    this.suratKeluarParamSub = this.route.params
      .subscribe((params: Params) => {
          this.isEditMode = params['id'] != null;
          this.id = params['id'];
    });
    this.suratKeluarQueryParamSub = this.route.queryParams
      .subscribe((queryParams: Params) => {
          this.jenisSurat = queryParams['jenisSurat']?.toUpperCase() !== 'R' ? 'BIASA' : 'RAHASIA';
    });
    this.initForm();
    this.suratKeluarFormSub = this.suratKeluarForm.statusChanges.subscribe(
      // (status) => console.log(status)
    )
  }

  initForm() {
    let tanggalSurat = this.currentDateTimeService.getCurrentDate();
    let nomorSurat = null as any;
    let kepada = null as any;
    let perihal = null as any;
    let lampiran = null as any;
    let keterangan = null as any;

    this.suratKeluarForm = new FormGroup({
      'tanggalSurat': new FormControl(tanggalSurat,  [Validators.required, Validators.minLength(8)]),
      'nomorSurat': new FormControl(nomorSurat,  [Validators.required, Validators.minLength(5)]),
      'kepada': new FormControl(kepada,  [Validators.required, Validators.minLength(3)]),
      'perihal': new FormControl(perihal,  [Validators.required, Validators.minLength(5)]),
      'lampiran': new FormControl(lampiran),
      'keterangan': new FormControl(keterangan)
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.error = null as any;

    if(this.isEditMode) {
      const suratKeluar = new SuratKeluar();
      suratKeluar.id = this.id;
      suratKeluar.tanggalSurat = this.suratKeluarForm.value['tanggalSurat'];
      suratKeluar.nomorSurat = this.suratKeluarForm.value['nomorSurat'];
      suratKeluar.kepada = this.suratKeluarForm.value['kepada'];
      suratKeluar.perihal = this.suratKeluarForm.value['perihal'];
      suratKeluar.lampiran = this.suratKeluarForm.value['lampiran'];
      suratKeluar.keterangan = this.suratKeluarForm.value['keterangan'];
      suratKeluar.jenisSurat = this.jenisSurat;
    } else {
      const suratKeluar = new SuratKeluar();
      suratKeluar.tanggalSurat = this.suratKeluarForm.value['tanggalSurat'];
      suratKeluar.nomorSurat = this.suratKeluarForm.value['nomorSurat'];
      suratKeluar.kepada = this.suratKeluarForm.value['kepada'];
      suratKeluar.perihal = this.suratKeluarForm.value['perihal'];
      suratKeluar.lampiran = this.suratKeluarForm.value['lampiran'];
      suratKeluar.keterangan = this.suratKeluarForm.value['keterangan'];
      suratKeluar.jenisSurat = this.jenisSurat;

      this.suratKeluarSub = this.suratKeluarService.createSuratKeluar(suratKeluar).subscribe({
        next: () => {
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
    this.suratKeluarForm.reset();
    if (this.jenisSurat === 'RAHASIA') {
        this.router.navigate(['/surat-keluar', 'rahasia'], {queryParams: {jenisSurat: 'R'}});
    } else {
        this.router.navigate(['/surat-keluar', 'biasa'], {queryParams: {jenisSurat: 'B'}});
    }   
  }

  ngOnDestroy(): void {
    if (this.suratKeluarFormSub) {
      this.suratKeluarFormSub.unsubscribe();
    }
    if (this.suratKeluarSub) {
        this.suratKeluarSub.unsubscribe();
    }
    if (this.suratKeluarParamSub) {
      this.suratKeluarParamSub.unsubscribe();
    }
    if (this.suratKeluarQueryParamSub) {
      this.suratKeluarQueryParamSub.unsubscribe();
    }
  }

}
