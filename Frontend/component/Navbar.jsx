import React from "react";
import { LogOut, MessageSquare, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="w-full bg-purple-600 text-white shadow-md px-6 py-3 flex justify-between items-center">
   
            <Link to="/chat" className="hover:underline hover:text-white">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-6 h-6" />
        <h1 className="text-lg font-semibold">LiveChat App</h1>
      </div>
            </Link>

     

      {user && (
        <div className="flex items-center gap-4">
          {user.role === "admin" ? (
            <Link to="/stats" className=" hover:underline-purple-500 hover:text-white">
              Stats{" "}
            </Link>
          ) : (
            <p></p>
          )}
         
        
          <div className="flex items-center gap-2">
            <Link to="/info" className="flex items-center gap-2 hover:underline hover:text-white">
            <UserCircle2 className="w-5 h-5" />
            <div>
              
              <p className="font-medium">{user.username}</p>
              <p className="text-xs opacity-80">{user.role}</p>
            </div>
            </Link>
          </div>

     
        </div>
      )}
    </nav>
  );
};

export default Navbar;
