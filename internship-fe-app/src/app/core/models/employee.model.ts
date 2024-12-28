export class Employee {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public birthDate: Date,
    public jobId: number,
    public departmentId: number,
    public employmentDate: Date
  ) {}
}
