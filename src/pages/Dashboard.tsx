

import { SEO } from '../components/common/SEO';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
       <SEO 
         title="Dashboard" 
         description="View your analytics and performance metrics across the platform."
       />
       <div className="flex items-center justify-between">
           <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
           <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium">
               New Report
           </button>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
               { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%' },
               { label: 'Active Users', value: '2,345', change: '+15.2%' },
               { label: 'Bounce Rate', value: '12.5%', change: '-2.4%', negative: true }
           ].map((stat, i) => (
               <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                   <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                   <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                   <div className={`mt-4 flex items-center text-sm ${stat.negative ? 'text-red-500' : 'text-green-600'}`}>
                       <span>{stat.change}</span>
                       <span className="text-gray-400 ml-2">from last month</span>
                   </div>
               </div>
           ))}
       </div>
       
       <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-96">
           <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Overview</h3>
           <div className="h-full bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 border border-dashed border-gray-200">
               Chart Placeholder
           </div>
       </div>
    </div>
  );
};
