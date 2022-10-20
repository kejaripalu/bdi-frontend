import { Injectable } from "@angular/core";
import { Prodin } from "./prodin";

@Injectable({ providedIn: "root" })
export class ProdinService {
    getOneProdin(id: string) {
      throw new Error('Method not implemented.');
    }

    getProdin() {
      const prodin: Prodin[] = [
        { jenisProdin: 'LAPINHAR', namaProdin: 'Lapinhar', deskripsiProdin: 'Laporan Informasi Harian' },
        { jenisProdin: 'LAPINSUS', namaProdin: 'Lapinsus', deskripsiProdin: 'Laporan Informasi Khusus' },
        { jenisProdin: 'LAPSUS', namaProdin: 'Lapsus', deskripsiProdin: 'Laporan Intelijen Khusus' },
        { jenisProdin: 'LAPHASTUG', namaProdin: 'Laphastug', deskripsiProdin: 'Laporan Hasil Pelaksanaan Tugas' },
        { jenisProdin: 'LAPOPSIN', namaProdin: 'Lapopsin', deskripsiProdin: 'Laporan Operasi Intelijen' },
        { jenisProdin: 'LAPAT', namaProdin: 'Lapat', deskripsiProdin: 'Laporan Atensi' },
        { jenisProdin: 'LAHIN', namaProdin: 'Lahin', deskripsiProdin: 'Telaahan Intelijen' },
        { jenisProdin: 'KIRKA', namaProdin: 'Kirka', deskripsiProdin: 'Perkiraan Keadaan Intelijen' },
        { jenisProdin: 'TROOP_INFO', namaProdin: 'Troop-Info', deskripsiProdin: 'Troop-Info' },
      ];
      return prodin;
    }

}
