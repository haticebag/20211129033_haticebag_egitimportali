import { ApiService } from './../../../services/api.service';
import { Ogrenci } from './../../../models/Ogrenci';
import { OgrFoto } from './../../../models/OgrFoto';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-foto-dialog',
  templateUrl: './foto-dialog.component.html',
  styleUrls: ['./foto-dialog.component.css']
})
export class FotoDialogComponent implements OnInit {
  secilenFoto: any;
  ogrFoto: OgrFoto = new OgrFoto();
  secOgrenci: Ogrenci;
  constructor(
    public dialogRef: MatDialogRef<FotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) {
    this.secOgrenci = this.data;
  }

  ngOnInit() {
  }
  FotoSec(e: any) {
    var fotolar = e.target.files;
    var foto = fotolar[0];
    var fr = new FileReader();
    fr.onload = () => {
      this.secilenFoto = fr.result,
        this.ogrFoto.fotoData = fr.result.toString(),
        this.ogrFoto.fotoUzanti = foto.type
    }
    fr.readAsDataURL(foto);
  }
}
