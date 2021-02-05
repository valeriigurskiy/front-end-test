import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ajax } from 'rxjs/ajax';
import {map, catchError, takeUntil} from 'rxjs/operators';
import {fromEvent, interval, Observable, of, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string = 'https://jsonplaceholder.typicode.com/users/1';
  requestToApi = interval(10000);
  interval;
  constructor(private httpClient: HttpClient) {
  }

  request() {
    let timeLeft: number = 0;
    const request = this.httpClient.get(this.url);
    this.requestToApi.subscribe(() => {
      this.interval = setInterval(() => {
        if(!document.hidden) {
          timeLeft = 0;
        } else {
          timeLeft++;
        }
      },1000)
      if (timeLeft < 10 && window.navigator.onLine){
        request.subscribe(value => console.log(value));
      } else if (timeLeft > 10){
        console.log('Пользователь неактивен 10 секунд');
      } else if (!window.navigator.onLine){
        console.log('Отсутствует подключение к интернету. Отправка запроса невозможна');
      }
      document.onvisibilitychange = function(){
        if (!document.hidden && timeLeft > 10){
          timeLeft = 0;
          request.subscribe(value => console.log(value));
        }
      }
    })
  }
}
