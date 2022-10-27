import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CurrentDateTimeService } from 'src/app/shared/curent-date-time.service';
import { Arsip } from '../arsip.model';
import { ArsipService } from '../arsip.service';

@Component({
  selector: 'app-arsip-form',
  templateUrl: './arsip-form.component.html',
  styleUrls: ['./arsip-form.component.css']
})
export class ArsipFormComponent implements OnInit, OnDestroy {
  arsipForm!: FormGroup;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  isLoadingEditForm: boolean = false;
  error: string = null as any;
  editModeError: boolean = false;
  private arsipFormSub!: Subscription;
  private arsipSub!: Subscription;
  private arsipParamSub!: Subscription;
  private arsipQueryParamSub!: Subscription;
  private id: string = null as any;
  jenisSurat: string = null as any;
  message: string = null as any;

  modelDateTanggalPenerimaanArsip: NgbDateStruct = null as any; // model date NgBootstrap
  modelDateTanggalSurat: NgbDateStruct = null as any; // model date NgBootstrap

  constructor(private arsipService: ArsipService,
              private route: ActivatedRoute, 
              private router: Router,
              private calendar: NgbCalendar, // service calendar NgBootStrap
              private currentDateTimeService: CurrentDateTimeService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.isLoadingEditForm = false;
    this.modelDateTanggalPenerimaanArsip = this.calendar.getToday();
    this.modelDateTanggalSurat = this.calendar.getToday();
    this.arsipParamSub = this.route.params
      .subscribe((params: Params) => {
          this.isEditMode = params['id'] != null;
          this.id = params['id'];
    });
    this.initForm();
    this.arsipFormSub = this.arsipForm.statusChanges.subscribe(
      // (status) => console.log(status)
    )
  }

  initForm() {
    let jamPenerimaanArsip = this.currentDateTimeService.getCurrentTime();    
    let diterimaDari = null as any;
    let nomorSurat = null as any;
    let perihal = null as any;
    let lampiran = null as any;
    let kodePenyimpanan = null as any;
    let keterangan = null as any;
    let urlFile = null as any;

    this.arsipForm = new FormGroup({
      'tanggalPenerimaanArsip': new FormControl(this.modelDateTanggalPenerimaanArsip, [Validators.required, Validators.minLength(10)]),
      'jamPenerimaanArsip': new FormControl(jamPenerimaanArsip, [Validators.required, Validators.minLength(5)]),
      'diterimaDari': new FormControl(diterimaDari, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      'nomorSurat': new FormControl(nomorSurat, [Validators.required, Validators.maxLength(255)]),
      'tanggalSurat': new FormControl(this.modelDateTanggalSurat, [Validators.required, Validators.minLength(10)]),
      'perihal': new FormControl(perihal, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      'lampiran': new FormControl(lampiran, Validators.maxLength(255)),
      'kodePenyimpanan': new FormControl(kodePenyimpanan, [Validators.required, Validators.maxLength(255)]),
      'keterangan': new FormControl(keterangan, Validators.maxLength(255)),
      'urlFile': new FormControl(urlFile)
    });

    if (this.isEditMode) {
      // TO DO
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.error = null as any;
    const dateTanggalPenerimaanArsip = this.currentDateTimeService.getConvertCurrentDate(
      this.modelDateTanggalPenerimaanArsip.year,
      this.modelDateTanggalPenerimaanArsip.month,
      this.modelDateTanggalPenerimaanArsip.day);
    const dateTanggalSurat = this.currentDateTimeService.getConvertCurrentDate(
      this.modelDateTanggalSurat.year,
      this.modelDateTanggalSurat.month,
      this.modelDateTanggalSurat.day);
    
    if (this.isEditMode) {
      // TO DO
    } else {
      const arsip = new Arsip();
      arsip.tanggalPenerimaanArsip = dateTanggalPenerimaanArsip;
      arsip.jamPenerimaanArsip = this.arsipForm.value['jamPenerimaanArsip'];
      arsip.diterimaDari = this.arsipForm.value['diterimaDari'];
      arsip.nomorSurat = this.arsipForm.value['nomorSurat'];
      arsip.tanggalSurat = dateTanggalSurat;
      arsip.perihal = this.arsipForm.value['perihal'];
      arsip.lampiran = this.arsipForm.value['lampiran'];
      arsip.kodePenyimpanan = this.arsipForm.value['kodePenyimpanan'];
      arsip.keterangan = this.arsipForm.value['keterangan'];
      arsip.urlFile = this.arsipForm.value['urlFile'];

      this.arsipSub = this.arsipService.create(arsip).subscribe({
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
    this.arsipForm.reset();
    this.router.navigate(['/arsip', 'list'], { queryParams: { message: this.message } }); 
  }

  onDateTanggalSuratSelect(date: NgbDate) {
    this.modelDateTanggalSurat = date;
  }

  onDateTanggalPenerimaanSelect(date: NgbDate) {
    this.modelDateTanggalPenerimaanArsip = date;
  }

  ngOnDestroy(): void {
    if (this.arsipFormSub) {
        this.arsipFormSub.unsubscribe();
    }
    if (this.arsipSub) {
        this.arsipSub.unsubscribe();
    }
    if (this.arsipParamSub) {
      this.arsipParamSub.unsubscribe();
    }
    if (this.arsipQueryParamSub) {
      this.arsipQueryParamSub.unsubscribe();
    }
  }

}
