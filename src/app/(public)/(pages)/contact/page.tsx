import HeaderContact from "@/app/components/header/header"
import ContactForm from "@/app/components/contact/contact"

export default function Contact(){
    return(
        <>
        <HeaderContact />
        <div className="relative">
        <ContactForm />
        </div>
        
        </>
    )
}