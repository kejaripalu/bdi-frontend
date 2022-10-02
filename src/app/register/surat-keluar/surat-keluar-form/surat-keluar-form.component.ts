import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
  
  modelDate: NgbDateStruct = null as any; // model date NgBootstrap

  constructor(private suratKeluarService: SuratKeluarService,
              private route: ActivatedRoute, 
              private router: Router,
              private calendar: NgbCalendar, // service calendar NgBootStrap
              private currentDateTimeService: CurrentDateTimeService) { }
            
  ngOnInit(): void {
    this.isLoading = false;
    this.isLoadingEditForm = false;
    this.modelDate = this.calendar.getToday();
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
    let nomorSurat = null as any;
    let kepada = null as any;
    let perihal = null as any;
    let lampiran = null as any;
    let keterangan = null as any;

    this.suratKeluarForm = new FormGroup({
      'tanggalSurat': new FormControl(this.modelDate,  [Validators.required, Validators.minLength(8)]),
      'nomorSurat': new FormControl(nomorSurat,  [Validators.required, Validators.minLength(5)]),
      'kepada': new FormControl(kepada,  [Validators.required, Validators.minLength(3)]),
      'perihal': new FormControl(perihal,  [Validators.required, Validators.minLength(5)]),
      'lampiran': new FormControl(lampiran),
      'keterangan': new FormControl(keterangan)
    });

    if (this.isEditMode) {
      this.isLoadingEditForm = true;
      this.suratKeluarSub = this.suratKeluarService.getOneSuratKeluar(this.id).subscribe({
        next: (suratKeluar) => {
          this.modelDate = {year: +suratKeluar.tanggalSurat.slice(0, 4), 
                            month: +suratKeluar.tanggalSurat.slice(5, 7), 
                            day: +suratKeluar.tanggalSurat.slice(8, 10)};
          
          this.suratKeluarForm = new FormGroup({
            'tanggalSurat': new FormControl(this.modelDate, [Validators.required, Validators.minLength(8)]),
            'nomorSurat': new FormControl(suratKeluar.nomorSurat, [Validators.required, Validators.minLength(5)]),
            'kepada': new FormControl(suratKeluar.kepada, [Validators.required, Validators.minLength(3)]),
            'perihal': new FormControl(suratKeluar.perihal, [Validators.required, Validators.minLength(5)]),
            'lampiran': new FormControl(suratKeluar.lampiran),
            'keterangan': new FormControl(suratKeluar.keterangan)
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

  onSubmit() {
    this.isLoading = true;
    this.error = null as any;

    if(this.isEditMode) {
      const suratKeluar = new SuratKeluar();
      const date = this.currentDateTimeService.getConvertCurrentDate(
                    this.modelDate.year, this.modelDate.month, this.modelDate.day);

      suratKeluar.id = this.id;
      suratKeluar.tanggalSurat = date;
      suratKeluar.nomorSurat = this.suratKeluarForm.value['nomorSurat'];
      suratKeluar.kepada = this.suratKeluarForm.value['kepada'];
      suratKeluar.perihal = this.suratKeluarForm.value['perihal'];
      suratKeluar.lampiran = this.suratKeluarForm.value['lampiran'];
      suratKeluar.keterangan = this.suratKeluarForm.value['keterangan'];
      suratKeluar.jenisSurat = this.jenisSurat;

      this.suratKeluarSub = this.suratKeluarService.updateSuratKeluar(suratKeluar).subscribe({
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
      const suratKeluar = new SuratKeluar();
      const date = this.currentDateTimeService.getConvertCurrentDate(
                      this.modelDate.year, this.modelDate.month, this.modelDate.day);
      
      suratKeluar.tanggalSurat = date;
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

  onDateSelect(date: NgbDate) {
    this.modelDate = date;
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
