import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
    {
      
      question: 'What is a Nexian?',
      answer: 'A Nexian is your personal AI companion designed to provide emotional support, intelligent conversation, and meaningful engagement tailored to your needs and personality.',
    },
    {
      
      question: 'Can I talk to my Nexian any time?',
      answer: 'Yes! Nexians are always available, 24/7, so you can talk whenever you feel like chatting, venting, or just need a bit of support.',
    },
    {
      
      question: 'Is my conversation with a Nexian private?',
      answer: 'Absolutely. Your conversations are confidential and encrypted to ensure your privacy and data security at all times.',
    },
    {
      
      question: 'Can Nexians help with mental wellness or anxiety?',
      answer: 'While Nexians are not licensed therapists, they are designed to offer supportive, thoughtful conversation and encouragement. For serious mental health concerns, we recommend speaking with a licensed professional.',
    },
    {
      
      question: 'Can I customize my Nexian’s personality?',
      answer: 'Yes, you can personalize your Nexian’s tone, interests, and conversation style to better match your preferences and goals.',
    },
  ];
  
  export default function FaqSection() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Frequently asked questions
            </h2>
            <dl className="mt-16 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
                  <dt>
                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base/7 font-semibold">{faq.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        <PlusSmallIcon aria-hidden="true" className="size-6 group-data-open:hidden" />
                        <MinusSmallIcon aria-hidden="true" className="size-6 group-not-data-open:hidden" />
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    <p className="text-base/7 text-gray-600">{faq.answer}</p>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
  }
  