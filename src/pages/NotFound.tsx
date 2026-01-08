import { useNavigate } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Illustration Area */}
        <div className="relative mb-8 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="absolute inset-0 bg-indigo-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"></div>
          <div className="relative bg-white p-6 rounded-3xl shadow-sm border border-gray-100 inline-flex items-center justify-center">
             <FileQuestion className="h-16 w-16 text-indigo-500" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Page not found
        </h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-6 py-2.5 border border-gray-200 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
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
         <p className="text-xs text-gray-400">Error Code: 404</p>
      </div>
    </div>
  );
};

export default NotFound;
