import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DayPilot} from 'daypilot-pro-angular';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  // employee = id de l'employé
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

  /* Test pour les affichages d'employées */
  employees: any[] = [
    {name: "Person 1", id: "P1"},
    {name: "Person 2", id: "P2"},
    {name: "Person 3", id: "P3"},
    {name: "Person 4", id: "P4"},
    {name: "Person 5", id: "P5"},
  ];
  employee: any;

  constructor(private http: HttpClient) {
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date, employeeId: string): Observable<any[]> {
    const selected = this.events.filter(e => e.employee === employeeId && !(new DayPilot.Date(e.end) < from || new DayPilot.Date(e.start) > to));
    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(selected);
      }, 200);
    });
    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

  getEmployees(): Observable<any[]> {
    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.employees);
      }, 200);
    });
    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

}
