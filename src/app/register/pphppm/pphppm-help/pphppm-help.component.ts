import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pphppm-help',
  templateUrl: './pphppm-help.component.html',
  styleUrls: ['./pphppm-help.component.css']
})
export class PphppmHelpComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
