import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ders } from 'src/app/models/Ders';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { DersDialogComponent } from '../dialogs/ders-dialog/ders-dialog.component';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css']
})
export class DersComponent implements OnInit {
  dersler: Ders[];
  dataSource: any;
  displayedColumns = ['dersKodu', 'dersAdi', 'dersKredi', 'DersOgrSayisi', 'islemler'];
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<DersDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.KayitGetir();
  }
  KayitGetir() {
    this.apiServis.DersListe().subscribe(d => {
      this.dersler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  DersEkle() {
    var yeniKayit: Ders = new Ders();
    this.dialogRef = this.matDialog.open(DersDialogComponent, {
      width: "400px",
      data: {
        islem: 'ekle',
        kayit: yeniKayit
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.DersEkle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });
  }
  DersDuzenle(ders: Ders) {
    this.dialogRef = this.matDialog.open(DersDialogComponent, {
      width: "400px",
      data: {
        islem: 'duzenle',
        kayit: ders
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        ders.dersKodu = d.dersKodu;
        ders.dersAdi = d.dersAdi;
        ders.dersKredi = d.dersKredi;
        this.apiServis.DersDuzenle(ders).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });

  }
  DersSil(ders: Ders) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = ders.dersAdi + " Dersi Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.DersSil(ders.dersId).subscribe(s => {
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
