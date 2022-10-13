import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CurrentDateTimeService } from 'src/app/shared/curent-date-time.service';
import { Ekspedisi } from '../ekspedisi.model';
import { EkspedisiService } from '../ekspedisi.service';

@Component({
  selector: 'app-ekspedisi-form',
  templateUrl: './ekspedisi-form.component.html',
  styleUrls: ['./ekspedisi-form.component.css']
})
export class EkspedisiFormComponent implements OnInit, OnDestroy {
  ekspedisiForm!: FormGroup;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  isLoadingEditForm: boolean = false;
  error: string = null as any;
  editModeError: boolean = false;
  private ekspedisiFormSub!: Subscription;
  private ekspedisiSub!: Subscription;
  private ekspedisiParamSub!: Subscription;
  private ekspedisiQueryParamSub!: Subscription;
  private id: string = null as any;
  jenisSurat: string = null as any;
  message: string = null as any;

  modelDateTanggalSurat: NgbDateStruct = null as any; // model date NgBootstrap
  modelDateTanggalTerimaSurat: NgbDateStruct = null as any; // model date NgBootstrap

  constructor(private ekspedisiService: EkspedisiService,
              private route: ActivatedRoute, 
              private router: Router,
              private calendar: NgbCalendar, // service calendar NgBootStrap
              private currentDateTimeService: CurrentDateTimeService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.isLoadingEditForm = false;
    this.modelDateTanggalSurat = this.calendar.getToday();
    this.modelDateTanggalTerimaSurat = this.calendar.getToday();
    this.ekspedisiParamSub = this.route.params
      .subscribe((params: Params) => {
          this.isEditMode = params['id'] != null;
          this.id = params['id'];
    });
    this.ekspedisiQueryParamSub = this.route.queryParams
      .subscribe((queryParams: Params) => {
          this.jenisSurat = queryParams['jenisSurat']?.toUpperCase() !== 'RAHASIA' ? 'BIASA' : 'RAHASIA';
    });
    this.initForm();
    this.ekspedisiFormSub = this.ekspedisiForm.statusChanges.subscribe(
      // (status) => console.log(status)
    )
  }

  initForm() {
    let nomorSurat = null as any;
    let kepada = null as any;
    let perihal = null as any;
    let lampiran = null as any;
    let jamTandaTerima = this.currentDateTimeService.getCurrentTime();    
    let namaDanParaf = null as any;
    let keterangan = null as any;
    let urlFile = null as any;

    this.ekspedisiForm = new FormGroup({
      'nomorSurat': new FormControl(nomorSurat, [Validators.required, Validators.maxLength(255)]),
      'tanggalSurat': new FormControl(this.modelDateTanggalSurat, [Validators.required, Validators.minLength(10)]),
      'kepada': new FormControl(kepada, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      'perihal': new FormControl(perihal, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      'lampiran': new FormControl(lampiran, Validators.maxLength(255)),
      'tanggalTandaTerima': new FormControl(this.modelDateTanggalTerimaSurat, [Validators.required, Validators.minLength(10)]),
      'jamTandaTerima': new FormControl(jamTandaTerima, [Validators.required, Validators.minLength(5)]),
      'namaDanParaf': new FormControl(namaDanParaf),
      'keterangan': new FormControl(keterangan, Validators.maxLength(255)),
      'urlFile': new FormControl(urlFile)
    });

    if (this.isEditMode) {
      this.isLoadingEditForm = true;
      this.ekspedisiSub = this.ekspedisiService.getOneEkspedisi(this.id).subscribe({
        next: (ekspedisi) => {
          this.modelDateTanggalSurat = {year: +ekspedisi.tanggalSurat.slice(0, 4), 
            month: +ekspedisi.tanggalSurat.slice(5, 7), 
            day: +ekspedisi.tanggalSurat.slice(8, 10)};
          this.modelDateTanggalTerimaSurat = {year: +ekspedisi.tanggalTandaTerima.slice(0, 4), 
            month: +ekspedisi.tanggalTandaTerima.slice(5, 7), 
            day: +ekspedisi.tanggalTandaTerima.slice(8, 10)}; 
          
          this.ekspedisiForm = new FormGroup({
            'nomorSurat': new FormControl(ekspedisi.nomorSurat, [Validators.required, Validators.maxLength(255)]),
            'tanggalSurat': new FormControl(this.modelDateTanggalSurat, [Validators.required, Validators.minLength(10)]),
            'kepada': new FormControl(ekspedisi.kepada, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
            'perihal': new FormControl(ekspedisi.perihal, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
            'lampiran': new FormControl(ekspedisi.lampiran, Validators.maxLength(255)),
            'tanggalTandaTerima': new FormControl(this.modelDateTanggalTerimaSurat, [Validators.required, Validators.minLength(10)]),
            'jamTandaTerima': new FormControl(ekspedisi.jamTandaTerima, [Validators.required, Validators.minLength(5)]),
            'namaDanParaf': new FormControl(ekspedisi.namaDanParaf),
            'keterangan': new FormControl(ekspedisi.keterangan, Validators.maxLength(255)),
            'urlFile': new FormControl(ekspedisi.urlFile)
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
    const dateTanggalSurat = this.currentDateTimeService.getConvertCurrentDate(
      this.modelDateTanggalSurat.year,
      this.modelDateTanggalSurat.month,
      this.modelDateTanggalSurat.day);
    const dateTanggalTandaTerima = this.currentDateTimeService.getConvertCurrentDate(
      this.modelDateTanggalTerimaSurat.year,
      this.modelDateTanggalTerimaSurat.month,
      this.modelDateTanggalTerimaSurat.day);
       
    if (this.isEditMode) {
      const ekspedisi = new Ekspedisi();
    
      ekspedisi.id = this.id;
      ekspedisi.nomorSurat = this.ekspedisiForm.value['nomorSurat'];
      ekspedisi.tanggalSurat = dateTanggalSurat;
      ekspedisi.kepada = this.ekspedisiForm.value['kepada'];
      ekspedisi.perihal = this.ekspedisiForm.value['perihal'];
      ekspedisi.lampiran = this.ekspedisiForm.value['lampiran'];
      ekspedisi.tanggalTandaTerima = dateTanggalTandaTerima;
      ekspedisi.jamTandaTerima = this.ekspedisiForm.value['jamTandaTerima'];
      ekspedisi.jenisSurat = this.jenisSurat;
      ekspedisi.namaDanParaf = this.ekspedisiForm.value['namaDanParaf'];
      ekspedisi.keterangan = this.ekspedisiForm.value['keterangan'];
      ekspedisi.urlFile = this.ekspedisiForm.value['urlFile'];

      this.ekspedisiSub = this.ekspedisiService.updateEkspedisi(ekspedisi).subscribe({
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
      const ekspedisi = new Ekspedisi();
     
      ekspedisi.nomorSurat = this.ekspedisiForm.value['nomorSurat'];
      ekspedisi.tanggalSurat = dateTanggalSurat;
      ekspedisi.kepada = this.ekspedisiForm.value['kepada'];
      ekspedisi.perihal = this.ekspedisiForm.value['perihal'];
      ekspedisi.lampiran = this.ekspedisiForm.value['lampiran'];
      ekspedisi.tanggalTandaTerima = dateTanggalTandaTerima;
      ekspedisi.jamTandaTerima = this.ekspedisiForm.value['jamTandaTerima'];
      ekspedisi.jenisSurat = this.jenisSurat;
      ekspedisi.namaDanParaf = this.ekspedisiForm.value['namaDanParaf'];
      ekspedisi.keterangan = this.ekspedisiForm.value['keterangan'];
      ekspedisi.urlFile = this.ekspedisiForm.value['urlFile'];

      this.ekspedisiSub = this.ekspedisiService.createEkspedisi(ekspedisi).subscribe({
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
    this.ekspedisiForm.reset();
    if (this.jenisSurat === 'RAHASIA') {
        this.router.navigate(['/ekspedisi', 'rahasia'], {queryParams: {jenisSurat: 'RAHASIA', message: this.message}});
    } else {
        this.router.navigate(['/ekspedisi', 'biasa'], {queryParams: {jenisSurat: 'BIASA', message: this.message}});
    }   
  }

  onDateTanggalSuratSelect(date: NgbDate) {
    this.modelDateTanggalSurat = date;
  }
  
  onDateTanggalTandaTerimaSelect(date: NgbDate) {
    this.modelDateTanggalTerimaSurat = date;
  }

  ngOnDestroy(): void {
    if (this.ekspedisiFormSub) {
        this.ekspedisiFormSub.unsubscribe();
    }
    if (this.ekspedisiSub) {
        this.ekspedisiSub.unsubscribe();
    }
    if (this.ekspedisiParamSub) {
      this.ekspedisiParamSub.unsubscribe();
    }
    if (this.ekspedisiQueryParamSub) {
      this.ekspedisiQueryParamSub.unsubscribe();
    }
  }

}
