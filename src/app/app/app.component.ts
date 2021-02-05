import { Component } from '@angular/core';
import {fromEvent, interval} from "rxjs";
import {map} from "rxjs/operators";
import {RequestService} from "../services/request.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test task';
  internetStatus: string;

  constructor(private requestService: RequestService) {
    this.requestService.request();
  }

  checkStatus(){
    window.navigator.onLine ? this.internetStatus = 'Вы подключены к интернету' : this.internetStatus = 'У вас отсутствует подключение к интернету';
  }

}
