import { Company } from "./company.model";

export interface Internship {
    internshipId: string;
    title: string;
    company: Company;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    applicationDeadline: Date;
    requirements: string[]; 
  }