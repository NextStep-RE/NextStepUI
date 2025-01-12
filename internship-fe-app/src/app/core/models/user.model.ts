export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string; 
    university?: string;
    bio?: string; 
    skills: string[]; 
    experience: Experience[]; 
    education: Education[]; 
    resume?: File; 
  }
  
  export interface Experience {
    id: number;
    role: string;
    companyName: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    userId: number;
  }
  
  export interface Education {
    id: number;
    degree: string;
    major: string;
    university: string;
    startDate: Date;
    endDate?: Date;
    userId: number;
  }
  
  