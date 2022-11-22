import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DayPilot} from "daypilot-pro-angular";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  resources: any[] = [
    {
      "name": "Bouhmadi Shaïma",
      "id": 1
    },
    {
      "name": "Fouret Jason",
      "id": 2
    }
  ];

  events: any[] = [
    {
      "id": 1,
      "resource": 1,
      "start": "2022-11-10T00:00:00",
      "end": "2022-11-10T00:00:00",
      "text": "A"
    },
    {
      "start": "2022-11-20T00:00:00",
      "end": "2022-11-20T00:00:00",
      "id": 2,
      "resource": 2,
      "text": "B"
    },
    {
      "start": "2022-11-12T00:00:00",
      "end": "2022-11-12T00:00:00",
      "id": 3,
      "resource": 2,
      "text": "V"
    },
    {
      "start": "2022-11-13T00:00:00",
      "end": "2022-11-16T00:00:00",
      "id": 4,
      "resource": 1,
      "text": "D"
    }
  ];

  constructor(private http: HttpClient) {
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });
    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

  getResources(): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.resources);
      }, 200);
    });
    // return this.http.get("/api/resources");
  }

}
