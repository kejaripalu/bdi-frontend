import { Pipe, PipeTransform } from "@angular/core";
import { BidangDirektoratSektorService } from "./bidang-direktorat-sektor.service";

@Pipe({
    name: 'sektorPipe',
    pure: false
})
export class SektorPipe implements PipeTransform {
    constructor(private bidangDirektoratSektorService: BidangDirektoratSektorService) { }

    transform(value: any, ...args: any[]) {
        const indexSektor = this.bidangDirektoratSektorService.getSektor()
            .findIndex(obj => {
                return obj.namaSektor === value;
        });

        let deskripsi = null;
        if (args[0] === 'bidang') {
            const indexBidang = this.bidangDirektoratSektorService.getBidangDirektori()
                .findIndex(obj => {
                    return obj.namaBidang === this.bidangDirektoratSektorService.getSektor()[indexSektor].bidangDirektorat;
            });            
            deskripsi = this.bidangDirektoratSektorService.getBidangDirektori()[indexBidang].deskripsiBidang;            
        } else  {
            deskripsi = this.bidangDirektoratSektorService.getSektor()[indexSektor].deskripsiSektor;
        }
        return deskripsi;
    }

}
