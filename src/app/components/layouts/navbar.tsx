"use client"
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';



const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
]



function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter();
   // Hide navbar on /dashboard
   const showNavbar = pathname.startsWith('/dashboard');
  return (
    <>
      {
        !showNavbar &&
      <header>
        
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="/images/logo.svg"
                    className="size-10"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={classNames(
                          isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    )
                  })}

                  </div>
                </div>
              </div>
              <div className="hidden md:block">
              <div className="flex border-gray-700 pt-2 pb-3">
                <div className="flex justify-center items-center px-1">
                  <button
                    type="button"
                    className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:bg-blue"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="flex justify-center items-center px-5">
                  <button
                    type="button"
                    onClick={()=> router.push('/signin')}
                    className="w-full rounded-md border px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black focus:bg-blue"
                  >
                    Login
                  </button>
                </div>
              </div>
                
              </div>
              <div className="-mr-2 flex md:hidden">
                
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return(
                  <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={classNames(
                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
                )
                })}
            </div>
            <div className="flex flex-col gap-4 border-t border-gray-700 pt-4 pb-3">
              <div className="flex justify-center items-center px-5">
                <button
                  type="button"
                  
                  className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:bg-blue"
                >
                  Sign Up
                </button>
              </div>
              <div className="flex justify-center items-center px-5">
                <button
                  type="button"
                  onClick={()=> router.push('/signin')}
                  className="w-full rounded-md border px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black focus:bg-blue"
                >
                  Login
                </button>
              </div>
            </div>
            

          </DisclosurePanel>
        </Disclosure>
      </div>
      </header>
}
    </>
  )
}
