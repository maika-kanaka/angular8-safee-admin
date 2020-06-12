import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  public message_body: string;
  @Input('type') type: string = "save";

  constructor() { }

  ngOnInit() {
    if( this.type == "save" ){
      this.message_body = "Berhasil simpan data";
    }

    if( this.type == "update" ){
      this.message_body = "Berhasil perbarui data";
    }
  }

}
