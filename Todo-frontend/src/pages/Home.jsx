import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

const Home = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    task: "",
  });

  const fetchItems = async () => {
    try {
      const { data } = await api.get("/api/fetchAll");
      if (data.success) {
        setItems(data.item);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [items]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const deleteItem = async (id) => {
    try {
      const { data } = await api.delete(`/api/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchItems();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // ✅ Check for empty task
      if (!formData.task.trim()) {
        return toast.error("Please enter a task!");
      }

      const { data } = await api.post("/api/add", formData);
      if (data.success) {
        toast.success(data.message);
        setFormData({
          task: "",
        });
        await fetchItems();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="text"
              placeholder="Enter your task..."
              name="task"
              value={formData.task}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
            >
              Add Task
            </button>
          </form>

          {/* Task Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-5">
              📋 Your Tasks
            </h2>

            {items.length === 0 ? (
              <div className="text-center text-gray-500 py-8 border rounded-lg">
                No tasks available 🚀
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <h4 className="text-lg font-medium text-gray-800 wrap-break-word">
                      {item.task}
                    </h4>

                    <button
                      onClick={() => deleteItem(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition duration-300 w-full sm:w-auto"
                    >
                      🗑 Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
