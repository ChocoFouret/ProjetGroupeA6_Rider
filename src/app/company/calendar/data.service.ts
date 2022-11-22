import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DayPilot} from "daypilot-pro-angular";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  resources: any[] = [
    {
      "name": "Resource 1",
      "id": "R1"
    },
    {
      "name": "Resource 2",
      "id": "R2"
    }
  ];

  /*

  events: any[] = [
    {
      id: 1,
      start: "2022-11-20T09:15:00",
      end: "2022-11-20T11:00:00",
      text: 'Task 1',
      employee: "P1",
      barColor: "#6aa84f"
    },
    {
      id: 2,
      start: "2022-11-22T12:00:00",
      end: "2022-11-22T15:00:00",
      text: 'Task 2',
      employee: "P1",
      barColor: "#6aa84f"
    },
    {
      id: 3,
      start: "2022-11-25T10:00:00",
      end: "2022-11-25T12:00:00",
      text: 'Task 3',
      employee: "P1",
      barColor: "#cc0000"
    },
  ];

   */
  events: any[] = [
    {
      "id": 1,
      "resource": "R2",
      "start": "2022-11-06T00:00:00",
      "end": "2022-11-10T00:00:00",
      "text": "Event 1"
    },
    {
      "start": "2022-11-17T00:00:00",
      "end": "2022-11-20T00:00:00",
      "id": "71d057af-20d8-60fa-291b-dceaad529c75",
      "resource": "R2",
      "text": "Event 4"
    },
    {
      "start": "2022-11-12T00:00:00",
      "end": "2022-11-15T00:00:00",
      "id": "6986ed90-807d-65df-203d-16be9ac7f5c0",
      "resource": "R1",
      "text": "Event 2"
    },
    {
      "start": "2022-11-09T00:00:00",
      "end": "2022-11-11T00:00:00",
      "id": "f93bfc6c-126b-c8b7-b33b-5f5f60b5766e",
      "resource": "R2",
      "text": "Event 3"
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
