import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-surat-masuk-help',
  templateUrl: './surat-masuk-help.component.html',
  styleUrls: ['./surat-masuk-help.component.css']
})
export class SuratMasukHelpComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
