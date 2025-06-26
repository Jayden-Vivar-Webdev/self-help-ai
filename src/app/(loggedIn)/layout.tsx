'use client'
import React, { useState, ReactNode, useEffect } from 'react';
import { useAuth } from '../(firebaseAuth)/useAuthFB';
import { useRouter } from "next/navigation";
import { handleLogout } from '../(firebaseAuth)/firebaseLogout';
import { usePathname } from 'next/navigation';


import { 
  Home, 
  Calendar, 
  FileText,  
  Settings, 
  Menu,
  X
} from 'lucide-react';
import NexiaLogo from '../components/nexia/logo';


interface Components {
   children: ReactNode
}

export default function Dashboard({children}: Components) {
  
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  const logoutUser = async () => {
    await handleLogout()
    router.push("/signin")
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { icon: Home, label: 'Dashboard', href:'/dashboard', active: true },
    // { icon: Users, href:'/dashboard' , label: 'Team' },
    // { icon: FolderOpen, href:'/dashboard/progress', label: 'Progress' },
    { icon: Calendar, href:'/dashboard/nutrition', label: 'Nutrition' },
    { icon: FileText, href:'/dashboard/completed', label: 'Metrics' },
    // { icon: BarChart3, href:'/dashboard/achieved', label: 'Achieved' },
    { icon: Settings, href:'/dashboard/achieved', label: 'Settings' },

  ];

  // const teams = [
  //   { id: '🎯', name: 'Goal 1', color: 'bg-blue-500' },
  //   { id: '📘', name: 'Goal 2', color: 'bg-cyan-500' },
  //   { id: '💪', name: 'Goal 3', color: 'bg-purple-500' }
  // ];

  useEffect(()=> {
    if(!loading && !user) {
      router.push("/signin")
    }
  },[loading, user, router])

  
  if (loading) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <svg
        className="animate-spin h-10 w-10 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="ml-4 text-indigo-600 font-semibold text-lg">Loading...</span>
    </div>
  );
}

  if (!user) {
    // User is not signed in, redirect or show message
    return <div>Please sign in to access the dashboard.</div>;
  }
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 shadow-[0_0_3px_0.5px_rgba(255,255,255,0.1)] bg-[#000000f2] border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-black">
          <div className="flex items-center">
            <div className="w-50 h-8 rounded-lg flex items-center justify-center">
              <NexiaLogo />
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="px-4 py-6">
          <ul className="space-y-2">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={index}>
                <a
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </a>
              </li>
            );
          })}
          </ul>

          {/* <div className="mt-8">
            <h3 className="px-4 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              Goals
            </h3>
            <ul className="mt-4 space-y-2">
              {teams.map((team, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 rounded-lg hover:bg-indigo-700 hover:text-white transition-colors"
                  >
                    <div className={`w-6 h-6 ${team.color} rounded-lg flex items-center justify-center text-white text-xs font-bold mr-3`}>
                      {team.id}
                    </div>
                    {team.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <a
            onClick={() => logoutUser()}
            className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 rounded-lg hover:bg-indigo-700 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5 mr-3" />
            Logout
          </a>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-900">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
             

              
              {/* <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div> */}
            </div>
            

            <div className="flex items-center space-x-4">
              {/* <button className="text-gray-500 hover:text-gray-700">
                <Bell className="w-6 h-6 text-white" />
              </button> */}
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  {/* <img
                    src="/images/logo.svg"
                    alt="Tom Cook"
                    className="w-full h-full object-cover"
                  /> */}
                  
                </div>
                
                <div className="hidden md:block">
                  <div className="flex items-center space-x-1">
                    {/* <span className="text-sm font-medium text-white">Jayden</span> */}
                    {/* <DropDown /> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black">
          <div className="container mx-auto px-4 py-8">
            <div className="min-h-96">
                  {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}