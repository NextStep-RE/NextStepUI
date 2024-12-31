import { MOCK_COMPANIES } from './company.mock';
import { Internship } from '../internship.model';

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    internshipId: '1',
    title: 'Frontend Developer Internship',
    company: MOCK_COMPANIES[0],
    description: `
As a Frontend Developer Intern, you will be working with cutting-edge frontend technologies like React.js, TypeScript, and CSS. You will help in building user interfaces for a dynamic web application aimed at streamlining business processes. The project is a real-time data visualization tool that helps users monitor and manage complex datasets.

Responsibilities:
- Collaborate with senior developers to implement responsive, user-friendly interfaces.
- Work on both new features and maintain the existing frontend codebase.
- Write clean, modular, and maintainable code.
- Participate in code reviews, ensuring best practices are followed.
- Engage with cross-functional teams to understand user requirements and enhance product features.

Skills Required:
- Knowledge of JavaScript, React, and CSS.
- Familiarity with Git version control.
- Understanding of RESTful API integration.
- Ability to work in an Agile environment.`,
    experience: '>1 year',
    location: 'New York, USA',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-06-01'),
    applicationDeadline: new Date('2025-01-15'),
    requirements: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    internshipId: '2',
    title: 'Data Analyst Internship',
    company: MOCK_COMPANIES[1],
    description: `
As a Data Analyst Intern, you will be working closely with the healthcare team to derive actionable insights from large datasets. The project involves analyzing data from various health-related databases and using statistical methods to generate reports that help drive decision-making.

Responsibilities:
- Analyze large datasets to uncover trends and patterns.
- Work with Python, SQL, and data visualization tools like Tableau to interpret complex data.
- Develop reports and dashboards for stakeholders.
- Assist with data cleaning and preparation for analysis.

Skills Required:
- Strong analytical skills and experience with SQL.
- Familiarity with Python and data analysis libraries (e.g., Pandas, NumPy).
- Experience with data visualization tools such as Tableau or Power BI.`,
    experience: 'no experience',
    location: 'San Francisco, USA',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-07-01'),
    applicationDeadline: new Date('2025-01-03'),
    requirements: ['Python', 'SQL', 'Data Visualization'],
  },
  {
    internshipId: '3',
    title: 'Education Technology Intern',
    company: MOCK_COMPANIES[2],
    description: `
As an Education Technology Intern, you will assist in the development of online learning platforms. The internship focuses on creating interactive user interfaces and improving the usability of educational websites used by schools and universities worldwide.

Responsibilities:
- Assist in designing and developing UI components for educational tools.
- Collaborate with UX designers to enhance user experiences.
- Test new UI features and make improvements based on feedback.
- Assist in bug fixing and feature enhancements.

Skills Required:
- Strong knowledge of JavaScript, React, and UI/UX design principles.
- Experience with prototyping tools like Figma or Adobe XD.
- Understanding of responsive design principles and accessibility standards.`,
    experience: 'no experience',
    location: 'Remote',
    startDate: new Date('2025-04-01'),
    endDate: new Date('2025-08-01'),
    applicationDeadline: new Date('2025-03-15'),
    requirements: ['JavaScript', 'React', 'UI/UX Design'],
  },
  {
    internshipId: '4',
    title: 'Renewable Energy Research Intern',
    company: MOCK_COMPANIES[3],
    description: `
The Renewable Energy Research Internship focuses on supporting research in solar energy and energy storage technologies. The intern will work with a team of scientists and engineers to analyze energy consumption data and explore ways to optimize renewable energy solutions for residential and commercial buildings.

Responsibilities:
- Analyze energy data to identify trends and performance improvements.
- Assist with the development of new models and simulations for energy systems.
- Participate in research to support the development of new renewable energy technologies.
- Contribute to technical reports and publications.

Skills Required:
- Background in Environmental Science or related field.
- Strong analytical skills and proficiency with data analysis tools (e.g., Python).
- Familiarity with renewable energy technologies is a plus.`,
    experience: '>2 years',
    location: 'Austin, USA',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-09-01'),
    applicationDeadline: new Date('2025-04-10'),
    requirements: ['Environmental Science', 'Data Analysis', 'Python'],
  },
  {
    internshipId: '5',
    title: 'Financial Analyst Intern',
    company: MOCK_COMPANIES[4],
    description: `
The Financial Analyst Internship offers the opportunity to gain hands-on experience in financial modeling, analysis, and reporting. Interns will work on diverse projects, including budgeting, forecasting, and financial statement analysis for clients in various industries.

Responsibilities:
- Assist in building financial models and forecasting budgets.
- Analyze financial data to provide insights and recommendations.
- Prepare and present financial reports to stakeholders.
- Work closely with senior analysts on various financial projects.

Skills Required:
- Strong knowledge of Excel and financial modeling techniques.
- Understanding of financial statements and accounting principles.
- Attention to detail and strong problem-solving skills.`,
    experience: 'no experience',
    location: 'Chicago, USA',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-10-01'),
    applicationDeadline: new Date('2025-05-15'),
    requirements: ['Excel', 'Financial Modeling', 'Data Analysis'],
  },
  {
    internshipId: '6',
    title: 'Cybersecurity Intern',
    company: MOCK_COMPANIES[1],
    description: `
The Cybersecurity Internship provides an opportunity to work with security experts in identifying and mitigating vulnerabilities in web applications and networks. You will assist in performing security assessments and developing strategies to enhance cybersecurity frameworks.

Responsibilities:
- Conduct vulnerability assessments and penetration testing on company systems.
- Collaborate with the team to develop and implement security protocols.
- Monitor security events and respond to incidents.
- Research the latest cybersecurity threats and recommend preventive measures.

Skills Required:
- Familiarity with cybersecurity tools like Nessus, Wireshark, or Burp Suite.
- Basic knowledge of network security principles.
- Strong analytical and problem-solving skills.`,
    experience: 'no experience',
    location: 'Toronto, Canada',
    startDate: new Date('2025-02-15'),
    endDate: new Date('2025-06-15'),
    applicationDeadline: new Date('2025-01-30'),
    requirements: [
      'Network Security',
      'Penetration Testing',
      'Problem Solving',
    ],
  },
  {
    internshipId: '7',
    title: 'Product Management Intern',
    company: MOCK_COMPANIES[2],
    description: `
As a Product Management Intern, you will work closely with product managers and cross-functional teams to deliver features that meet user needs and business goals. This role involves engaging in the product lifecycle from ideation to release.

Responsibilities:
- Assist in defining product requirements and user stories.
- Collaborate with engineering and design teams to ensure successful delivery.
- Analyze market trends and competitor offerings.
- Contribute to product roadmaps and strategy meetings.

Skills Required:
- Strong communication and collaboration skills.
- Basic understanding of Agile methodologies.
- Interest in product design and user experience.`,
    experience: 'no experience',
    location: 'Remote',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-07-01'),
    applicationDeadline: new Date('2025-02-15'),
    requirements: [
      'Communication Skills',
      'Market Analysis',
      'Agile Methodologies',
    ],
  },
  {
    internshipId: '8',
    title: 'Machine Learning Intern',
    company: MOCK_COMPANIES[3],
    description: `
This internship offers hands-on experience in building machine learning models and applications. You will work with a team of data scientists to develop algorithms that solve real-world problems in industries like finance and healthcare.

Responsibilities:
- Assist in data preprocessing and feature engineering.
- Develop machine learning models using Python or R.
- Test and validate models for accuracy and reliability.
- Document processes and findings for internal use.

Skills Required:
- Proficiency in Python or R for machine learning.
- Familiarity with libraries like TensorFlow, Scikit-learn, or PyTorch.
- Strong mathematical foundation in statistics and linear algebra.`,
    experience: '1-2 years',
    location: 'Boston, USA',
    startDate: new Date('2025-04-01'),
    endDate: new Date('2025-08-01'),
    applicationDeadline: new Date('2025-03-15'),
    requirements: ['Python', 'Machine Learning', 'Data Analysis'],
  },
  {
    internshipId: '9',
    title: 'Human Resources Intern',
    company: MOCK_COMPANIES[4],
    description: `
The Human Resources Internship offers exposure to various aspects of HR management, including recruitment, onboarding, and employee engagement. You will support the HR team in fostering a positive workplace culture.

Responsibilities:
- Assist in posting job openings and screening resumes.
- Participate in organizing training sessions and workshops.
- Support onboarding processes for new hires.
- Help manage employee engagement programs and surveys.

Skills Required:
- Strong interpersonal and organizational skills.
- Basic understanding of HR principles and practices.
- Familiarity with HR software is a plus.`,
    experience: 'no experience',
    location: 'Berlin, Germany',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-09-01'),
    applicationDeadline: new Date('2025-04-20'),
    requirements: [
      'Interpersonal Skills',
      'Organizational Skills',
      'HR Principles',
    ],
  },
];
