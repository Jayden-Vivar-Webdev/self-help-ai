
import { useState } from "react"
interface FAQ {
    id: string
    question: string
    answer: string
}

interface FAQs {
    faqs: FAQ[]
}

export default function FaqSection({faqs}: FAQs){

    const [openId, setOpenId] = useState('');

    function toggleId(key: string){
        setOpenId((prevKey) => (prevKey === key ? 'undefined' : key))
    }

    return(
        <>
            <section className="flex justify-center">
                <div className="w-3/4 lg:w-1/2">
                    <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-black sm:text-5xl">
                        Frequently Asked Questions
                    </h1>

                    <div className="flex flex-col gap-10 justify-start py-10 text-gray-600 px-2">
                        {faqs.map((faq) => (
                            <div key={faq.id}>
                            <button 
                            onClick={()=> toggleId(faq.id)}
                            className="flex justify-between text-1xl font-bold tracking-tight text-left w-full border-b-2 border-gray-300 py-3">
                                {faq.question}
                            <span>+</span> 
                            </button>

                            {openId === faq.id && 
                                <div>
                                    <p>{faq.answer}</p>
                                </div>
                            }
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}