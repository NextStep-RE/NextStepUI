import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Event } from '../models/event.model';
import { PersonalEvent } from "../models/personalEvent.model";

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    constructor(private http: HttpClient) {}

    getAllEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(environment.apiUrl + '/event');
    }

    getPersonalEventsByEmployeeId(employeeId: number): Observable<PersonalEvent[]> {
        return this.http.get<PersonalEvent[]>(environment.apiUrl + `/personal-event/get-by-employee/${employeeId}`);
    }

    addEvent(event: Partial<Event>): Observable<Event> {
        return this.http.post<Event>(environment.apiUrl + '/event', event);
    }
}