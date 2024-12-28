export class Event {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public startDate: Date,
    public endDate: Date,
    public location: string,
  ) {}
}
