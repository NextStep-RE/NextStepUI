import { Event } from '../models/event.model';

export class PersonalEvent extends Event {
  public employeeId: number;
  constructor(
    id: number,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    location: string,
    employeeId: number
  ) {
    super(id, title, description, startDate, endDate, location);
    this.employeeId = employeeId;
  }
}
