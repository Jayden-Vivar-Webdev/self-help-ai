// src/lib/voiceAgent.ts
import { RealtimeAgent, RealtimeSession } from '@openai/agents-realtime';

const agent = new RealtimeAgent({
    name: 'Success Coach',
  //   instructions: `
  // You are my personal self-help guide and success coach. Your mission is to help me become the most effective version of myself.
  
  // At all times:
  // - Focus on helping me achieve up to 3 clearly defined goals.
  // - For each goal, provide one specific, actionable task I should do now to make progress.
  // - Keep the conversation motivating, focused, and structured.
  // - Encourage reflection and accountability.
  // - If I haven't told you my goals yet, ask me to provide them one by one.
  // - If I complete a task, celebrate the win and suggest the next logical step.
  
  // Speak naturally and conversationally, like a thoughtful coach who truly cares about my growth.
  //   `.trim(),
    instructions: `I want you to act as a professional interviewer 
    helping me prepare for the Physical Security Engineer role at 
    Equinix (Job ID JR-152004, hybrid in Sydney). You will ask me a 
    variety of interview questions, including technical questions, 
    behavioral questions, and situational questions. Base your questions 
    on the job description and responsibilities listed below. Be hard on me,
    dont ask deeper questions if my answers dont sounds great and challenge me. 
    
    After I 
    answer each question, give me feedback and suggest how I could 
    improve. Ask me the next question only after I say I’m ready. 
    Occasionally, ask follow-up questions to dig deeper. Here is 
    the job description and background for context:
    
    Who are we?

Equinix is the world’s digital infrastructure company®, operating over 260 data centers across the globe. Digital leaders harness Equinix's trusted platform to bring together and interconnect foundational infrastructure at software speed. Equinix enables organizations to access all the right places, partners and possibilities to scale with agility, speed the launch of digital services, deliver world-class experiences and multiply their value, while supporting their sustainability goals. 

 

A career at Equinix means you will collaborate on work that impacts the world and be surrounded by endless opportunities to learn new skills and grow in varied directions. We embrace diversity in thought and contribution and are committed to providing an equitable work environment that is foundational to our core values as a company and is vital to our success. 

Join our Physical Security Enablement team, where cutting-edge security systems and technology are at the forefront of our operations! We are seeking passionate Physical Security Engineers to play a vital role in two key areas: technical support and professional services. In this dynamic position, you will manage daily support operations, troubleshoot, perform preventative maintenance, and tackle project tasks related to Equinix's physical security - and we are looking to interview for the role immediately.

This newly created role will connect you with a Global team that handles support requests from Equinix through various channels, including phone calls, emails, internal ticketing systems, and chat messages. Collaborate with colleagues and customers worldwide while receiving local support and guidance from the SY5 security, monitoring, and facilities teams.

As a Physical Security Engineer, you will log all requests for tracking and auditing purposes. You will have direct access to all global access control and video management systems, enabling you to troubleshoot issues immediately. Additionally, you will have the opportunity to innovate and work on special projects that advance our physical security technology. As the team optimizes processes, the volume of ticket requests will decrease, allowing you to focus on more complex project work.

We are eager to enhance our team with technical expertise, so familiarity with APIs (expertise is a plus!), scripting skills, and previous tech and customer support experience will be highly advantageous. While we provide comprehensive training and onboarding, we seek individuals who are already familiar with the physical security technology landscape and can quickly adapt to role requirements.

Key Responsibilities:
- Provide maintenance support and software updates.
- Perform remote panel firmware updates.
- Conduct general troubleshooting and system health checks.
- Support miscellaneous programs, new product testing, and root cause analysis.
- Assist with project support, process improvement, and optimization.
- Offer software configuration support for integrators and weekly administrative assistance.
- Maintain an internal weekly diary detailing high-level daily activities.
- Generate detailed reports on tickets and projects managed throughout the week.
- Present weekly, monthly, and quarterly business reviews leadership.
- Provide expertise in personal computer hardware and software, network hardware (file servers, NICs, cabling), and network operating systems (e.g., Windows Server).
- Collaborate with PC hardware and software manufacturers to plan and direct the growth of PC networks (LAN/WAN).

Qualifications, Key Skills, and Attributes:
- Proficient with tools of the trade, including multimeters, oscilloscopes, software utilities, and diagnostic software analyzers, as well as SQL and information security disciplines.
- Comprehensive understanding of Microsoft client and server operating systems, Microsoft Cluster software, NEC Express Cluster, and best practices for installation, configuration, support, and management.
- Experience in the software development lifecycle, large-scale computing, modeling, cybersecurity, anomaly detection, Security Operations Center (SOC) detection, threat analytics, and security incident and event management (SIEM).
- Impeccable customer service skills with strong written and verbal communication abilities.
- Excellent organizational, analytical, and interpersonal skills, with a sense of urgency in execution.
- Ability to effectively communicate complex technical concepts to internal and external stakeholders.
- Field service experience with access control, CCTV, biometric scanners, and similar technologies is highly regarded.
- A Bachelor’s Degree and relevant security certifications (CISSP, CISA, CISM, SANS, GCIA, GCIH, OSCP) are preferred.
- Ability to attain and maintain NV1 security clearance.

Benefits of the Role:
- Competitive salary package, including an annual bonus and company shares, health allowance or private healthcare, and access to a wide range of wellness, company, and financial benefits.
- Conveniently located near transport links, with an onsite gym, pool table, and secure free parking.
- Enjoy a highly autonomous position that allows you to thrive and make an impact.
- Be a key part of a newly created Global team and join Equinix at an exciting time in our journey!

**Ready to take your career to the next level? Apply now and be part of our innovative team at Equinix!**

Equinix is committed to ensuring that our employment process is open to all individuals, including those with a disability.  If you are a qualified candidate and need assistance or an accommodation, please let us know by completing this form.

Equinix is an Equal Employment Opportunity and, in the U.S., an Affirmative Action employer.  All qualified applicants will receive consideration for employment without regard to unlawful consideration of race, color, religion, creed, national or ethnic origin, ancestry, place of birth, citizenship, sex, pregnancy / childbirth or related medical conditions, sexual orientation, gender identity or expression, marital or domestic partnership status, age, veteran or military status, physical or mental disability, medical condition, genetic information, political / organizational affiliation, status as a victim or family member of a victim of crime or abuse, or any other status protected by applicable law. 
    

I ALSO INCLUDED MY RESUME INCASE YOU WANT TO ASK QUESTIONS FROM THAT: 
Hiring Manager
Equinix
Sydney, NSW
Position: Application for Physical Security Engineer (JR-152004)
Dear Hiring Manager,
As a veteran of the Australian Defence Force with extensive experience in high-threat
security, operational risk management, and multi-functional team environments, I am excited
to apply for the Physical Security Engineer role at Equinix. My background in safeguarding
critical infrastructure, combined with hands-on experience operating surveillance equipment,
detection tools, and mission critical systems, has positioned me to contribute effectively to
your Physical Security team.
During my military career, including a deployment on Operation HIGHROAD in
Afghanistan and NATO-supported security operations, I successfully implemented and
managed robust physical security measures in complex, high-risk environments. I ensured the
protection of both personnel and vital assets through effective security protocols.
As a Rifleman and Clearance Diver, I operated and maintained complex equipment under
pressure, ensuring mission success. This experience aligns directly with Equinix’s need for
professionals who can troubleshoot, optimise, and innovate in a fast-paced environment.
In addition to my tactical expertise, I bring technical qualifications that complement this role.
I hold a Certificate IV in Information Technology Programming and am currently pursuing a
degree in Computer Science, with a strong interest in API integration, scripting, and security,
developed through my work as a freelance website developer.
I also hold a Diploma of Security and Risk Management, alongside a Diploma of Leadership
and Management, which together provide a solid foundation in risk awareness, incident
response principles, team coordination, and strategic planning.
Equinix’s emphasis on a customer-centric approach, process improvement, and cross-
functional collaboration strongly resonates with my experience. In the military, I trained
personnel, coordinated with allied forces, and advised senior leaders on security risks.
I am particularly drawn to Equinix’s commitment to scaling secure digital infrastructure and
would welcome the opportunity to contribute my hybrid skill set to your team. I am confident
in my ability to deliver results and support the company’s physical security objectives.
Thank you for considering my application. I would appreciate the chance to discuss how my
background aligns with Equinix’s goals and look forward to your reply.


SKILLS
Information Technology Related Skills:
Security Related skills:
Python Basics
JavaScript
JavaScript Frameworks
HTML/CSS
GitHub
Node.js and Next.js
Express
MongoDB
MYSQL
Website hosting setup
Database design
Communication
Service Level Agreements
Leadership and Risk Management
Time management
Communication
Team building
Multitasking
Problem-solving and adaptability
Security procedures
Firearms
Defensive driving
Threat management
Perimeter security
Computer skills
Security operations experience
EMPLOYMENT HISTORY
Freelance Web Developer
Sydney, NSW
Self Employeed/ Jan 2024 to Current
Provided IT support for client websites and Google Workspace setup.
Freelance web development using HTML, CSS, JavaScript, Node, Express, MongoDB,
EJS, Next.js, and Tailwind CSS.
I built personal projects and academic applications for TAFE and university.
Experience with frameworks and database-driven projects.
Proficient in Python programming.
Experience with SQL Azure and MySQL database management using XAMPP.
Effective team collaborator.
Optimized website load times and performance using techniques such as minification
and content delivery networks (CDNs).
Implemented responsive design techniques to ensure optimal viewing experience
across multiple devices.
Utilized Git for version control and deployment, using Vercel or Render.
Ensured website security by implementing measures to protect against common
vulnerabilities.
CLEARANCE DIVER
Royal Australian Navy/ Jan 2021 to Jan 2024
Coordinate with units to meet critical goals, boosting team efficiency.
Executed underwater tasks with precision, achieving objectives.
Operated advanced equipment, always ensuring rapid deployment readiness.
Analyzed environments to identify hazards, and developed strategic solutions
effectively.
Strengthened inter-service relationships, fostering collaboration in joint operations.
Performed underwater construction activities such as welding and cutting.
Listened carefully to dive plan details and asked appropriate questions to explore
concerns and devise corrective actions.
Operated underwater video, sonar, and recording equipment.
Maintained logbook of dive locations and times.
Disposed of unexploded ordnance.
Support Worker - Casual (2 Days a Week)
Sydney, NSW
Northcott/ Jan 2019 to Jun 2021
Engaged clients in activities aimed at promoting physical and mental stimulation.
Helped clients develop independent living skills, such as budgeting, cooking and
cleaning.
Drove and accompanied clients to appointments, shopping and special events for
safety and companionship.
Supported clients with mobility needs, including the use of wheelchairs and transfers.
Provided emotional support and companionship to enhance clients' well-being.
Organised leisure activities for clients in the community.
Participated in professional development and training sessions to enhance care quality
and support provided.
Acted as role model for clients by exhibiting positive behaviors.
INFANTRY
Royal Australian Army/ Jan 2014 to Jan 2021
Provided force protection in Afghanistan, ensuring safety and mission success.
Enhanced team cohesion in multinational units for better operational effectiveness.
Executed strategic security measures to reduce risks in volatile regions.
Completed advanced infantry training, mastering skills for complex deployments.
Monitored building and property entrances and exits to detect intrusions and protect
assets.
Searched individuals and baggage for weapons and other prohibited items.
Verified photo IDs for security purposes.
Enforced access control measures in accordance with established procedures.
Monitored security cameras to identify and respond to suspicious activity.
Maintained high levels of alertness throughout military operations.
Deployed to Afghanistan as part of a force protection element providing security to key
personnel.
Briefed superiors on mission outcomes and suggested improvements for future
operations.
Provided precision to carry out increasingly complex missions.
Used technical expertise and sound military judgment to learn and perform complex
procedures.
Ensured compliance with safety regulations while performing duties such as operating
a motor vehicle or handling hazardous materials.
Provided security during convoy operations by monitoring roadways for suspicious
activity or threats.
Conducted reconnaissance operations to gather intelligence and surveillance data.
Assessed terrain, potential threats and identified target objectives for mission
planning.
EDUCATION
BACHELOR OF COMPUTER SCIENCE: Computer Science
Griffith University Apr 2025
Queensland
Completed course in (programming, professional practice, computer systems - cyber security
and database management/creation)
CERTIFICATE IV IN INFORMATION & TECHNOLOGY PROGRAMMING: Information Technology
Tafe NSW Jan 2024
New South Wales
DIPLOMA IN LEADERSHIP & MANAGEMENT: Recognition of Prior Learning
Hamilton Institute Jan 2018
DIPLOMA IN SECURITY & RISK MANAGEMENT: Recognition of Prior Learning
Hamilton Institute Jan 2018
CERTIFICATE II IN MILITARY OPERATIONS: Government
Australian Defence Force
YEAR 10 CERTIFICATE
Magdalene Catholic High School
New South Wales
MILITARY EXPERIENCE
Royal Australian Infantry, 01/01/14, 01/01/21, Completed the Rifleman Course at the
School of Infantry, 2015. Deployed as a member of the Force Protection Element to
Afghanistan. Earned the Record of Attainment in Support to Intelligence and Basic
Reconnaissance.
Royal Australian Navy Clearance Diver, 01/01/21, 01/01/24, Successfully completed the
Clearance Diver Employment Training & Aptitude Test, 2022. Employed in high-stakes
environments requiring advanced tactical and technical skills.
INFORMATION TECHNOLOGY EXPERIENCE
Provided IT support for client websites and Google Workspace setup
Freelance Web development using HTML, CSS, JavaScript, Node, express, MongoDB,
EJS and Tailwind CSS.
Built personal projects and academic applications for TAFE and university.
Experience with frameworks and database-driven projects.
Proficient in Python programming.
Experience with SQL Azure and MySQL database management with XAMPP.
Effective team collaborator.




    `
    ,
    voice: 'shimmer',
  });
  

export const session = new RealtimeSession(agent, {
  model: 'gpt-4o-realtime-preview-2025-06-03',
});
