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
  constructor(private httpClient: HttpClient) {
  }

  request() {
    const request = this.httpClient.get(this.url);
    this.requestToApi.subscribe(() => {
      if (window.navigator.onLine && !document.hidden) {
        request.subscribe(value => console.log(value));
        } else if (window.navigator.onLine && document.hidden) {
          console.log('Пользователь неактивен 10 секунд');
      } else if (!window.navigator.onLine) {
        console.log('Отсутствует подключение к интернету. Отправка запроса невозможна');
      }
    })
    document.onvisibilitychange = function () {
      if (!document.hidden){
        request.subscribe(value => console.log(value));
      }
    }
  }
}
