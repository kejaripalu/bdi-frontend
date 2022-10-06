import { Injectable } from "@angular/core";
import { Bidang } from "./bidang";
import { BidangDirektorat, BidangDirektoratLabel } from "./bidang-direktorat";
import { Sektor } from "./sektor";

@Injectable({ providedIn: 'root' })
export class BidangDirektoratSektorService {
    
    getBidangDirektori() {
        const bidang: Bidang[] = [
            { namaBidang: BidangDirektorat[BidangDirektorat.IPOLHANKAM], deskripsiBidang: BidangDirektoratLabel.get(BidangDirektorat.IPOLHANKAM) },
            { namaBidang: BidangDirektorat[BidangDirektorat.SOSBUDMAS], deskripsiBidang: BidangDirektoratLabel.get(BidangDirektorat.SOSBUDMAS) },
            { namaBidang:  BidangDirektorat[BidangDirektorat.EKOKEU], deskripsiBidang: BidangDirektoratLabel.get(BidangDirektorat.EKOKEU) },
            { namaBidang: BidangDirektorat[BidangDirektorat.PAMSTRA], deskripsiBidang: BidangDirektoratLabel.get(BidangDirektorat.PAMSTRA) },
            { namaBidang: BidangDirektorat[BidangDirektorat.TIPRODIN], deskripsiBidang: BidangDirektoratLabel.get(BidangDirektorat.TIPRODIN) }     
        ];
        return bidang;
    }

    // Ideologi, Politik, Pertahanan dan Keamanan
    getIpolhankam() {
        return [
            new Sektor('PENGAMANAN_PANCASILA', 'Pengamanan Pancasila', BidangDirektorat.IPOLHANKAM),
            new Sektor('KESATUAN_PERSATUAN_BANGSA', 'Kesatuan dan Persatuan Bangsa', BidangDirektorat.IPOLHANKAM),
            new Sektor('GERAKAN_SEPARATIS', 'Gerakan Separatis', BidangDirektorat.IPOLHANKAM),
            new Sektor('PENYELENGGARAAN_PEMERINTAHAN', 'Penyelenggaraan Pemerintahan', BidangDirektorat.IPOLHANKAM),
            new Sektor('PARPOL', 'Partai Politik', BidangDirektorat.IPOLHANKAM),
            new Sektor('PEMILU_PILKADA', 'Pemilihan Umum dan Pemilihan Kepala Daerah', BidangDirektorat.IPOLHANKAM),
            new Sektor('GERAKAN_TERORIS_RADIKAL', 'Gerakan Teroris dan Radikal', BidangDirektorat.IPOLHANKAM),
            new Sektor('PENGAMANAN_WILAYAH_TERITORIAL', 'Pengamanan wilayah Teritorial', BidangDirektorat.IPOLHANKAM),
            new Sektor('KEJAHATAN_SIBER', 'Kejahatan Siber', BidangDirektorat.IPOLHANKAM),
            new Sektor('CEGAH_TANGKAL', 'Cegah Tangkal', BidangDirektorat.IPOLHANKAM),
            new Sektor('PENGAWASAN_ORANG_ASING', 'Pengawasan Orang Asing', BidangDirektorat.IPOLHANKAM),
            new Sektor('PENGAMANAN_SUMBER_DAYA_ORGANISASI_KEJAKSAAN', 'Pengamanan Sumber Daya Organisasi Kejaksaan', BidangDirektorat.IPOLHANKAM),
            new Sektor('PENGAMANAN_PENANGANAN_PERKARA', 'Pengamanan Penanganan Perkara', BidangDirektorat.IPOLHANKAM)
        ];
    }

    // Sosial, Budaya, dan Kemasyarakatan
    getSosbudmas() {
        return [
            new Sektor('PENGAWASAN_BARCET_DALAM_NEGERI', 'Pengawasan Peredaran Barang Cetakan Dalam Negeri', BidangDirektorat.SOSBUDMAS),
            new Sektor('PENGAWASAN_BARCET_IMPORT', 'Pengawasan Peredaran Import Barang Cetakan', BidangDirektorat.SOSBUDMAS),
            new Sektor('PENGAWASAN_SISTEM_PEMBUKUAN', 'Pengawasan Sistem Pembukuan', BidangDirektorat.SOSBUDMAS),
            new Sektor('PENGAWASAN_MEDIA_KOMUNIKASI', 'Pengawasan Media Komunikasi', BidangDirektorat.SOSBUDMAS),
            new Sektor('PAKEM', 'Pengawasan Aliran Kepercayaan dan Keagamaan dalam Masyarakat', BidangDirektorat.SOSBUDMAS),
            new Sektor('PENCEGAHAN_PENYALAHGUNAAN_PENODAAN_AGAMA', 'Pencegahan Penyalahgunaan dan/atau Penodaan Agama', BidangDirektorat.SOSBUDMAS),
            new Sektor('KETAHANAN_BUDAYA', 'Ketahanan Budaya', BidangDirektorat.SOSBUDMAS),
            new Sektor('PEMBERDAYAAN_MASYARAKAT_DESA', 'Pemberdayaan Masyarakat Desa', BidangDirektorat.SOSBUDMAS),
            new Sektor('PENGAWASAN_ORMAS_LSM', 'Pengawasan Organisasi Masyarakat dan Lembaga Swadaya Masyarakat', BidangDirektorat.SOSBUDMAS),
            new Sektor('PENCEGAHAN_KONFLIK_SOSIAL', 'Pencegahan Konflik Sosial', BidangDirektorat.SOSBUDMAS),
            new Sektor('KETERTIBAN_KETENTRAMAN_UMUM', 'Ketertiban dan Ketentraman Umum', BidangDirektorat.SOSBUDMAS),
            new Sektor('PEMBINAAN_MASYARAKAT_TAAT_HUKUM', 'Pembinaan Masyarakat Taat Hukum', BidangDirektorat.SOSBUDMAS)
        ];
    }

    // Ekonomi dan Keuangan
    getEkokeu() {
        return [
            new Sektor('LEMBAGA_KEUANGAN', 'Lembaga Keuangan', BidangDirektorat.EKOKEU),
            new Sektor('KEUANGAN_NEGARA', 'Keuangan Negara', BidangDirektorat.EKOKEU),
            new Sektor('MONETER', 'Moneter', BidangDirektorat.EKOKEU),
            new Sektor('PENELUSURAN_ASET', 'Penelusuran Aset', BidangDirektorat.EKOKEU),
            new Sektor('INVESTASI_PENANAMAN_MODAL', 'Investasi / Penanaman Modal', BidangDirektorat.EKOKEU),
            new Sektor('PERPAJAKAN','Perpajakan', BidangDirektorat.EKOKEU),
            new Sektor('KEPABEANAN', 'Kepabeanan', BidangDirektorat.EKOKEU),
            new Sektor('KEPABEANAN', 'Cukai', BidangDirektorat.EKOKEU),
            new Sektor('PERDAGANGAN','Perdagangan', BidangDirektorat.EKOKEU),
            new Sektor('PERINDUSTRIAN', 'Perindustrian', BidangDirektorat.EKOKEU),
            new Sektor('KETENAGAKERJAAN', 'Ketenagakerjaan', BidangDirektorat.EKOKEU),
            new Sektor('PERKEBUNAN','Perkebunan', BidangDirektorat.EKOKEU),
            new Sektor('KEHUTANAN', 'Kehutanan', BidangDirektorat.EKOKEU),
            new Sektor('LINGKUNGAN_HIDUP', 'Lingkungan Hidup', BidangDirektorat.EKOKEU),
            new Sektor('PERIKANAN', 'Perikanan', BidangDirektorat.EKOKEU),
            new Sektor('AGRARIA_TATARUANG','Agraria / Tataruang', BidangDirektorat.EKOKEU)
        ];
    }

    // Pengamanan Pembangunan Strategis
    getPamstra() {
        return [
            new Sektor('INFRASTRUKTUR_JALAN', 'Infrastruktur Jalan', BidangDirektorat.PAMSTRA),
            new Sektor('INFRASTRUKTUR_PERKERETAAPIAN', 'Infrastruktur Perkeretaapian', BidangDirektorat.PAMSTRA),
            new Sektor('INFRASTRUKTUR_KEBANDARUDARAAN', 'Infrastruktur Kebandarudaraan', BidangDirektorat.PAMSTRA),
            new Sektor('INFRASTRUKTUR_TELEKOMUNIKASI','Infrastruktur Telekomunikasi', BidangDirektorat.PAMSTRA),
            new Sektor('INFRASTRUKTUR_KEPELABUHAN', 'Infrastruktur Kepelabuhan', BidangDirektorat.PAMSTRA),
            new Sektor('SMELTER', 'Smelter', BidangDirektorat.PAMSTRA),
            new Sektor('INFRASTRUKTUR_PENGOLAHAN_AIR', 'Infrastruktur Pengolahan Air', BidangDirektorat.PAMSTRA),
            new Sektor('TANGGUL', 'Tanggul', BidangDirektorat.PAMSTRA),
            new Sektor('BENDUNGAN', 'Bendungan', BidangDirektorat.PAMSTRA),
            new Sektor('PERTANIAN', 'Pertanian', BidangDirektorat.PAMSTRA),
            new Sektor('KELAUTAN', 'Kelautan', BidangDirektorat.PAMSTRA),
            new Sektor('KETENAGALISTRIKAN', 'Ketenagalistrikan', BidangDirektorat.PAMSTRA),
            new Sektor('ENERGI_ALTERNATIF', 'Energi Alternatif', BidangDirektorat.PAMSTRA),
            new Sektor('MINYAK_GAS_BUMI', 'Minyak dan Gas Bumi', BidangDirektorat.PAMSTRA),
            new Sektor('IPTEK', 'Ilmu Pengetahuan dan Teknologi', BidangDirektorat.PAMSTRA),
            new Sektor('PERUMAHAN', 'Perumahan', BidangDirektorat.PAMSTRA),
            new Sektor('PARIWISATA', 'Pariwisata', BidangDirektorat.PAMSTRA),
            new Sektor('KAWASAN_INDUSTRI_PRIORITAS_KEK', 'Kawasan Industri Prioritas / Kawasan Ekonomi Khusus', BidangDirektorat.PAMSTRA),
            new Sektor('POS_LINTAS_BATAS_NEGARA_SARANA_PENUNJANG', 'Pos Lintas Batas Negara dan Sarana Penunjang', BidangDirektorat.PAMSTRA),
            new Sektor('SEKTOR_LAINNYA', 'Sektor Lainnya', BidangDirektorat.PAMSTRA)
        ];    
    }

    // Teknologi Informasi, dan Produksi Intelijen
    getTiprodin() {
        return [
            new Sektor('PRODUKSI_INTELIJEN', 'Produksi Intelijen', BidangDirektorat.TIPRODIN),
            new Sektor('PEMANTAUAN', 'Pemantauan', BidangDirektorat.TIPRODIN),
            new Sektor('INTELIJEN_SINYAL', 'Intelijen Sinyal', BidangDirektorat.TIPRODIN),
            new Sektor('INTELIJEN_SIBER', 'Intelijen Siber', BidangDirektorat.TIPRODIN),
            new Sektor('KLANDESTINE', 'Klandestine', BidangDirektorat.TIPRODIN),
            new Sektor('DIGITAL_FORENSIK', 'Digital Forensik', BidangDirektorat.TIPRODIN),
            new Sektor('TRANSMISI_BERITA_SANDI', 'Transmisi Berita Sandi', BidangDirektorat.TIPRODIN),
            new Sektor('KONTRA_PENGINDERAAN', 'Kontra Penginderaan', BidangDirektorat.TIPRODIN),
            new Sektor('AUDIT_PENGUJIAN_SISTEM_KEAMANAN_INFORMASI', 'Audit dan Pengujian Sistem Keamanan Informasi', BidangDirektorat.TIPRODIN),
            new Sektor('PENGAMANAN_SINYAL', 'Pengamanan Sinyal', BidangDirektorat.TIPRODIN),
            new Sektor('PENGEMBANGAN_SDM_SANDI', 'Pengembangan SDM dan Sandi', BidangDirektorat.TIPRODIN),
            new Sektor('PENGEMBANGAN_SDM_INTELIJEN_LAINNYA', 'Pengembangan SDM Intelijen Lainnya', BidangDirektorat.TIPRODIN),
            new Sektor('PENGEMBANGAN_TEKNOLOGI', 'Pengembangan Teknologi', BidangDirektorat.TIPRODIN),
            new Sektor('PENGEMBANGAN_PROSEDUR_APLIKASI', 'Pengembangan Prosedur dan Aplikasi', BidangDirektorat.TIPRODIN)
        ];
    }

}
