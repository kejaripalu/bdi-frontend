import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { BidangDirektoratSektorService } from 'src/app/shared/bidang-direktorat/bidang-direktorat-sektor.service';
import { Sektor } from 'src/app/shared/bidang-direktorat/sektor';
import { CurrentDateTimeService } from 'src/app/shared/curent-date-time.service';
import { RegisterKerjaIntelijen } from '../rki.model';
import { RegisterKerjaIntelijenService } from '../rki.service';

@Component({
  selector: 'app-rki-form',
  templateUrl: './rki-form.component.html',
  styleUrls: ['./rki-form.component.css']
})
export class RkiFormComponent implements OnInit, OnDestroy {
  rkiForm!: FormGroup;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  isLoadingEditForm: boolean = false;
  error: string = null as any;
  editModeError: boolean = false;
  private rkiFormSub!: Subscription;
  private rkiSub!: Subscription;
  private rkiParamSub!: Subscription;
  private rkiQueryParamSub!: Subscription;
  private id: string = null as any;
  namaBidang: string = null as any;
  title: string = null as any;
  indexBidang!: number;
  message: string = null as any;
  nilaiSumberInformasi: string = null as any;
  nilaiIsiInformasi: string = null as any;
  sektorList: Sektor[] = [];
  namaSektorSelected: string = null as any;
  deskripsiSektorSelected: string = null as any;
  tindakLanjutSelected: string = null as any;
  isSelectTindakLanjut: boolean = false;

  modelDateTanggalWaktuDiterima: NgbDateStruct = null as any; // model date NgBootstrap

  constructor(private rkiService: RegisterKerjaIntelijenService,
              private bidangDirektoratSektorService: BidangDirektoratSektorService,
              private route: ActivatedRoute, 
              private router: Router,
              private calendar: NgbCalendar, // service calendar NgBootStrap
              private currentDateTimeService: CurrentDateTimeService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.isLoadingEditForm = false;
    this.nilaiSumberInformasi = 'A';
    this.nilaiIsiInformasi = '1';
    this.modelDateTanggalWaktuDiterima = this.calendar.getToday();
    this.rkiParamSub = this.route.params
      .subscribe((params: Params) => {
        this.isEditMode = params['id'] != null;
        this.id = params['id'];
    });
    this.rkiQueryParamSub = this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.indexBidang = this.bidangDirektoratSektorService.getBidangDirektori()
          .findIndex(obj => {
              return obj.namaBidang === queryParams['bidang'];
            });
            // if index not found set to index 0 (IPOLHANKAM)
            if (this.indexBidang < 0) {
              this.indexBidang = 0;
            }
            this.title = this.bidangDirektoratSektorService.getBidangDirektori()[this.indexBidang].deskripsiBidang!;       
            this.namaBidang = this.bidangDirektoratSektorService.getBidangDirektori()[this.indexBidang].namaBidang!;          
    });
    this.initForm();
    this.rkiFormSub = this.rkiForm.statusChanges.subscribe(
      // (status) => console.log(status)
    );
  }

  initForm() {
    let jamWaktuDiterima = this.currentDateTimeService.getCurrentTime();
    let sumberBapul = null as any;
    let uraianPeristiwaMasalah = null as any;
    let catatan = null as any;
    let tindakLanjut = null as any;
    let disposisiTindakan = null as any;
    let keterangan = null as any;
    let urlFile = null as any;

    this.rkiForm = new FormGroup({
      'tanggalWaktuDiterima': new FormControl(this.modelDateTanggalWaktuDiterima, [Validators.required, Validators.minLength(10)]),
      'jamWaktuDiterima': new FormControl(jamWaktuDiterima, [Validators.required, Validators.minLength(5)]),
      'sumberBapul': new FormControl(sumberBapul, [Validators.required, Validators.minLength(5)]),
      'uraianPeristiwaMasalah': new FormControl(uraianPeristiwaMasalah, [Validators.required, Validators.minLength(10)]),
      'catatan': new FormControl(catatan),
      'tindakLanjut': new FormControl(tindakLanjut),
      'disposisiTindakan': new FormControl(disposisiTindakan),
      'keterangan': new FormControl(keterangan),
      'urlFile': new FormControl(urlFile)
    });
    
    if (this.namaBidang === 'IPOLHANKAM') {
      for (let i = 0; i < 13; i++) {        
          this.sektorList.push(
            { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
              namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
            });
      }
      this.namaSektorSelected = this.sektorList[0].namaSektor!;  
      this.deskripsiSektorSelected = this.sektorList[0].deskripsiSektor!;
    } else if (this.namaBidang === 'SOSBUDMAS') {
      for (let i = 13; i < 25; i++) {        
        this.sektorList.push(
          { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
            namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
          });
      }
      this.namaSektorSelected = this.sektorList[0].namaSektor!;
      this.deskripsiSektorSelected = this.sektorList[0].deskripsiSektor!;
    } else if (this.namaBidang === 'EKOKEU') {
      for (let i = 25; i < 41; i++) {        
        this.sektorList.push(
          { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
            namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
          });
      }
      this.namaSektorSelected = this.sektorList[0].namaSektor!;
      this.deskripsiSektorSelected = this.sektorList[0].deskripsiSektor!;
    } else if (this.namaBidang === 'PAMSTRA') {
      for (let i = 41; i < 61; i++) {        
        this.sektorList.push(
          { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
            namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
          });
      }
      this.namaSektorSelected = this.sektorList[0].namaSektor!;
      this.deskripsiSektorSelected = this.sektorList[0].deskripsiSektor!;
    } else if (this.namaBidang === 'TIPRODIN') {
      for (let i = 61; i < 75; i++) {        
        this.sektorList.push(
          { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
            namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
          });
      }
      this.namaSektorSelected = this.sektorList[0].namaSektor!;
      this.deskripsiSektorSelected = this.sektorList[0].deskripsiSektor!;
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.error = null as any;
    const dateTanggalWaktuDiterima = this.currentDateTimeService.getConvertCurrentDate(
      this.modelDateTanggalWaktuDiterima.year,
      this.modelDateTanggalWaktuDiterima.month,
      this.modelDateTanggalWaktuDiterima.day);
    
    if (this.isEditMode) {
      // TODO...
    } else {
      const rki = new RegisterKerjaIntelijen();

      rki.tanggalWaktuDiterima = dateTanggalWaktuDiterima;
      rki.jamWaktuDiterima = this.rkiForm.value['jamWaktuDiterima'];
      rki.sumberBapul = this.rkiForm.value['sumberBapul'];
      rki.nilaiDataInformasi = this.nilaiSumberInformasi + this.nilaiIsiInformasi;
      rki.uraianPeristiwaMasalah = this.rkiForm.value['uraianPeristiwaMasalah'];
      rki.catatan = this.rkiForm.value['catatan'];
      rki.disposisiTindakan = this.rkiForm.value['disposisiTindakan'];
      if (this.isSelectTindakLanjut) {
        rki.tindakLanjut = this.rkiForm.value['tindakLanjut'];
      } else {
        rki.tindakLanjut = this.tindakLanjutSelected;
      }
      rki.keterangan = this.rkiForm.value['keterangan'];
      rki.urlFile = this.rkiForm.value['urlFile'];
      rki.bidangDirektorat = this.namaBidang;
      rki.sektor = this.namaSektorSelected;

      this.rkiSub = this.rkiService.createRKI(rki).subscribe({
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

  onDateTanggalWaktuDiterimaSelect(date: NgbDate) {
    this.modelDateTanggalWaktuDiterima = date;
  }

  onNilaiIsiInformasiChange(value: string) {
    this.nilaiIsiInformasi = value;
  }

  onNilaiSumberInformasiChange(value: string) {
    this.nilaiSumberInformasi = value;
  }

  sektorChange(value: string) {
    this.namaSektorSelected = value;
  }

  tindakLanjutChange(value: string) {
    if (value === '0') {
      this.tindakLanjutSelected = null as any;
      this.isSelectTindakLanjut = false;
    } else if (value === 'lainnya') {
      this.isSelectTindakLanjut = true;
    }else {
      this.tindakLanjutSelected = value;
      this.isSelectTindakLanjut = false;
    }
  }

  onCancel() {
    this.rkiForm.reset();    
    this.router.navigate(['/rki', 'list'], { 
      queryParams: { 
        bidang: this.namaBidang, 
        message: this.message 
      } 
    });
  }

  ngOnDestroy(): void {
    if (this.rkiFormSub) {
        this.rkiFormSub.unsubscribe();
    }
    if (this.rkiSub) {
        this.rkiSub.unsubscribe();
    }
    if (this.rkiParamSub) {
      this.rkiParamSub.unsubscribe();
    }
    if (this.rkiQueryParamSub) {
      this.rkiQueryParamSub.unsubscribe();
    }
  }

}
