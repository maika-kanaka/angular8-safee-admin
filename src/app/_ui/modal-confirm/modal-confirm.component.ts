import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  public modal_id: string = "#modal-confirmation";
  public title: string = "Konfirmasi Hapus";
  public message: string = "Apa anda yakin ingin menghapus data ini?";
  public show_reason: boolean = true;
  public reason: string;

  public url: string;
  public id_trx: string;
  public invalid_feedback: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges)
  {
    console.log( change );
  }

  showModal(param: object = {})
  {
    if( typeof param['title'] != 'undefined' ){
      this.title = param['title'];
    }

    if( typeof param['message'] != 'undefined' ){
      this.message = param['message'];
    }

    if( typeof param['show_reason'] != 'undefined' ){
      this.show_reason = param['show_reason'];
    }

    if( typeof param['id_trx'] != 'undefined' ){
      this.id_trx = param['id_trx'];
    }

    if( typeof param['url'] != 'undefined' ){
      this.url = param['url'];
    }

    $(this.modal_id).modal('show');
  }

  confirmAction(f: NgForm)
  {
    this.http.post(this.url, f.value).subscribe(res => {
      this.finishConfirmation();
    });
  }

  finishConfirmation()
  {
    $(this.modal_id).modal("hide");
  }

}
