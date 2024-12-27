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
    role: string;
    company: string;
    startDate: Date;
    endDate?: Date; 
  }
  
  export interface Education {
    degree: string;
    major: string;
    university: string;
    graduationDate: Date;
  }