import { OgrFoto } from './../models/OgrFoto';
import { Kayit } from './../models/Kayit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ders } from '../models/Ders';
import { Ogrenci } from '../models/Ogrenci';
import { Sonuc } from '../models/Sonuc';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public apiUrl = "http://localhost:33055/";
  constructor(
    public http: HttpClient
  ) {
  }
  /* Öğrenci API  */
  OgrenciListe() {
    return this.http.get<Ogrenci[]>(this.apiUrl + "api/ogrenciliste");
  }
  OgrenciById(ogrId: string) {
    return this.http.get<Ogrenci>(this.apiUrl + "api/ogrencibyid/" + ogrId);
  }
  OgrenciEkle(ogr: Ogrenci) {
    return this.http.post<Sonuc>(this.apiUrl + "api/ogrenciekle", ogr);
  }
  OgrenciDuzenle(ogr: Ogrenci) {
    return this.http.put<Sonuc>(this.apiUrl + "api/ogrenciduzenle", ogr);
  }
  OgrenciSil(ogrId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "api/ogrencisil/" + ogrId);
  }
  OgrenciDersListe(ogrId: string) {
    return this.http.get<Kayit[]>(this.apiUrl + "api/ogrencidersliste/" + ogrId);
  }
  OgrFotoGuncelle(ogrFoto: OgrFoto) {
    return this.http.post<Sonuc>(this.apiUrl + "api/ogrfotoguncelle", ogrFoto);
  }
  /* Ders API  */
  DersListe() {
    return this.http.get<Ders[]>(this.apiUrl + "api/dersliste");
  }
  DersById(dersId: string) {
    return this.http.get<Ders>(this.apiUrl + "api/dersbyid/" + dersId);
  }
  DersEkle(ders: Ders) {
    return this.http.post<Sonuc>(this.apiUrl + "api/dersekle", ders);
  }
  DersDuzenle(ders: Ders) {
    return this.http.put<Sonuc>(this.apiUrl + "api/dersduzenle", ders);
  }
  DersSil(dersId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "api/derssil/" + dersId);
  }
  DersOgrenciListe(dersId: string) {
    return this.http.get<Kayit[]>(this.apiUrl + "api/dersogrenciliste/" + dersId);
  }

  /* Kayıt API */
  KayitEkle(kayit: Kayit) {
    return this.http.post<Sonuc>(this.apiUrl + "api/kayitekle", kayit);
  }
  KayitSil(kayitId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "api/kayitsil/" + kayitId);
  }
}
