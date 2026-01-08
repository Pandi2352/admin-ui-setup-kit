
import { useParams, Link } from 'react-router-dom';
import { FolderKanban } from 'lucide-react';

export const Projects = () => {
    const { id } = useParams();
    
    if (id) {
        return (
            <div>
                 <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                    <Link to="/projects" className="hover:text-indigo-600">Projects</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Project details</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Project {id}</h1>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-600">Viewing details for project ID: <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{id}</span></p>
                </div>
            </div>
        )
    }

    return (
        <div>
           <h1 className="text-2xl font-bold text-gray-900 mb-6">Projects</h1>
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
               {[1, 2].map(p => (
                   <Link key={p} to={`/projects/${p}`} className="group p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all">
                       <div className="flex items-center gap-3 mb-3">
                           <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                            <FolderKanban className="w-5 h-5 text-indigo-600" />
                           </div>
                           <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">Project {p === 1 ? 'Alpha' : 'Beta'}</h3>
                       </div>
                       <p className="text-sm text-gray-500">A detail description about this project and its current status.</p>
                       <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                           <span>Updated 2h ago</span>
                           <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full font-medium">Active</span>
                       </div>
                   </Link>
               ))}
           </div>
        </div>
    );
};
