'use client'
import React, { useState, ReactNode, useEffect } from 'react';
import { useAuth } from '../(firebaseAuth)/useAuthFB';
import { useRouter } from "next/navigation";
import { handleLogout } from '../(firebaseAuth)/firebaseLogout';
import { usePathname } from 'next/navigation';
import {
  Home,
  // Calendar,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
  User
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
    // { icon: Calendar, href:'/dashboard/nutrition', label: 'Nutrition' },
    { icon: FileText, href:'/dashboard/completed', label: 'History' },
    { icon: Settings, href:'/dashboard/achieved', label: 'Settings' },
  ];

  useEffect(()=> {
    if(!loading && !user) {
      router.push("/signin")
    }
  },[loading, user, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-200 mb-6">
            <div className="animate-spin w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full"></div>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Loading Dashboard</h2>
          <p className="text-slate-600">Preparing your workspace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center max-w-md">
          <div className="bg-red-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <User className="text-2xl text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Authentication Required</h2>
          <p className="text-slate-600">Please sign in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className={`${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl border-r border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b bg-slate-50 border-slate-50">
          <div className="flex items-center">
            <div className="w-50 h-8 rounded-lg flex items-center justify-center">
              <NexiaLogo />
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-white hover:text-slate-300 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={index} className="list-none">
                <a
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                  }`} />
                  {item.label}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </a>
              </li>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center mb-4 p-3 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-slate-900">Welcome back!</p>
              <p className="text-xs text-slate-600 truncate">{user?.email}</p>
            </div>
          </div>
          
          <button
            onClick={() => logoutUser()}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 mr-3 text-slate-500 group-hover:text-red-600 transition-colors" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors mr-2"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Page Title */}
              <div className="ml-2 lg:ml-0">
                <h1 className="text-2xl font-bold text-slate-900">
                  {navigationItems.find(item => item.href === pathname)?.label || 'Dashboard'}
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
                  Active Plan
                </div>
              </div>
              
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="min-h-96">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}