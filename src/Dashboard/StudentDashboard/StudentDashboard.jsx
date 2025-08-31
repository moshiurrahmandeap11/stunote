import React, { useState } from "react";
import {
  Search,
  Bell,
  Plus,
  Calendar,
  BookOpen,
  CheckSquare,
  User,
  Settings,
  Home,
  Clock,
  ArrowRight,
} from "lucide-react";
import { AuthContext } from "../../contexts/AuthContexts/AuthContexts";
import useAuth from "../../hooks/useauth/useAuth";
import { useNavigate } from "react-router";

const StudentDashboard = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete Math Assignment", completed: false },
    { id: 2, title: "Read Chapter 5 - Biology", completed: true },
    { id: 3, title: "Submit History Essay", completed: false },
  ]);
  const [notes, setNotes] = useState([
    { id: 1, title: "Physics Notes - Motion", date: "Today" },
    { id: 2, title: "Chemistry Lab Report", date: "2 days ago" },
    { id: 3, title: "Literature Analysis", date: "1 week ago" },
  ]);

  const menuItems = [
    { name: "Dashboard", icon: Home },
    { name: "Notes", icon: BookOpen },
    { name: "Tasks", icon: CheckSquare },
    { name: "Calendar", icon: Calendar },
    { name: "Resources", icon: BookOpen },
    { name: "Profile", icon: User },
    { name: "Settings", icon: Settings },
  ];

  const upcomingEvents = [
    { title: "Math Exam", date: "Tomorrow", time: "10:00 AM" },
    { title: "Physics Lab", date: "Sep 2", time: "2:00 PM" },
    { title: "Project Deadline", date: "Sep 5", time: "11:59 PM" },
  ];

  const resources = [
    { title: "Study Materials", type: "PDF" },
    { title: "Video Lectures", type: "MP4" },
    { title: "Practice Tests", type: "Online" },
  ];

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  if (loading) {
    return <div>loading...</div>;
  }

  // Define content for each tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Overview</h2>
            {/* Top Row Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Today's Tasks */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Today's Tasks
                  </h3>
                  <CheckSquare className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="space-y-3">
                  {tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          task.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-300 hover:border-indigo-500"
                        }`}
                      >
                        {task.completed && <CheckSquare className="w-3 h-3" />}
                      </button>
                      <span
                        className={`text-sm ${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-gray-700"
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center">
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Quick Notes */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Quick Notes
                  </h3>
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="space-y-3">
                  {notes.slice(0, 3).map((note) => (
                    <div
                      key={note.id}
                      className="border-l-4 border-indigo-200 pl-3 py-1"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {note.title}
                      </p>
                      <p className="text-xs text-gray-500">{note.date}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center">
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Upcoming */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upcoming
                  </h3>
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {event.date} at {event.time}
                        </p>
                      </div>
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center">
                  View calendar <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Bottom Row Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Calendar Mini View */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Calendar (Mini View)
                  </h3>
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                    <div key={index} className="font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = i - 2;
                    const isCurrentMonth = date >= 1 && date <= 31;
                    const isToday = date === 31;
                    return (
                      <div
                        key={i}
                        className={`py-2 rounded-lg cursor-pointer transition-colors ${
                          isToday
                            ? "bg-indigo-600 text-white"
                            : isCurrentMonth
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-gray-400"
                        }`}
                      >
                        {isCurrentMonth
                          ? date
                          : date <= 0
                          ? 30 + date
                          : date - 31}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Resources
                  </h3>
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="space-y-4">
                  {resources.map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {resource.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {resource.type}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center">
                  Browse all <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        );

      case "Notes":
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Notes</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  All Notes
                </h3>
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="space-y-3">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="border-l-4 border-indigo-200 pl-3 py-2"
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {note.title}
                    </p>
                    <p className="text-xs text-gray-500">{note.date}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center">
                Add new note <Plus className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        );

      case "Tasks":
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Tasks</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  All Tasks
                </h3>
                <CheckSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        task.completed
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 hover:border-indigo-500"
                      }`}
                    >
                      {task.completed && <CheckSquare className="w-3 h-3" />}
                    </button>
                    <span
                      className={`text-sm ${
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-gray-700"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center">
                Add new task <Plus className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        );

      case "Calendar":
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Calendar</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Full Calendar
                </h3>
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div key={index} className="font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const date = i - 2;
                  const isCurrentMonth = date >= 1 && date <= 31;
                  const isToday = date === 31;
                  return (
                    <div
                      key={i}
                      className={`py-2 rounded-lg cursor-pointer transition-colors ${
                        isToday
                          ? "bg-indigo-600 text-white"
                          : isCurrentMonth
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-gray-400"
                      }`}
                    >
                      {isCurrentMonth
                        ? date
                        : date <= 0
                        ? 30 + date
                        : date - 31}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">
                  Upcoming Events
                </h4>
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {event.date} at {event.time}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Resources":
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Resources</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  All Resources
                </h3>
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {resource.title}
                        </p>
                        <p className="text-sm text-gray-500">{resource.type}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
              <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center">
                Browse all <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        );

      case "Profile":
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Profile</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  User Profile
                </h3>
                <User className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-700">Name: Mo</p>
                <p className="text-sm text-gray-700">Role: Student</p>
                <p className="text-sm text-gray-700">Email: mo@example.com</p>
                <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center">
                  Edit Profile <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        );

      case "Settings":
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Settings</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Settings
                </h3>
                <Settings className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  Notification Preferences
                </p>
                <p className="text-sm text-gray-700">Theme: Light</p>
                <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center">
                  Update Settings <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-700">Select a tab to view content</div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-indigo-600">Stunote</h1>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.name
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center justifies-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <div>
              {user && (
              user?.displayName
              )}
              </div>
              <div
                onClick={handleLogOut}
                className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg font-medium"
              >
                Log Out
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-8">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default StudentDashboard;
