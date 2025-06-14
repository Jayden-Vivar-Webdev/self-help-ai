// app/components/email-template/email-template.tsx
interface EmailTemplateProps {
    firstName: string;
    link: string;
  }
  
  export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ firstName, link }) => (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>Click below to verify your email:</p>
      <a href={link}>Verify Email</a>
    </div>
  );
  