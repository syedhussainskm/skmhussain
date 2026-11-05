// All portfolio content lives here. Edit this file to update the site.

export const site = {
  name: 'Khaja Moinuddin Hussain Syed',
  shortName: 'SKM Hussain',
  monogram: 'KH',
  role: 'Microsoft Dynamics 365 CE Technical Lead',
  description:
    'Khaja Moinuddin Hussain Syed — Dynamics 365 CE & Power Platform Technical Lead with 8+ years designing and delivering enterprise CRM solutions.',
  roles: [
    'Dynamics 365 CE Technical Lead',
    'Power Platform Expert',
    'Solution Architect',
    'PCF & Plugin Developer',
    'Azure Integration Engineer',
  ],
  tagline:
    'I design, build and ship enterprise CRM solutions on Dynamics 365 CE and the Power Platform — from solution architecture to production support.',
  location: 'Hyderabad, India',
  email: 'syedhussainskm@gmail.com',
  phone: '+91 80874 22210',
  phoneHref: 'tel:+918087422210',
  linkedin: 'https://www.linkedin.com/in/khaja-moinuddin-hussain-syed-07185994',
  website: 'https://hussainsyedcrm.vercel.app/',
  resume: '/files/Khaja-Moinuddin-Hussain-Syed-Resume.pdf',
  currentRole: 'Lead Developer @ 360 Degree Cloud',
  specialty: 'Dynamics 365 CE · Power Platform',
  // Full-screen video intro at the top of the page. Drop the file at
  // public/videos/intro.mp4; the section stays hidden until it exists.
  introVideo: '/videos/intro.mp4',
  introTopics: [
    'Dynamics 365 CE',
    'Power Platform',
    'Power Apps & Power Automate',
    'Dataverse',
    'PCF Controls',
    'C# & .NET Plugins',
    'Azure Integrations',
    'Solution Architecture',
  ],
}

export const about = {
  paragraphs: [
    'Dynamics 365 CE and Power Platform Technical Lead with 8+ years of experience designing, developing, and delivering enterprise CRM solutions across complex business environments.',
    'Strong hands-on expertise in Dynamics 365 CE, Power Apps, Power Automate, Dataverse, PCF Controls, C#, .NET, JavaScript and Azure services — spanning solution architecture, custom development, integrations, security and deployment.',
    'I lead end-to-end delivery from requirements and solution design through development, UAT, deployment and production support, while mentoring developers and coordinating cross-functional teams. I translate complex business requirements into scalable, secure and maintainable solutions that automate processes, improve data quality and enhance user experience.',
  ],
  stats: [
    { value: 8, suffix: '+', label: 'Years of experience', icon: 'calendar' },
    { value: 4, suffix: '', label: 'Global clients', icon: 'rocket' },
    { value: 500, suffix: '+', label: 'Users supported', icon: 'users' },
    { value: 30, suffix: '+', label: 'Plugins & extensions', icon: 'code' },
  ],
} as const

export type SkillGroup = {
  id: string
  title: string
  icon: string
  blurb: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'd365',
    title: 'Dynamics 365 CE',
    icon: 'layers',
    blurb: 'Configuring and extending the CRM core.',
    skills: [
      'Dynamics 365 CE',
      'Model-Driven Apps',
      'Sales',
      'Business Process Flows',
      'Business Rules',
      'Plugins',
      'Custom Actions',
      'Custom Workflows',
      'JavaScript',
      'HTML Web Resources',
      'Duplicate Detection',
      'Form Customization',
    ],
  },
  {
    id: 'power',
    title: 'Power Platform',
    icon: 'zap',
    blurb: 'Low-code apps and automation at enterprise scale.',
    skills: [
      'Power Apps (Canvas)',
      'Power Apps (Model-Driven)',
      'Power Automate',
      'Dataverse',
      'PCF Controls',
      'Access Teams',
      'Custom Validations',
      'Power Platform Solutions',
    ],
  },
  {
    id: 'dev',
    title: 'Development & Integration',
    icon: 'code',
    blurb: 'Pro-code extensions and cloud integrations.',
    skills: [
      'C#',
      '.NET',
      'JavaScript',
      'REST APIs',
      'Dynamics 365 Web API',
      'Azure Functions',
      'Azure Logic Apps',
      'Azure Service Bus',
    ],
  },
  {
    id: 'security',
    title: 'Security & Data',
    icon: 'shield',
    blurb: 'Data models and least-privilege access.',
    skills: [
      'Dataverse Data Modeling',
      'Security Roles',
      'Role-Based Access',
      'Access Teams',
      'Azure AD / Entra ID Security Groups',
      'Record Sharing',
      'Data Validation',
      'Data Governance',
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture & Delivery',
    icon: 'compass',
    blurb: 'Leading teams from requirements to go-live.',
    skills: [
      'Solution Architecture',
      'Technical Leadership',
      'Agile / Scrum',
      'Requirements Analysis',
      'Solution Design',
      'Code Reviews',
      'UAT',
      'Production Support',
      'Stakeholder Management',
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & ALM',
    icon: 'git',
    blurb: 'Repeatable, well-governed releases.',
    skills: [
      'Azure DevOps',
      'CI/CD Pipelines',
      'Release Management',
      'Deployment Coordination',
      'Risk & Dependency Management',
    ],
  },
  {
    id: 'reporting',
    title: 'Reporting & Analytics',
    icon: 'chart',
    blurb: 'Insight for decision makers.',
    skills: ['Power BI', 'Dynamics 365 Dashboards', 'Custom Views'],
  },
]

/** Headline technologies shown in the "toolbox" strip. */
export const toolbox = [
  'Dynamics 365',
  'Power Apps',
  'Power Automate',
  'Dataverse',
  'PCF',
  'C#',
  '.NET',
  'JavaScript',
  'Azure Functions',
  'Logic Apps',
  'Service Bus',
  'Azure DevOps',
  'Entra ID',
  'Power BI',
  'REST APIs',
  'Web API',
]

export type Job = {
  title: string
  company: string
  period: string
  location: string
  current?: boolean
  highlights: string[]
}

export const jobs: Job[] = [
  {
    title: 'Lead Developer',
    company: '360 Degree Cloud',
    period: 'Jul 2026 — Present',
    location: 'Remote',
    current: true,
    highlights: [
      'Lead end-to-end delivery of Dynamics 365 CE and Power Platform solutions across solution architecture, development, integration, deployment and production support.',
      'Design and develop Model-Driven Apps, Canvas Apps and Power Automate solutions to automate business processes and improve operational workflows.',
      'Drive technical delivery across multiple workstreams — sprint planning, backlog refinement, release activities, dependencies and delivery tracking through Azure DevOps.',
      'Design and implement Azure Functions, Azure Logic Apps and Azure Service Bus integrations enabling two-way communication for broker management processes.',
      'Translate complex business requirements into scalable CRM and Power Platform solutions, working closely with stakeholders, technical teams and delivery leadership.',
    ],
  },
  {
    title: 'Senior Software Engineer II — D365 CRM Technical Lead',
    company: 'Impelsys Pvt. Ltd',
    period: 'Oct 2022 — Jul 2026',
    location: 'Hyderabad, India (Remote)',
    highlights: [
      'Led the design and delivery of Dynamics 365 CE and Power Platform solutions across enterprise environments — architecture, customization, development, deployment and production support.',
      'Architected and developed Model-Driven Apps, Canvas Apps and Power Automate workflows to automate business processes and reduce manual operational activities.',
      'Designed Dataverse data models, security role hierarchies, Access Teams and role-based access controls supporting secure data access and governance for 500+ users.',
      'Delivered Power Platform enhancements across three business functions — sales pipeline management, event coordination and certification tracking.',
      'Mentored junior developers through technical design reviews, code reviews, walkthroughs and hands-on guidance, promoting Power Platform best practices.',
      'Coordinated Agile delivery, sprint planning, backlog refinement, release coordination and technical dependencies using Azure DevOps.',
    ],
  },
  {
    title: 'Microsoft Dynamics CRM Developer / Delivery Manager',
    company: 'Wipro Technologies',
    period: 'Feb 2022 — Sep 2022',
    location: 'Hyderabad, India (Remote)',
    highlights: [
      'Coordinated CRM delivery across multiple enterprise workstreams, managing sprint cycles, release schedules, dependencies and deployments.',
      'Implemented Custom Workflows, Business Process Flows, Business Rules and Access Teams to automate approvals, enforce business rules and support compliance.',
      'Configured Dynamics 365 security roles, Azure AD security groups and user permissions for least-privilege access across enterprise CRM environments.',
      'Built dashboards, custom views and CRM configurations from stakeholder requirements.',
      'Led Hypercare and post-deployment support, resolving application, data and UI issues within defined SLAs.',
      'Architected and delivered a Power Apps Canvas solution for global asset management, enabling self-service workflows for Microsoft employees across regions.',
    ],
  },
  {
    title: 'CRM Consultant — Microsoft Dynamics 365',
    company: 'Nayagara Technologies',
    period: 'Mar 2018 — Feb 2022',
    location: 'Hyderabad, India (Remote)',
    highlights: [
      'Engineered 30+ Dynamics 365 CE Plugins, Custom Actions, JavaScript enhancements and HTML Web Resources to extend standard CRM functionality.',
      'Customized core Dynamics 365 Sales entities — Leads, Accounts, Contacts and Opportunities — and implemented Business Process Flows aligned with client sales processes.',
      'Developed client-side JavaScript and .NET-based validations to enforce business rules and improve data integrity.',
      'Implemented Duplicate Detection Rules and cross-entity validation logic to improve CRM data quality.',
      'Led CRM implementations through the complete lifecycle — requirements, development, UAT, deployment and post-production support.',
    ],
  },
]

export type Project = {
  title: string
  client: string
  period: string
  category: string
  summary: string
  tech: string[]
  highlights: string[]
}

export const projects: Project[] = [
  {
    title: 'QORA CRS Project Management',
    client: 'American Heart Association',
    period: 'Mar 2025 — Apr 2026',
    category: 'Enterprise CRM',
    summary:
      "A Dynamics 365 CE solution for AHA's national operations, supporting 500+ users across project management, financial tracking, campaigns, compliance contracts and event relationships.",
    tech: [
      'Dynamics 365 CE',
      'Power Platform',
      'Model-Driven Apps',
      'Power Automate',
    ],
    highlights: [
      'Built and enhanced Model-Driven Apps and Power Automate workflows to centralize data management and automate approval and compliance processes.',
      'Implemented Business Rules, Access Teams and custom validations to enforce business logic, data integrity and role-based record access.',
      'Led sprint planning, implementation planning, functional task breakdown, UAT and production deployment.',
      'Automated business processes to streamline operational workflows and reduce manual activities.',
    ],
  },
  {
    title: 'QORA Enhancement & Sales/Invoicing Tracker',
    client: 'American Heart Association',
    period: 'Oct 2022 — Feb 2025',
    category: 'Process Automation',
    summary:
      'Consolidated three previously siloed business functions into a centralized QORA solution supporting sales, event and certification tracking.',
    tech: ['Dynamics 365 CE', 'Power Automate', 'Plugins', 'Model-Driven Apps'],
    highlights: [
      'Designed and delivered Power Automate workflows to automate invoice processing, reducing administrative effort for finance teams.',
      'Ran stakeholder workshops to translate complex nonprofit requirements into Dynamics 365 CE business logic and workflows.',
      'Developed Model-Driven Apps and Dynamics 365 customizations to streamline user workflows.',
      'Developed Plugins and CRM customizations to implement business rules and extend Dynamics 365 CE.',
    ],
  },
  {
    title: 'WFH Asset Shipment Management',
    client: 'Microsoft',
    period: 'Feb 2022 — Sep 2022',
    category: 'Canvas App',
    summary:
      'A Power Apps Canvas solution for global work-from-home asset management, enabling self-service workflows for Microsoft employees across multiple regions.',
    tech: ['Power Apps', 'Power Automate', 'Azure AD', 'Dynamics 365'],
    highlights: [
      'Implemented role-based access workflows, dynamic dashboards and Azure AD security group integration.',
      'Automated key asset-management processes using Power Automate.',
      'Managed post-launch Hypercare — incident triage, issue coordination and SLA tracking for a globally distributed user base.',
      'Owned sprint planning and release tracking through Azure DevOps with Microsoft stakeholders.',
    ],
  },
  {
    title: 'CRM Customization & Sales Module Enhancement',
    client: 'Zurich Cantonal Bank',
    period: 'Apr 2020 — Feb 2022',
    category: 'Banking CRM',
    summary:
      'Dynamics 365 CE customizations automating complex banking business rules and compliance requirements with C# Plugins, Custom Actions, JavaScript and PCF Controls.',
    tech: ['Dynamics 365 CE', 'C# Plugins', 'PCF Controls', 'JavaScript'],
    highlights: [
      'Designed custom PCF controls with tailored experiences for banking-specific data entry and processes.',
      'Built reusable PCF components with client-side validation and dynamic UI behavior to improve data-entry accuracy.',
      'Configured Security Roles, Access Teams and record-sharing policies for data governance and regulatory requirements.',
      'Replaced manual processes with automated validation and workflow execution.',
    ],
  },
  {
    title: 'CRM Customization & Sales Module Enhancement',
    client: 'Commerzbank',
    period: 'Mar 2018 — Apr 2020',
    category: 'Banking CRM',
    summary:
      'Extended Dynamics 365 CE with reusable PCF controls, C#/.NET Plugins and custom workflow automation for sales users.',
    tech: ['Dynamics 365 CE', 'PCF', 'Plugins', 'Workflows', 'JavaScript'],
    highlights: [
      'Built PCF components supporting field-level data entry, validation and user interactions for sales users.',
      'Engineered C#/.NET Plugins and custom workflows to enforce business rules and maintain data consistency across entities.',
      'Implemented JavaScript form customizations and client-side validation to prevent incorrect data entry.',
      'Implemented Duplicate Detection Rules and cross-entity validation logic to improve CRM data quality.',
    ],
  },
]

export const education = [
  {
    degree: 'Vidwan (BA Arts — Hindi)',
    school: 'Hindi Prachar Sabha',
    location: 'Hyderabad',
    period: '1995 — 1997',
  },
]
export const education1 = [
  {
    degree: 'Deploma in Computer Science Engineering',
    school: 'Calorx Teachers University',
    location: 'Gujarat',
    period: '2009 — 2012',
  },
]

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  {id: 'education1', label: 'Education1' },
  { id: 'contact', label: 'Contact' },
]
