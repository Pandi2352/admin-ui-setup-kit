import { useNavigate } from 'react-router-dom';
import { ServerCrash, RefreshCw, Home } from 'lucide-react';

const ServerError = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-red-100 rounded-full opacity-50 blur-2xl"></div>
                    <div className="relative bg-white p-6 rounded-3xl shadow-sm border border-red-50 inline-flex items-center justify-center">
                         <ServerCrash className="h-16 w-16 text-red-500" strokeWidth={1.5} />
                    </div>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    Server Error
                </h1>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                    Oops, something went wrong on our end. We are working to fix it. Please try again later.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center px-6 py-2.5 border border-gray-200 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reload Page
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                         className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md hover:shadow-lg"
                    >
                        <Home className="h-4 w-4 mr-2" />
                        Go Home
                    </button>
                </div>
            </div>
             <div className="mt-12 text-center">
                <p className="text-xs text-gray-400">Error Code: 500</p>
            </div>
        </div>
    );
};

export default ServerError;
