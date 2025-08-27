import React from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate("/auth/student/login");
    }
  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-primary text-4xl font-bold text-center">
        Stunote – Student Productivity System
      </h1>
      <h3 className="text-secondary text-lg text-center">
        Notes • Tasks • Calendar • Reminders • Resources
      </h3>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <p className="text-xl font-semibold mb-4">Key Features</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Class schedule tracker</li>
          <li>Budget tracker</li>
          <li>Exam Q&A generator</li>
          <li>Study planner</li>
          <li>Resource Library</li>
          <li>Quick Notes</li>
        </ul>
      </div>
      <button onClick={handleGetStarted} className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition">
        Get Started
      </button>
    </div>
  );
};

export default Home;
