import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Ogrenci } from 'src/app/models/Ogrenci';

@Component({
  selector: 'app-ogrsec-dialog',
  templateUrl: './ogrsec-dialog.component.html',
  styleUrls: ['./ogrsec-dialog.component.css']
})
export class OgrsecDialogComponent implements OnInit {
  dataSource: any;
  kayitlar: Ogrenci[];
  displayedColumns = ['ogrNo', 'ogrAdsoyad', 'ogrDogTarih', 'ogrDersSayisi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public dialogRef: MatDialogRef<OgrsecDialogComponent>
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
  Filterele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Ekle(ogr: Ogrenci) {
    this.dialogRef.close(ogr);
  }
}
