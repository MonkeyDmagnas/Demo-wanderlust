import React from "react";
import { Mountain, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const naviagate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="text-center max-w-md mx-auto">
        <Mountain className="w-16 h-16 mx-auto mb-6 text-teal-600" />

        <div className="text-8xl font-bold text-transparent bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text mb-4">
          404
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>

        <button
          onClick={() => naviagate("/")}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
        >
          <Home className="w-5 h-5" />
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
