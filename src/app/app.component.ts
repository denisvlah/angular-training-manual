import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressHttp } from 'ngx-progressbar/http';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgProgressHttp, NgProgressbar, MatChipsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {


  constructor() {   

  }
}
