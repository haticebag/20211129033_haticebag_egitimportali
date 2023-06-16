import { FotoDialogComponent } from './../dialogs/foto-dialog/foto-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { OgrenciDialogComponent } from '../dialogs/ogrenci-dialog/ogrenci-dialog.component';

@Component({
  selector: 'app-ogrenci',
  templateUrl: './ogrenci.component.html',
  styleUrls: ['./ogrenci.component.css']
})
export class OgrenciComponent implements OnInit {
  dataSource: any;
  kayitlar: Ogrenci[];
  displayedColumns = ['ogrFoto', 'ogrNo', 'ogrAdsoyad', 'ogrDogTarih', 'ogrDersSayisi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<OgrenciDialogComponent>;
  fotoDialogRef: MatDialogRef<FotoDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.KayitGetir();
  }

  KayitGetir() {
    this.apiServis.OgrenciListe().subscribe(d => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  OgrenciEkle() {
    var yeniKayit = new Ogrenci();
    this.dialogRef = this.matDialog.open(OgrenciDialogComponent, {
      width: "400px",
      data: {
        islem: 'ekle',
        kayit: yeniKayit
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.ogrFoto = "profil.png";
        this.apiServis.OgrenciEkle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });
  }
  OgrenciDuzenle(ogr: Ogrenci) {
    this.dialogRef = this.matDialog.open(OgrenciDialogComponent, {
      width: "300px",
      data: {
        islem: 'duzenle',
        kayit: ogr
      }
    });

    this.dialogRef.afterClosed().subscribe((d: Ogrenci) => {
      if (d) {
        ogr.ogrNo = d.ogrNo;
        ogr.ogrAdsoyad = d.ogrAdsoyad;
        ogr.ogrDogTarih = d.ogrDogTarih;


        this.apiServis.OgrenciDuzenle(ogr).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });
  }
  OgrenciSil(ogr: Ogrenci) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = ogr.ogrAdsoyad + " isimli Öğrenci Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.OgrenciSil(ogr.ogrId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });

  }

  FotoGuncelle(ogr: Ogrenci) {
    var yeniKayit = new Ogrenci();
    this.fotoDialogRef = this.matDialog.open(FotoDialogComponent, {
      width: "400px",
      data: ogr
    });

    this.fotoDialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.ogrId = ogr.ogrId;
        this.apiServis.OgrFotoGuncelle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });
  }

  Filterele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
