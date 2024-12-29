import { MOCK_COMPANIES } from "./company.mock";
import { Internship } from "../internship.model";

export const MOCK_INTERNSHIPS: Internship[] = [
    {
        internshipId: '1',
        title: 'Frontend Developer Internship',
        company: MOCK_COMPANIES[0],
        description: 'Learn frontend development with modern tools and frameworks.',
        experience: ">1 year",
        location: 'New York, USA',
        startDate: new Date('2025-02-01'),
        endDate: new Date('2025-06-01'),
        applicationDeadline: new Date('2025-01-15'),
        requirements: ['HTML', 'CSS', 'JavaScript']
    },
    {
        internshipId: '2',
        title: 'Data Analyst Internship',
        company: MOCK_COMPANIES[1],
        description: 'Work with healthcare data to provide meaningful insights.',
        experience: "no experience",
        location: 'San Francisco, USA',
        startDate: new Date('2025-03-01'),
        endDate: new Date('2025-07-01'),
        applicationDeadline: new Date('2025-01-03'),
        requirements: ['Python', 'SQL', 'Data Visualization']
    },
    {
        internshipId: '3',
        title: 'Education Technology Intern',
        company: MOCK_COMPANIES[2],
        description: 'Assist in developing cutting-edge educational technology solutions.',
        experience: "no experience",
        location: 'Remote',
        startDate: new Date('2025-04-01'),
        endDate: new Date('2025-08-01'),
        applicationDeadline: new Date('2025-03-15'),
        requirements: ['JavaScript', 'React', 'UI/UX Design']
    },
    {
        internshipId: '4',
        title: 'Renewable Energy Research Intern',
        company: MOCK_COMPANIES[3],
        description: 'Contribute to research and development in renewable energy solutions.',
        experience: ">2 years",
        location: 'Austin, USA',
        startDate: new Date('2025-05-01'),
        endDate: new Date('2025-09-01'),
        applicationDeadline: new Date('2025-04-10'),
        requirements: ['Environmental Science', 'Data Analysis', 'Python']
    },
    {
        internshipId: '5',
        title: 'Financial Analyst Intern',
        company: MOCK_COMPANIES[4],
        description: 'Support financial analysis and modeling projects for various clients.',
        experience: "no experience",
        location: 'Chicago, USA',
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-10-01'),
        applicationDeadline: new Date('2025-05-15'),
        requirements: ['Excel', 'Financial Modeling', 'Data Analysis']
    },
    {
        internshipId: '6',
        title: 'UI/UX Design Intern',
        company: MOCK_COMPANIES[2],
        description: 'Work on enhancing user experiences for educational platforms.',
        experience: "no experience",
        location: 'Berlin, Germany',
        startDate: new Date('2025-03-15'),
        endDate: new Date('2025-07-15'),
        applicationDeadline: new Date('2025-02-28'),
        requirements: ['Figma', 'Adobe XD', 'User Research']
    },
    {
        internshipId: '7',
        title: 'Software Development Intern',
        company: MOCK_COMPANIES[0],
        description: 'Contribute to developing software applications for clients worldwide.',
        experience: ">2 years",
        location: 'Remote',
        startDate: new Date('2025-07-01'),
        endDate: new Date('2025-12-01'),
        applicationDeadline: new Date('2025-06-15'),
        requirements: ['Java', 'Spring Boot', 'Git']
    },
    {
        internshipId: '8',
        title: 'Marketing Analyst Internship',
        company: MOCK_COMPANIES[4],
        description: 'Analyze market trends and provide insights for marketing campaigns.',
        experience: "no experience",
        location: 'London, UK',
        startDate: new Date('2025-05-01'),
        endDate: new Date('2025-09-01'),
        applicationDeadline: new Date('2025-04-20'),
        requirements: ['Market Research', 'Excel', 'Data Visualization']
    }
];
