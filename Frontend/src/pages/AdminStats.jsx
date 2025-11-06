import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../../component/Navbar';

const AdminStats = () => {
 
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); 
  console.log("User in AdminStats:", user);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user || user.role !== "admin") {
        setError("Access denied — Admins only");
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/chats/count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched stats:", res.data);
        setStats(res.data);
    } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch stats");
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="p-6 bg-red-100 text-red-600 rounded text-center">
        {error}
      </div>
    );
  }

  if (!stats) {
    return <p className="text-center  mt-10">Loading...</p>;
  }

  return (
    <div>
      <Navbar user={user} />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-4"> Admin Dashboard</h2>
        <div className="text-xl space-y-2">
          <p>
            <strong>Total Chats:</strong> {stats.totalChats}
          </p>
          <p>
            <strong>Total Users:</strong> {stats.totalUsers}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminStats