import React, { useState } from "react";
import { Calendar, Mail, ShieldCheck, UserCircle2 } from "lucide-react";
import Navbar from "../../component/Navbar";

const Info = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: user.username,
    email: user.email,
  });

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/users/updateUser/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Profile updated successfully ✅");
        setEditMode(false);
        window.location.reload();
      } else {
        alert(data.message || "Failed to update profile ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating profile ❌");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      const res = await fetch(
        `http://localhost:3000/users/deleteUser/${user._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Account deleted successfully ");
        localStorage.clear();
        window.location.href = "/";
      } else {
        alert(data.message || "Failed to delete account ");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting account ");
    }
  };

  return (
    <div>
      <Navbar user={user} />

      <div className="max-w-md mx-auto mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4 mb-4">
          <UserCircle2 className="w-12 h-12 text-purple-500" />
          <div>
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p className="text-gray-500 text-sm">{user.role}</p>
          </div>
        </div>

        <div className="space-y-3 text-gray-700">
          {/* Email */}
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-500" />
            {editMode ? (
              <input
                type="email"
                value={updatedUser.email}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email: e.target.value })
                }
                className="border p-1 rounded w-full"
              />
            ) : (
              <span>{user.email || "No email available"}</span>
            )}
          </div>

          {/* Role */}
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gray-500" />
            <span>
              Role:{" "}
              <span
                className={`font-medium ${
                  user.role === "admin" ? "text-purple-600" : "text-gray-600"
                }`}
              >
                {user.role}
              </span>
            </span>
          </div>

          {/* Joined */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span>
              Joined:{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
