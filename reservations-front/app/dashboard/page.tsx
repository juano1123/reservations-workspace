"use client";

import { Layout } from "@/components/Layout";

export default function Dashboard() {
  return (
    <Layout withNavigation>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Appointments
            </h3>
            <p className="text-3xl font-bold text-pink-600 mt-2">24</p>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Recent Activity
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="text-sm text-gray-600">
                New appointment scheduled
              </li>
              <li className="text-sm text-gray-600">Appointment completed</li>
              <li className="text-sm text-gray-600">New client registered</li>
            </ul>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Quick Actions
            </h3>
            <div className="mt-4 space-y-3">
              <button className="w-full bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">
                New Appointment
              </button>
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
                View Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
