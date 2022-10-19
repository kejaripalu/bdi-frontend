export enum BidangDirektorat {
    IPOLHANKAM,
    SOSBUDMAS,
    EKOKEU,
    PAMSTRA,
    TIPRODIN
}

export const BidangDirektoratLabel = new Map<number, string>([
    [BidangDirektorat.IPOLHANKAM, 'Ideologi, Politik, Pertahanan dan Keamanan'],
    [BidangDirektorat.SOSBUDMAS, 'Sosial, Budaya, dan Kemasyarakatan'],
    [BidangDirektorat.EKOKEU, 'Ekonomi dan Keuangan'],
    [BidangDirektorat.PAMSTRA, 'Pengamanan Pembangunan Strategis'],
    [BidangDirektorat.TIPRODIN, 'Teknologi Informasi dan Produksi Intelijen']
]);
