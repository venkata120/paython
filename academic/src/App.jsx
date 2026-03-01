import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // 1. Check if the current route is the login page
  const isLoginPage = location.pathname === "/login";

  // 2. If it's the login page, render only the form (No Header, Sidebar, or Footer)
  if (isLoginPage) {
    return (
      
      <main className="min-h-screen bg-white">
        <Outlet />
      </main>
    );
  }

  // 3. Main Dashboard Layout (For Home and other protected routes)
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased">
      {/* Fixed Header */}
      <Header />
      
      <div className="flex pt-16 flex-1">
        {/* Persistent Sidebar with toggle state */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          <main 
            className={`flex-1 p-6 transition-all duration-300 ease-in-out
            ${isCollapsed ? "ml-20" : "ml-64"}`}
          >
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>

          {/* Footer - Also adjusts margin to match sidebar */}
          <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? "ml-20" : "ml-64"}`}>
             <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
