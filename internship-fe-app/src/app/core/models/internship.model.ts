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

  export interface LoadInternships {
    pageNumber: number;
    pageSize: number;
    searchInput?: string;
    sortCriteria?: string;
    sortDirection?: 'asc' | 'desc';
    filter?: string;
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
  
  