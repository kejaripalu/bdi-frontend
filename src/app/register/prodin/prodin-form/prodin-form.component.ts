import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { BidangDirektoratSektorService } from 'src/app/shared/bidang-direktorat/bidang-direktorat-sektor.service';
import { Sektor } from 'src/app/shared/bidang-direktorat/sektor';
import { Bidang } from 'src/app/shared/bidang-direktorat/bidang';
import { CurrentDateTimeService } from 'src/app/shared/curent-date-time.service';
import { Prodin } from 'src/app/shared/prodin/prodin';
import { ProdinService } from 'src/app/shared/prodin/prodin.service';
import { ProdukIntelijenService } from '../prodin.service';
import { ProdukIntelijen } from '../prodin.model';

@Component({
  selector: 'app-prodin-form',
  templateUrl: './prodin-form.component.html',
  styleUrls: ['./prodin-form.component.css']
})
export class ProdinFormComponent implements OnInit, OnDestroy {
  prodinForm!: FormGroup;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  isLoadingEditForm: boolean = false;
  error: string = null as any;
  editModeError: boolean = false;
  private prodinFormSub!: Subscription;
  private prodinSub!: Subscription;
  private prodinParamSub!: Subscription;
  private prodinQueryParamSub!: Subscription;
  private id: string = null as any;
  message: string = null as any;
  jenisProdukIntelijenSelected: string = null as any;
  bidang: string = null as any;
  sektorSelected: string = null as any;
  jenisProdinList: Prodin[] = [];
  sektorList: Sektor[] = [];
  bidangList: Bidang[] = [];

  modelDateTanggalProduk: NgbDateStruct = null as any; // model date NgBootstrap

  constructor(private produksiIntelijenService: ProdukIntelijenService,
              private prodinService: ProdinService,
              private bidangDirektoratSektorService: BidangDirektoratSektorService,
              private route: ActivatedRoute, 
              private router: Router,
              private calendar: NgbCalendar, // service calendar NgBootStrap
              private currentDateTimeService: CurrentDateTimeService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.isLoadingEditForm = false;
    this.modelDateTanggalProduk = this.calendar.getToday();
    this.prodinParamSub = this.route.params
      .subscribe((params: Params) => {
          this.isEditMode = params['id'] != null;
          this.id = params['id'];
    });
    
    // default value
    this.jenisProdukIntelijenSelected = "LAPINHAR";
    this.bidang = "IPOLHANKAM";
    this.jenisProdinList = this.prodinService.getProdin();
    this.bidangList = this.bidangDirektoratSektorService.getBidangDirektori();
    
    this.initForm();
    this.prodinFormSub = this.prodinForm.statusChanges.subscribe(
      // (status) => console.log(status)
    )
  }

  initForm() {
    let nomorProdin = null as any;
    let perihal = null as any;
    let disposisiPimpinan = null as any;
    let keterangan = null as any;
    let urlFile = null as any;

    this.prodinForm = new FormGroup({
      'nomorProdin': new FormControl(nomorProdin, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      'tanggalProdin': new FormControl(this.modelDateTanggalProduk, [Validators.required, Validators.minLength(8)]),
      'perihal': new FormControl(perihal, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      'disposisiPimpinan': new FormControl(disposisiPimpinan, Validators.maxLength(255)),
      'keterangan': new FormControl(keterangan, Validators.maxLength(255)),
      'urlFile': new FormControl(urlFile)
    });
    this.reloadSektorList();
    
    if (this.isEditMode) {
      this.isLoadingEditForm = true;
      this.prodinSub = this.produksiIntelijenService.getOneProdin(this.id).subscribe({
        next: (prodin) => {
          this.modelDateTanggalProduk = {year: +prodin.tanggalProduk.slice(0, 4), 
            month: +prodin.tanggalProduk.slice(5, 7), 
            day: +prodin.tanggalProduk.slice(8, 10)};      
          
          this.prodinForm = new FormGroup({
            'nomorProdin': new FormControl(prodin.nomorProduk, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
            'tanggalProdin': new FormControl(this.modelDateTanggalProduk, [Validators.required, Validators.minLength(8)]),
            'perihal': new FormControl(prodin.perihal, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
            'disposisiPimpinan': new FormControl(prodin.disposisiPimpinan, Validators.maxLength(255)),
            'keterangan': new FormControl(prodin.keterangan, Validators.maxLength(255)),
            'urlFile': new FormControl(prodin.urlFile)
          });
          
          const indexSektor = this.bidangDirektoratSektorService.getSektor()
            .findIndex(obj => {
                return obj.namaSektor === prodin.sektor;
          });
          const indexBidang = this.bidangDirektoratSektorService.getBidangDirektori()
            .findIndex(obj => {
                return obj.namaBidang === this.bidangDirektoratSektorService.getSektor()[indexSektor].bidangDirektorat;
          });        
          this.bidang = this.bidangDirektoratSektorService.getBidangDirektori()[indexBidang].namaBidang!;          
          this.jenisProdukIntelijenSelected = prodin.jenisProdukIntelijen;
          this.sektorSelected = prodin.sektor;
          this.reloadSektorList();
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
    const dateTanggalProdin = this.currentDateTimeService.getConvertCurrentDate(
      this.modelDateTanggalProduk.year,
      this.modelDateTanggalProduk.month,
      this.modelDateTanggalProduk.day);

    if (this.isEditMode) {
      const prodin = new ProdukIntelijen();    
      prodin.id = this.id;
      prodin.jenisProdukIntelijen = this.jenisProdukIntelijenSelected;
      prodin.nomorProduk = this.prodinForm.value['nomorProdin'];
      prodin.tanggalProduk = dateTanggalProdin;
      prodin.sektor = this.sektorSelected;
      prodin.perihal = this.prodinForm.value['perihal'];
      prodin.disposisiPimpinan = this.prodinForm.value['disposisiPimpinan'];
      prodin.keterangan = this.prodinForm.value['keterangan'];
      prodin.urlFile = this.prodinForm.value['urlFile'];

      this.prodinSub = this.produksiIntelijenService.updateProdin(prodin).subscribe({
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
      const prodin = new ProdukIntelijen(); 
      prodin.jenisProdukIntelijen = this.jenisProdukIntelijenSelected;
      prodin.nomorProduk = this.prodinForm.value['nomorProdin'];
      prodin.tanggalProduk = dateTanggalProdin;
      prodin.sektor = this.sektorSelected;
      prodin.perihal = this.prodinForm.value['perihal'];
      prodin.disposisiPimpinan = this.prodinForm.value['disposisiPimpinan'];
      prodin.keterangan = this.prodinForm.value['keterangan'];
      prodin.urlFile = this.prodinForm.value['urlFile'];

      this.prodinSub = this.produksiIntelijenService.createProdin(prodin).subscribe({
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

  jenisProdukIntelijenChange(value: string) {
    this.jenisProdukIntelijenSelected = value;
  }

  sektorChange(value: string) {
    this.sektorSelected = value; 
  }

  bidangChange(value: string) {
    this.bidang = value;
    this.reloadSektorList();
  }

  onDateTanggalProdinSelect(date: NgbDate) {
    this.modelDateTanggalProduk = date;
  }
  
  reloadSektorList() {
    this.sektorList = [];
    if (this.bidang === 'IPOLHANKAM') {
      for (let i = 0; i < 13; i++) {        
          this.sektorList.push(
            { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
              namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
            });
      }
      if (!this.isEditMode) {
        this.sektorSelected = this.sektorList[0].namaSektor!;
      }
    } else if (this.bidang === 'SOSBUDMAS') {
      for (let i = 13; i < 25; i++) {        
        this.sektorList.push(
          { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
            namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
          });
      }
      if (!this.isEditMode) {
        this.sektorSelected = this.sektorList[0].namaSektor!;
      }
    } else if (this.bidang === 'EKOKEU') {
      for (let i = 25; i < 41; i++) {        
        this.sektorList.push(
          { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
            namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
          });
      }
      if (!this.isEditMode) {
        this.sektorSelected = this.sektorList[0].namaSektor!;
      }
    } else if (this.bidang === 'PAMSTRA') {
      for (let i = 41; i < 61; i++) {        
        this.sektorList.push(
          { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
            namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
          });
      }
      if (!this.isEditMode) {
        this.sektorSelected = this.sektorList[0].namaSektor!;
      }
    } else if (this.bidang === 'TIPRODIN') {
      for (let i = 61; i < 75; i++) {        
        this.sektorList.push(
          { deskripsiSektor: this.bidangDirektoratSektorService.getSektor()[i].deskripsiSektor!,
            namaSektor: this.bidangDirektoratSektorService.getSektor()[i].namaSektor!
          });
      }
      if (!this.isEditMode) {
        this.sektorSelected = this.sektorList[0].namaSektor!;
      }
    }    
  }

  onCancel() {
    this.prodinForm.reset();
    this.router.navigate(['/prodin', 'list'], { 
      queryParams: { 
        message: this.message 
      } 
    });
  }

  ngOnDestroy(): void {
    if (this.prodinFormSub) {
        this.prodinFormSub.unsubscribe();
    }
    if (this.prodinSub) {
        this.prodinSub.unsubscribe();
    }
    if (this.prodinParamSub) {
      this.prodinParamSub.unsubscribe();
    }
    if (this.prodinQueryParamSub) {
      this.prodinQueryParamSub.unsubscribe();
    }
  }

}

