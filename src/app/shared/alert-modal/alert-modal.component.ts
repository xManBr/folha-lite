import { Component, Input, OnInit } from '@angular/core';

//https://materializecss.com/modals.html#!
//https://ng2-materialize.herokuapp.com/modal

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  @Input() type = 'success';
  @Input() message: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
