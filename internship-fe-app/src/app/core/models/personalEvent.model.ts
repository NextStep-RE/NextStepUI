export class PersonalEvent {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public startDate: Date,
    public location: string,
    public userId: number
  ) {}
}