import { Ders } from 'src/app/models/Ders';
import { Ogrenci } from 'src/app/models/Ogrenci';
export class Kayit {
  kayitId: string;
  kayitDersId: string;
  kayitOgrId: string;
  ogrBilgi: Ogrenci;
  dersBilgi: Ders;
}
