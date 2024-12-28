import { Department } from './department.models';
import { Job } from './job.model';

export class UserInfo {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public job: Job,
    public department: Department,
    public remainingLeaveDays: number,
    public annualLeaveDays: number
  ) {}
}
