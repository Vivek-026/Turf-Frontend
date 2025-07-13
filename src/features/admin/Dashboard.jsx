import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ChartBarIcon, UsersIcon, CalendarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const response = await fetch('/api/admin/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      return response.json();
    },
  });

  if (error) {
    return (
      <div className="text-red-500">
        Error loading dashboard: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Bookings
                  </h3>
                  <p className="text-xl font-semibold text-gray-900">
                    {stats?.totalBookings || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Users
                  </h3>
                  <p className="text-xl font-semibold text-gray-900">
                    {stats?.totalUsers || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Today's Bookings
                  </h3>
                  <p className="text-xl font-semibold text-gray-900">
                    {stats?.todayBookings || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Pending Approvals
                  </h3>
                  <p className="text-xl font-semibold text-gray-900">
                    {stats?.pendingApprovals || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Bookings
              </h2>
              <div className="space-y-4">
                {stats?.recentBookings?.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {booking.turf.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pending Turf Approvals
              </h2>
              <div className="space-y-4">
                {stats?.pendingTurfApprovals?.map((turf) => (
                  <div
                    key={turf._id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {turf.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {turf.location}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-green-600 hover:text-green-500"
                        onClick={() => {
                          // Handle approval
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="text-red-600 hover:text-red-500"
                        onClick={() => {
                          // Handle rejection
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
