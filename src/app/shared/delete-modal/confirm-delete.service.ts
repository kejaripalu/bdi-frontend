import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteModalComponent } from "./delete-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeleteService {

    constructor(public modal: NgbModal) { }

    openModal() {
        return this.modal.open(DeleteModalComponent);
    }

}