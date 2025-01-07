import { Company } from "./company.model";
export interface Internship {
  id: number;
  title: string;
  companyName: string;
  companyLogoUrl: string;
  companyWebsite: string;
  description: string;
  experience: string;
  location: string;
  startDate: Date;
  endDate: Date;
  applicationDeadline: Date;
  dateAdded: Date;
  requirements: string[];
}

export interface FilterInternship {
  title?: string;
  companyName?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  applicationDeadline?: Date;
  requirements?: string[];
  sortBy?: string;
  ascending?: boolean;
}

  export interface UpdateInternship {
    internshipId: string;
    title?: string; 
    datePosted?: Date;
    company?: Company;
    description?: string;
    experience?: string;
    location?: string;
    startDate?: Date;
    endDate?: Date;
    applicationDeadline?: Date;
    requirements?: string[];
  }
  
  