import { Pipe, PipeTransform } from "@angular/core";
import { BidangDirektoratSektorService } from "./bidang-direktorat-sektor.service";

@Pipe({
    name: 'sektorPipe',
    pure: false
})
export class SektorPipe implements PipeTransform {
    constructor(private bidangDirektoratSektorService: BidangDirektoratSektorService) { }

    transform(value: any, ...args: any[]) {
        const index = this.bidangDirektoratSektorService.getSektor()
            .findIndex(obj => {
                return obj.namaSektor === value;
        });

        let deskripsi = null;
        if (args[0] === 'bidang') {
            deskripsi = this.bidangDirektoratSektorService.getBidangDirektori()[index].deskripsiBidang;
        } else  {
            deskripsi = this.bidangDirektoratSektorService.getSektor()[index].deskripsiSektor;
        }
        return deskripsi;
    }

}
