import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Sektor } from 'src/app/shared/bidang-direktorat/sektor';
import { RegisterOpsinService } from '../opsin.service';
import { BidangDirektoratSektorService } from 'src/app/shared/bidang-direktorat/bidang-direktorat-sektor.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CurrentDateTimeService } from 'src/app/shared/curent-date-time.service';
import { RegisterOpsin } from '../opsin.model';

@Component({
  selector: 'app-opsin-form',
  templateUrl: './opsin-form.component.html',
  styleUrls: ['./opsin-form.component.css']
})
export class OpsinFormComponent implements OnInit, OnDestroy {  
  opsinForm!: FormGroup;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  isLoadingEditForm: boolean = false;
  error: string = null as any;
  editModeError: boolean = false;
  private opsinFormSub!: Subscription;
  private opsinSub!: Subscription;
  private opsinParamSub!: Subscription;
  private opsinQueryParamSub!: Subscription;
  private id: string = null as any;
  namaBidang: string = null as any;
  indexBidang!: number;
  message: string = null as any;
  sektorList: Sektor[] = [];
  namaSektorSelected: string = null as any;

  modelDateTanggal: NgbDateStruct = null as any; // model date NgBootstrap

  constructor(private opsinService: RegisterOpsinService,
              private bidangDirektoratSektorService: BidangDirektoratSektorService,
              private route: ActivatedRoute, 
              private router: Router,
              private calendar: NgbCalendar, // service calendar NgBootStrap
              private currentDateTimeService: CurrentDateTimeService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.isLoadingEditForm = false;
    this.modelDateTanggal = this.calendar.getToday();
    this.opsinParamSub = this.route.params
      .subscribe((params: Params) => {
        this.isEditMode = params['id'] != null;
        this.id = params['id'];
    });
    this.opsinQueryParamSub = this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.indexBidang = this.bidangDirektoratSektorService.getBidangDirektori()
          .findIndex(obj => {
              return obj.namaBidang === queryParams['bidang'];
            });
            // if index not found set to index 0 (IPOLHANKAM)
            if (this.indexBidang < 0) {
              this.indexBidang = 0;
            }
            this.namaBidang = this.bidangDirektoratSektorService.getBidangDirektori()[this.indexBidang].namaBidang!;          
    });
    this.initForm();
    this.opsinFormSub = this.opsinForm.statusChanges.subscribe(
      // (status) => console.log(status)
    );
  }

  private initForm() {
    let nomor = null as any;
    let perihal = null as any;
    let namaPetugasPelaksana = null as any;
    let hasilPelaksanaanOperasi = null as any;
    let keterangan = null as any;
    let urlFile = null as any;

    this.opsinForm = new FormGroup({
      'nomor': new FormControl(nomor, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      'tanggal': new FormControl(this.modelDateTanggal, [Validators.required, Validators.minLength(10)]),
      'perihal': new FormControl(perihal, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]),
      'namaPetugasPelaksana': new FormControl(namaPetugasPelaksana, [Validators.required, Validators.minLength(3)]),
      'hasilPelaksanaanOperasi': new FormControl(hasilPelaksanaanOperasi),
      'keterangan': new FormControl(keterangan, Validators.maxLength(255)),
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
    } else if (this.namaBidang === 'SOSBUDMAS') {
      for (let i = 13; i < 25; i++) {        
        this.sektorList.push(
          { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
            namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
          });
      }
      this.namaSektorSelected = this.sektorList[0].namaSektor!;
    } else if (this.namaBidang === 'EKOKEU') {
      for (let i = 25; i < 41; i++) {        
        this.sektorList.push(
          { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
            namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
          });
      }
      this.namaSektorSelected = this.sektorList[0].namaSektor!;
    } else if (this.namaBidang === 'PAMSTRA') {
      for (let i = 41; i < 61; i++) {        
        this.sektorList.push(
          { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
            namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
          });
      }
      this.namaSektorSelected = this.sektorList[0].namaSektor!;
    } else if (this.namaBidang === 'TIPRODIN') {
      for (let i = 61; i < 75; i++) {        
        this.sektorList.push(
          { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
            namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
          });
      }
      this.namaSektorSelected = this.sektorList[0].namaSektor!;
    }

    if (this.isEditMode) {
      this.isLoadingEditForm = true;
      this.opsinSub = this.opsinService.getOne(this.id).subscribe({
        next: (opsin) => {
          this.modelDateTanggal = {year: +opsin.tanggal.slice(0, 4), 
            month: +opsin.tanggal.slice(5, 7), 
            day: +opsin.tanggal.slice(8, 10)};      
          
          this.opsinForm = new FormGroup({
            'nomor': new FormControl(opsin.nomor, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
            'tanggal': new FormControl(this.modelDateTanggal, [Validators.required, Validators.minLength(10)]),
            'perihal': new FormControl(opsin.perihal, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]),
            'namaPetugasPelaksana': new FormControl(opsin.namaPetugasPelaksana, [Validators.required, Validators.minLength(3)]),
            'hasilPelaksanaanOperasi': new FormControl(opsin.hasilPelaksanaanOperasi),
            'keterangan': new FormControl(opsin.keterangan, Validators.maxLength(255)),
            'urlFile': new FormControl(opsin.urlFile)
          });
          
          this.namaSektorSelected = opsin.sektor;
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
    const dateTanggal = this.currentDateTimeService.getConvertCurrentDate(
      this.modelDateTanggal.year,
      this.modelDateTanggal.month,
      this.modelDateTanggal.day);

    if (this.isEditMode) {
      const opsin = new RegisterOpsin();

      opsin.id = this.id;
      opsin.bidangDirektorat = this.namaBidang;
      opsin.sektor = this.namaSektorSelected;
      opsin.nomor = this.opsinForm.value['nomor'];
      opsin.tanggal = dateTanggal;
      opsin.perihal = this.opsinForm.value['perihal'];
      opsin.namaPetugasPelaksana = this.opsinForm.value['namaPetugasPelaksana'];
      opsin.hasilPelaksanaanOperasi = this.opsinForm.value['hasilPelaksanaanOperasi'];
      opsin.keterangan = this.opsinForm.value['keterangan'];
      opsin.urlFile = this.opsinForm.value['urlFile'];

      this.opsinSub = this.opsinService.update(opsin).subscribe({
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
      const opsin = new RegisterOpsin();

      opsin.bidangDirektorat = this.namaBidang;
      opsin.sektor = this.namaSektorSelected;
      opsin.nomor = this.opsinForm.value['nomor'];
      opsin.tanggal = dateTanggal;
      opsin.perihal = this.opsinForm.value['perihal'];
      opsin.namaPetugasPelaksana = this.opsinForm.value['namaPetugasPelaksana'];
      opsin.hasilPelaksanaanOperasi = this.opsinForm.value['hasilPelaksanaanOperasi'];
      opsin.keterangan = this.opsinForm.value['keterangan'];
      opsin.urlFile = this.opsinForm.value['urlFile'];

      this.opsinSub = this.opsinService.create(opsin).subscribe({
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

  sektorChange(value: string) {
    this.namaSektorSelected = value;
  }

  onDateTanggalSelect(date: NgbDate) {
    this.modelDateTanggal = date;
  }

  onCancel() {
    this.opsinForm.reset();    
    this.router.navigate(['/opsin', 'list'], { 
      queryParams: { 
        bidang: this.namaBidang, 
        message: this.message 
      } 
    });
  }

  ngOnDestroy(): void {
    if (this.opsinFormSub) {
      this.opsinFormSub.unsubscribe();
    }
    if (this.opsinSub) {
        this.opsinSub.unsubscribe();
    }
    if (this.opsinParamSub) {
      this.opsinParamSub.unsubscribe();
    }
    if (this.opsinQueryParamSub) {
      this.opsinQueryParamSub.unsubscribe();
    }
  }

}
