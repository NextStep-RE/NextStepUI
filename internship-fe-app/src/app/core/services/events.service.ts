import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { PersonalEvent } from "../models/personalEvent.model";

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    constructor(private http: HttpClient) {}

    getPersonalEventsByEmployeeId(userId: number): Observable<PersonalEvent[]> {
        return this.http.get<PersonalEvent[]>(`${environment.apiUrl}/applications/events`, {
            params: { userId: userId.toString() },
        });
    }

    addEvent(event: Partial<Event>): Observable<Event> {
        return this.http.post<Event>(environment.apiUrl + '/events', event);
    }
}