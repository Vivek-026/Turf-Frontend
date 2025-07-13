import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  // Mock bookings data (in real app, this would come from API)
  const bookings = [
    {
      _id: '1',
      turf: {
        name: 'Champions Sports Arena',
        id: '1'
      },
      date: '2025-06-15',
      time: '18:00'
    },
    {
      _id: '2',
      turf: {
        name: 'Elite Cricket Ground',
        id: '2'
      },
      date: '2025-06-16',
      time: '16:00'
    }
  ];



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            My Profile
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="mt-1 text-gray-900">{user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <p className="mt-1 text-gray-900">{user?.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  My Bookings
                </h2>

                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-white p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {booking.turf.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(booking.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Time: {booking.time}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/turf/${booking.turf.id}`}
                            className="text-blue-600 hover:text-blue-500"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </Link>
                          <button
                            className="text-red-600 hover:text-red-500"
                            onClick={() => {
                              // Handle booking cancellation
                              alert('Booking cancellation coming soon!');
                            }}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
