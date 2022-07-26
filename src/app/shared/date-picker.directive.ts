import { AfterViewInit, Directive, ElementRef, OnInit } from "@angular/core";

declare var $: any;

@Directive({
    selector: '[appDatePicker]'
})
export class DatePickerDirective implements OnInit {
    
    constructor(private element: ElementRef) { }

    ngOnInit(): void {
        $(this.element.nativeElement).datepicker();
    }
    
}