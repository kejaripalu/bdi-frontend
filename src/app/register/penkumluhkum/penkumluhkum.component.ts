import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-penkumluhkum',
  templateUrl: './penkumluhkum.component.html',
  styleUrls: ['./penkumluhkum.component.css']
})
export class PenkumluhkumComponent implements OnInit {
  namaBidang: string = null as any;
  kodeRegister: string = null as any;

  constructor() { }

  ngOnInit(): void {
  }

  onOpenHelp() {
    // this.modalService.open(SuratMasukHelpComponent, { size: 'xl', scrollable: true });
  }

}
