import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RegisterPPHPPM } from '../pphppm.model';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RegisterPPHPPMService } from '../pphppm.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CurrentDateTimeService } from 'src/app/shared/curent-date-time.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-pphppm-form',
  templateUrl: './pphppm-form.component.html',
  styleUrls: ['./pphppm-form.component.css']
})
export class PphppmFormComponent implements OnInit, OnDestroy {
  pphppmForm!: FormGroup;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  isLoadingEditForm: boolean = false;
  error: string = null as any;
  editModeError: boolean = false;
  private pphppmFormSub!: Subscription;
  private pphppmSub!: Subscription;
  private pphppmParamSub!: Subscription;
  private id: string = null as any;
  message: string = null as any;
  pphppmList: RegisterPPHPPM[] = [];
  jenisKelamin: string = null as any;
  currentNotificationStatus: boolean = false;

  modelDateTanggal: NgbDateStruct = null as any; // model date NgBootstrap
  modelDateTanggalLahirTamu: NgbDateStruct = null as any; // model date NgBootstrap

  constructor(
    private pphppmService: RegisterPPHPPMService,
    private route: ActivatedRoute,
    private router: Router,
    private calendar: NgbCalendar, // service calendar NgBootStrap
    private currentDateTimeService: CurrentDateTimeService,
    private notificationStatusService: NotificationService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.isLoadingEditForm = false;
    this.modelDateTanggal = this.calendar.getToday();
    this.modelDateTanggalLahirTamu = this.calendar.getToday();
    this.jenisKelamin = 'TIDAK_DITENTUKAN';
    this.pphppmParamSub = this.route.params
      .subscribe((params: Params) => {
        this.isEditMode = params['id'] != null;
        this.id = params['id'];
      });

    this.initForm();
    this.pphppmFormSub = this.pphppmForm.statusChanges.subscribe(
      // (status) => console.log(status)
    );
    this.notificationStatusService.currentNotificationStatus.subscribe(notification => this.currentNotificationStatus = notification);
  }

  initForm() {
    let jam = this.currentDateTimeService.getCurrentTime();

    this.pphppmForm = new FormGroup({
      'namaPetugasPenerima': new FormControl(null as any, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      'tanggal': new FormControl(this.modelDateTanggal, [Validators.required, Validators.minLength(10)]),
      'jam': new FormControl(jam, [Validators.required, Validators.minLength(5)]),
      'namaTamu': new FormControl(null as any, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      'tempatLahirTamu': new FormControl(null as any, Validators.maxLength(255)),
      'tanggalLahirTamu': new FormControl(this.modelDateTanggalLahirTamu, [Validators.required, Validators.minLength(10)]),
      'alamat': new FormControl(null as any, Validators.maxLength(255)),
      'nomorHandphone': new FormControl(null as any, [Validators.maxLength(13), Validators.pattern('^[0-9]*$')]),
      'email': new FormControl(null as any, [Validators.maxLength(50), Validators.email]),
      'pekerjaan': new FormControl(null as any, Validators.maxLength(255)),
      'nomorIdentitas': new FormControl(null as any, Validators.maxLength(16)),
      'namaOrganisasi': new FormControl(null as any, Validators.maxLength(255)),
      'informasiYangDisampaikan': new FormControl(null as any, Validators.required),
      'dokumenYangDisampaikan': new FormControl(null as any, Validators.maxLength(255)),
      'keterangan': new FormControl(null as any, Validators.maxLength(255)),
      'urlFile': new FormControl(null as any)
    });

    if (this.isEditMode) {
      this.isLoadingEditForm = true;
      this.pphppmSub = this.pphppmService.getOne(this.id).subscribe({
        next: (pphppm) => {
          this.modelDateTanggal = {
            year: +pphppm.tanggal.slice(0, 4),
            month: +pphppm.tanggal.slice(5, 7),
            day: +pphppm.tanggal.slice(8, 10)
          };
          this.modelDateTanggalLahirTamu = {
            year: +pphppm.tanggalLahirTamu.slice(0, 4),
            month: +pphppm.tanggalLahirTamu.slice(5, 7),
            day: +pphppm.tanggalLahirTamu.slice(8, 10)
          };

          this.pphppmForm = new FormGroup({
            'namaPetugasPenerima': new FormControl(pphppm.namaPetugasPenerima, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            'tanggal': new FormControl(this.modelDateTanggal, [Validators.required, Validators.minLength(10)]),
            'jam': new FormControl(pphppm.jam, [Validators.required, Validators.minLength(5)]),
            'namaTamu': new FormControl(pphppm.namaTamu, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            'tempatLahirTamu': new FormControl(pphppm.tempatLahirTamu, Validators.maxLength(255)),
            'tanggalLahirTamu': new FormControl(this.modelDateTanggalLahirTamu, [Validators.required, Validators.minLength(10)]),
            'alamat': new FormControl(pphppm.alamat, Validators.maxLength(255)),
            'nomorHandphone': new FormControl(pphppm.nomorHandphone, Validators.maxLength(13)),
            'email': new FormControl(pphppm.email, Validators.maxLength(50)),
            'pekerjaan': new FormControl(pphppm.pekerjaan, Validators.maxLength(255)),
            'nomorIdentitas': new FormControl(pphppm.nomorIdentitas, Validators.maxLength(16)),
            'namaOrganisasi': new FormControl(pphppm.namaOrganisasi, Validators.maxLength(255)),
            'informasiYangDisampaikan': new FormControl(pphppm.informasiYangDisampaikan),
            'dokumenYangDisampaikan': new FormControl(pphppm.dokumenYangDisampaikan, Validators.maxLength(255)),
            'keterangan': new FormControl(pphppm.keterangan, Validators.maxLength(255)),
            'urlFile': new FormControl(pphppm.urlFile)
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
    const dateDateTanggal = this.currentDateTimeService.getConvertCurrentDate(
      this.modelDateTanggal.year,
      this.modelDateTanggal.month,
      this.modelDateTanggal.day);
    const dateTanggalLahirTamu = this.currentDateTimeService.getConvertCurrentDate(
      this.modelDateTanggalLahirTamu.year,
      this.modelDateTanggalLahirTamu.month,
      this.modelDateTanggalLahirTamu.day);

    const pphppm = new RegisterPPHPPM();
    pphppm.namaPetugasPenerima = this.pphppmForm.value['namaPetugasPenerima'];
    pphppm.tanggal = dateDateTanggal;
    pphppm.jam = this.pphppmForm.value['jam'];
    pphppm.namaTamu = this.pphppmForm.value['namaTamu'];
    pphppm.tempatLahirTamu = this.pphppmForm.value['tempatLahirTamu'];
    pphppm.tanggalLahirTamu = dateTanggalLahirTamu;
    pphppm.alamat = this.pphppmForm.value['alamat'];
    pphppm.jenisKelamin = this.jenisKelamin;
    pphppm.nomorHandphone = this.pphppmForm.value['nomorHandphone'];
    pphppm.email = this.pphppmForm.value['email'];
    pphppm.pekerjaan = this.pphppmForm.value['pekerjaan'];
    pphppm.nomorIdentitas = this.pphppmForm.value['nomorIdentitas'];
    pphppm.namaOrganisasi = this.pphppmForm.value['namaOrganisasi'];
    pphppm.informasiYangDisampaikan = this.pphppmForm.value['informasiYangDisampaikan'];
    pphppm.dokumenYangDisampaikan = this.pphppmForm.value['dokumenYangDisampaikan'];
    pphppm.keterangan = this.pphppmForm.value['keterangan'];
    pphppm.urlFile = this.pphppmForm.value['urlFile'];

    if (this.isEditMode) {
      pphppm.id = this.id;
      this.pphppmSub = this.pphppmService.update(pphppm).subscribe({
        next: () => {
          this.isLoading = false;
          this.message = 'UpdateSukses';
          this.onNotificationStatusChange(true);
          this.onCancel();
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
          this.onNotificationStatusChange(false);
        }
      });
    } else {
      this.pphppmSub = this.pphppmService.create(pphppm).subscribe({
        next: () => {
          // console.log(responseData);
          this.isLoading = false;
          this.message = 'SimpanSukses';
          this.onNotificationStatusChange(true);
          this.onCancel();
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
          this.onNotificationStatusChange(false);
        }
      });
    }
  }

  onCancel() {
    this.pphppmForm.reset();
    this.router.navigate(['/pphppm', 'list'], { queryParams: { message: this.message } });
  }

  onDateTanggalSelect(date: NgbDate) {
    this.modelDateTanggal = date;
  }

  onDateTanggalLahirTamuSelect(date: NgbDate) {
    this.modelDateTanggalLahirTamu = date;
  }

  onJenisKelaminChange(value: string) {
    this.jenisKelamin = value;
  }

  onNotificationStatusChange(status: boolean) {
    this.notificationStatusService.changeNotificationStatus(status);
  }

  ngOnDestroy(): void {
    if (this.pphppmFormSub) {
      this.pphppmFormSub.unsubscribe();
    }
    if (this.pphppmSub) {
      this.pphppmSub.unsubscribe();
    }
    if (this.pphppmParamSub) {
      this.pphppmParamSub.unsubscribe();
    }
  }

}
