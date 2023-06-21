import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { RegisterTelaahanIntelijenService } from '../lahin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CurrentDateTimeService } from 'src/app/shared/curent-date-time.service';
import { RegisterLahin } from '../lahin.model';

@Component({
  selector: 'app-lahin-form',
  templateUrl: './lahin-form.component.html',
  styleUrls: ['./lahin-form.component.css']
})
export class LahinFormComponent implements OnInit, OnDestroy {
  lahinForm!: FormGroup;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  isLoadingEditForm: boolean = false;
  error: string = null as any;
  editModeError: boolean = false;
  private lahinFormSub!: Subscription;
  private lahinSub!: Subscription;
  private lahinParamSub!: Subscription;
  private id: string = null as any;
  jenisSurat: string = null as any;
  message: string = null as any;

  modelDateTanggalLahin: NgbDateStruct = null as any; // model date NgBootstrap

  constructor(private lahinService: RegisterTelaahanIntelijenService,
              private route: ActivatedRoute, 
              private router: Router,
              private calendar: NgbCalendar, // service calendar NgBootStrap
              private currentDateTimeService: CurrentDateTimeService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.isLoadingEditForm = false;
    this.modelDateTanggalLahin = this.calendar.getToday();
    this.lahinParamSub = this.route.params
      .subscribe((params: Params) => {
          this.isEditMode = params['id'] != null;
          this.id = params['id'];
    });
    this.initForm();
    this.lahinFormSub = this.lahinForm.statusChanges.subscribe(
      // (status) => console.log(status)
    )
  }

  initForm() {
    let nomor = null as any;
    let pembuat = null as any;
    let perihal = null as any;
    let lampiran = null as any;
    let tindakLanjut = null as any;
    let keterangan = null as any;
    let urlFile = null as any;

    this.lahinForm = new FormGroup({
      'nomor': new FormControl(nomor, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      'tanggal': new FormControl(this.modelDateTanggalLahin, [Validators.required, Validators.minLength(10)]),
      'pembuat': new FormControl(pembuat, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      'perihal': new FormControl(perihal, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      'lampiran': new FormControl(lampiran, Validators.maxLength(255)),
      'tindakLanjut': new FormControl(tindakLanjut),
      'keterangan': new FormControl(keterangan, Validators.maxLength(255)),
      'urlFile': new FormControl(urlFile)
    });

    if (this.isEditMode) {
      this.isLoadingEditForm = true;
      this.lahinSub = this.lahinService.getOne(this.id).subscribe({
        next: (lahin) => {    
          this.modelDateTanggalLahin = {year: +lahin.tanggal.slice(0, 4), 
            month: +lahin.tanggal.slice(5, 7), 
            day: +lahin.tanggal.slice(8, 10)};
          
          this.lahinForm = new FormGroup({
            'nomor': new FormControl(lahin.nomor, [Validators.required, Validators.maxLength(255)]),
            'tanggal': new FormControl(this.modelDateTanggalLahin, [Validators.required, Validators.minLength(10)]),
            'pembuat': new FormControl(lahin.pembuat, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            'perihal': new FormControl(lahin.perihal, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
            'lampiran': new FormControl(lahin.lampiran, Validators.maxLength(255)),
            'tindakLanjut': new FormControl(lahin.tindakLanjut),
            'keterangan': new FormControl(lahin.keterangan, Validators.maxLength(255)),
            'urlFile': new FormControl(lahin.urlFile)
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
    const dateDateTanggalLahin = this.currentDateTimeService.getConvertCurrentDate(
      this.modelDateTanggalLahin.year,
      this.modelDateTanggalLahin.month,
      this.modelDateTanggalLahin.day);
  
    const lahin = new RegisterLahin();
    lahin.nomor = this.lahinForm.value['nomor'];
    lahin.tanggal = dateDateTanggalLahin;
    lahin.pembuat = this.lahinForm.value['pembuat'];
    lahin.perihal = this.lahinForm.value['perihal'];
    lahin.lampiran = this.lahinForm.value['lampiran'];
    lahin.tindakLanjut = this.lahinForm.value['tindakLanjut'];
    lahin.keterangan = this.lahinForm.value['keterangan'];
    lahin.urlFile = this.lahinForm.value['urlFile'];
    
    if (this.isEditMode) {
      lahin.id = this.id;
      this.lahinSub = this.lahinService.update(lahin).subscribe({
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
      this.lahinSub = this.lahinService.create(lahin).subscribe({
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
    this.lahinForm.reset();
    this.router.navigate(['/lahin', 'list'], { queryParams: { message: this.message } }); 
  }

  onDateTanggalSelect(date: NgbDate) {
    this.modelDateTanggalLahin = date;
  }

  ngOnDestroy(): void {
    if (this.lahinFormSub) {
      this.lahinFormSub.unsubscribe();
    }
    if (this.lahinSub) {
        this.lahinSub.unsubscribe();
    }
    if (this.lahinParamSub) {
      this.lahinParamSub.unsubscribe();
    }
  }

}
