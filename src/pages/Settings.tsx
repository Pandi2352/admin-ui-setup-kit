import { User, Shield } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const Settings = () => {
    return (
        <div className="max-w-4xl">
            <SEO title="Settings" />
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
            
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64 flex-shrink-0 space-y-1">
                    {['General', 'Notifications', 'Security', 'Billing'].map((tab, i) => (
                         <button key={tab} className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                             {tab}
                         </button>
                    ))}
                </div>

                <div className="flex-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <User className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
                                <p className="text-sm text-gray-500">Update your account's profile information and email address.</p>
                            </div>
                        </div>
                        
                        <div className="space-y-4 max-w-lg">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" defaultValue="Alex Morgan" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" defaultValue="alex@nested.ai" />
                            </div>
                            <div className="pt-2">
                                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm">Save Changes</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 opacity-60">
                         <div className="flex items-center gap-3 mb-2">
                            <Shield className="w-5 h-5 text-gray-400" />
                            <h3 className="text-lg font-medium text-gray-900">Security</h3>
                        </div>
                        <p className="text-sm text-gray-500">Password and authentication settings...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
