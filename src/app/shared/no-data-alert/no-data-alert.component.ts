import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-data-alert',
  templateUrl: './no-data-alert.component.html',
  styleUrls: ['./no-data-alert.component.css']
})
export class NoDataAlertComponent implements OnInit {

  @Input() message: string = 'Tidak ada Data!';

  constructor() { }

  ngOnInit(): void {
  }

}
