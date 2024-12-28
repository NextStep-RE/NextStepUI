import { Job } from './job.model';

export class UserProfile {
  constructor(
    public id: number,
    public name: string,
    public firstName: string,
    public lastName: string,
    public job: Job
  ) {}
}
