import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-surat-masuk-biasa-form',
  templateUrl: './surat-masuk-biasa-form.component.html',
  styleUrls: ['./surat-masuk-biasa-form.component.css']
})
export class SuratMasukBiasaFormComponent implements OnInit {
  suratMasukForm!: FormGroup;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {

  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let waktuPenerimaanSurat = '';
    let asal = '';
    let nomorSurat = '';
    let perihal = '';
    let tanggalSurat = '';
    let isiDisposisi = '';
    let tindakLanjutDisposisi = '';
    let keterangan = '';

    this.suratMasukForm = new FormGroup({
      'waktuPenerimaanSurat': new FormControl(waktuPenerimaanSurat, Validators.required),
      'asal': new FormControl(asal, Validators.required),
      'nomorSurat': new FormControl(nomorSurat, Validators.required),
      'perihal': new FormControl(perihal, Validators.required),
      'tanggalSurat': new FormControl(tanggalSurat, Validators.required),
      'isiDisposisi': new FormControl(isiDisposisi),
      'tindakLanjutDisposisi': new FormControl(tindakLanjutDisposisi),
      'keterangan': new FormControl(keterangan)
    });
  }

}
