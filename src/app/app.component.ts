import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressHttp } from 'ngx-progressbar/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgProgressHttp, NgProgressbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {


  constructor() {   

  }
}
