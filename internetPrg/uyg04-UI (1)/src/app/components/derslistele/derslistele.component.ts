import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { Ders } from 'src/app/models/Ders';
import { MatTableDataSource } from '@angular/material/table';
import { Kayit } from './../../models/Kayit';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-derslistele',
  templateUrl: './derslistele.component.html',
  styleUrls: ['./derslistele.component.css']
})
export class DerslisteleComponent implements OnInit {
  secOgrenci: Ogrenci;
  ogrId: string;
  dersId: string = "";
  kayitlar: Kayit[];
  dersler: Ders[];
  dataSource: any;
  displayedColumns = ['dersKodu', 'dersAdi', 'dersKredi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: AlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.DerListeGetir();
    this.route.params.subscribe((p: any) => {
      if (p) {
        this.ogrId = p.ogrId;
        this.OgrenciGetir();
        this.DersListeGetir();
      }
    });
  }

  OgrenciGetir() {
    this.apiServis.OgrenciById(this.ogrId).subscribe(d => {
      this.secOgrenci = d;
    });
  }
  DersListeGetir() {
    this.apiServis.OgrenciDersListe(this.ogrId).subscribe(d => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  DersSec(d: string) {
    this.dersId = d;
  }
  Kaydet() {
    if (this.dersId == "") {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Ders Seçiniz!";
      this.alert.AlertUygula(s);
    } else {

      var kayit = new Kayit();
      kayit.kayitOgrId = this.ogrId;
      kayit.kayitDersId = this.dersId;
      this.apiServis.KayitEkle(kayit).subscribe(s => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.DersListeGetir();
        }
      });
    }

  }
  DersSil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.dersBilgi.dersAdi + " Ders Kaydı Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersListeGetir();
          }
        });
      }
    });
  }
  DerListeGetir() {
    this.apiServis.DersListe().subscribe(d => {
      this.dersler = d;
    });
  }
}
