import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { min, Subscription } from 'rxjs';
import { CurrentDateTimeService } from 'src/app/shared/curent-date-time.service';
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
  message: string = null as any;

  modelDateTanggalPenerimaanSurat: NgbDateStruct = null as any; // model date NgBootstrap
  modelDateTanggalSurat: NgbDateStruct = null as any; // model date NgBootstrap

  constructor(private suratMasukService: SuratMasukService,
              private route: ActivatedRoute, 
              private router: Router,
              private calendar: NgbCalendar, // service calendar NgBootStrap
              private currentDateTimeService: CurrentDateTimeService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.isLoadingEditForm = false;
    this.modelDateTanggalPenerimaanSurat = this.calendar.getToday();
    this.modelDateTanggalSurat = this.calendar.getToday();
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
    const dateTanggalPenerimaanSurat = this.currentDateTimeService.getConvertCurrentDate(
      this.modelDateTanggalPenerimaanSurat.year,
      this.modelDateTanggalPenerimaanSurat.month,
      this.modelDateTanggalPenerimaanSurat.day);
    const dateTanggalSurat = this.currentDateTimeService.getConvertCurrentDate(
      this.modelDateTanggalSurat.year,
      this.modelDateTanggalSurat.month,
      this.modelDateTanggalSurat.day);
       
    if (this.isEditMode) {
      const suratMasuk = new SuratMasuk();
    
      suratMasuk.id = this.id;
      suratMasuk.tanggalPenerimaanSurat = dateTanggalPenerimaanSurat;
      suratMasuk.jamPenerimaanSurat = this.suratMasukForm.value['jamPenerimaanSurat'];
      suratMasuk.asal = this.suratMasukForm.value['asal'];
      suratMasuk.nomorSurat = this.suratMasukForm.value['nomorSurat'];
      suratMasuk.tanggalSurat = dateTanggalSurat;
      suratMasuk.perihal = this.suratMasukForm.value['perihal'];
      suratMasuk.jenisSurat = this.jenisSurat;
      suratMasuk.isiDisposisi = this.suratMasukForm.value['isiDisposisi'];
      suratMasuk.tindakLanjutDisposisi = this.suratMasukForm.value['tindakLanjutDisposisi'];
      suratMasuk.keterangan = this.suratMasukForm.value['keterangan'];
      suratMasuk.urlFile = this.suratMasukForm.value['urlFile'];

      this.suratMasukSub = this.suratMasukService.updateSuratMasuk(suratMasuk).subscribe({
        next: () => {
          this.isLoading = false;
          this.message = 'UpdateSukses';
          this.onCancel();
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      });
    } else {
      // console.log(this.suratMasukForm);
      const suratMasuk = new SuratMasuk();
     
      suratMasuk.tanggalPenerimaanSurat = dateTanggalPenerimaanSurat;
      suratMasuk.jamPenerimaanSurat = this.suratMasukForm.value['jamPenerimaanSurat'];
      suratMasuk.asal = this.suratMasukForm.value['asal'];
      suratMasuk.nomorSurat = this.suratMasukForm.value['nomorSurat'];
      suratMasuk.tanggalSurat = dateTanggalSurat;
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
          this.message = 'SimpanSukses';
          this.onCancel();
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
        this.router.navigate(['/surat-masuk', 'rahasia'], {queryParams: {jenisSurat: 'RAHASIA', message: this.message}});
    } else {
        this.router.navigate(['/surat-masuk', 'biasa'], {queryParams: {jenisSurat: 'BIASA', message: this.message}});
    }   
  }

  private initForm() {
    let jamPenerimaanSurat = this.currentDateTimeService.getCurrentTime();    
    let asal = null as any;
    let nomorSurat = null as any;
    let perihal = null as any;
    let isiDisposisi = null as any;
    let tindakLanjutDisposisi = null as any;
    let keterangan = null as any;
    let urlFile = null as any;

    this.suratMasukForm = new FormGroup({
      'tanggalPenerimaanSurat': new FormControl(this.modelDateTanggalPenerimaanSurat, [Validators.required, Validators.minLength(10)]),
      'jamPenerimaanSurat': new FormControl(jamPenerimaanSurat, [Validators.required, Validators.minLength(5)]),
      'asal': new FormControl(asal, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      'nomorSurat': new FormControl(nomorSurat, [Validators.required, Validators.maxLength(255)]),
      'perihal': new FormControl(perihal, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      'tanggalSurat': new FormControl(this.modelDateTanggalSurat, [Validators.required, Validators.minLength(10)]),
      'isiDisposisi': new FormControl(isiDisposisi, Validators.maxLength(255)),
      'tindakLanjutDisposisi': new FormControl(tindakLanjutDisposisi, Validators.maxLength(255)),
      'keterangan': new FormControl(keterangan, Validators.maxLength(255)),
      'urlFile': new FormControl(urlFile)
    });

    if (this.isEditMode) {
      this.isLoadingEditForm = true;
      this.suratMasukSub = this.suratMasukService.getOneSuratMasuk(this.id).subscribe({
        next: (suratMasuk) => {
          this.modelDateTanggalPenerimaanSurat = {year: +suratMasuk.tanggalPenerimaanSurat.slice(0, 4), 
            month: +suratMasuk.tanggalPenerimaanSurat.slice(5, 7), 
            day: +suratMasuk.tanggalPenerimaanSurat.slice(8, 10)};      
          this.modelDateTanggalSurat = {year: +suratMasuk.tanggalSurat.slice(0, 4), 
            month: +suratMasuk.tanggalSurat.slice(5, 7), 
            day: +suratMasuk.tanggalSurat.slice(8, 10)};
          
          this.suratMasukForm = new FormGroup({
            'tanggalPenerimaanSurat': new FormControl(this.modelDateTanggalPenerimaanSurat, [Validators.required, Validators.minLength(10)]),
            'jamPenerimaanSurat': new FormControl(suratMasuk.jamPenerimaanSurat, [Validators.required, Validators.minLength(5)]),
            'asal': new FormControl(suratMasuk.asal, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            'nomorSurat': new FormControl(suratMasuk.nomorSurat, [Validators.required, Validators.maxLength(255)]),
            'perihal': new FormControl(suratMasuk.perihal, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
            'tanggalSurat': new FormControl(this.modelDateTanggalSurat, [Validators.required, Validators.minLength(10)]),
            'isiDisposisi': new FormControl(suratMasuk.isiDisposisi, Validators.maxLength(255)),
            'tindakLanjutDisposisi': new FormControl(suratMasuk.tindakLanjutDisposisi, Validators.maxLength(255)),
            'keterangan': new FormControl(suratMasuk.keterangan, Validators.maxLength(255)),
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

  onDateTanggalPenerimaanSelect(date: NgbDate) {
    this.modelDateTanggalPenerimaanSurat = date;
  }

  onDateTanggalSuratSelect(date: NgbDate) {
    this.modelDateTanggalSurat = date;
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
