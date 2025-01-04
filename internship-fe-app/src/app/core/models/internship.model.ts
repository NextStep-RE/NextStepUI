import { Company } from "./company.model";

export interface Internship {
    internshipId: string;
    title: string;
    datePosted: Date;
    company: Company;
    description: string;
    experience?: string;
    location: string;
    startDate: Date;
    endDate: Date;
    applicationDeadline: Date;
    requirements: string[]; 
  }