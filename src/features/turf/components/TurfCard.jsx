import { MapPinIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const TurfCard = ({ turf }) => {
  const navigate = useNavigate();
  const locationText = turf.location ? 
    `${turf.location.city}, ${turf.location.state}` : 
    'Location not available';

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/turf/${turf._id}`)}
    >
      <div className="relative h-48">
        <img
          src={turf.images[0]}
          alt={turf.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {turf.name}
        </h3>
        <p className="text-gray-600 mb-2">{turf.description}</p>
        <div className="flex items-center mb-2">
          <MapPinIcon className="h-5 w-5 text-yellow-400" />
          <span className="ml-1 text-gray-600">{locationText}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-blue-600">
              ₹{turf.price}/hour
            </span>
          </div>
          <button
            onClick={() => navigate(`/book/${turf._id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;
