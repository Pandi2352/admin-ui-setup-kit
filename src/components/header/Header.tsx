import { Search, Bell, Settings } from 'lucide-react';
import { SidebarToggle } from '../sidebar/SidebarToggle';
import { GTranslate } from '../common/GTranslate';
import { LanguageSelector } from './LanguageSelector';

export const Header = () => {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <GTranslate />
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <div className="lg:hidden">
            <SidebarToggle mobile />
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center max-w-md w-full">
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4" />
                </div>
                <input
                    name="search"
                    id="search"
                    className="block w-64 pl-10 pr-3 py-1.5 border border-transparent rounded-lg leading-5 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 sm:text-sm transition-all duration-200"
                    placeholder="Type to search..."
                    type="search"
                />
            </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Language Dropdown */}
        <LanguageSelector />
        
        <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
            <Settings className="h-5 w-5" />
        </button>

        <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

        <button className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
             <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                AM
             </div>
             <div className="hidden sm:block text-left">
                 <p className="text-xs font-semibold text-gray-700">Alex Morgan</p>
                 <p className="text-[10px] text-gray-500">Admin</p>
             </div>
        </button>
      </div>
    </header>
  );
};
