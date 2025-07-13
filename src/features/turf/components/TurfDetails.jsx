import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  StarIcon,
  MapPinIcon,
  ClockIcon,
  AcademicCapIcon,
  SparklesIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchTurf, clearSelectedTurf } from '../../../store/slices/turfSlice';
import { toast } from 'react-hot-toast';

const TurfDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedTurf, selectedLoading, selectedError } = useSelector((state) => state.turfs);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Only fetch turf data if we don't have it or if it's for a different ID
    if (!selectedTurf || selectedTurf._id !== id) {
      dispatch(fetchTurf(id))
        .unwrap()
        .catch((error) => {
          toast.error(error);
          navigate('/404');
        });
    }
  }, [id, navigate, dispatch]);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearSelectedTurf());
    };
  }, [dispatch]);

  if (selectedLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (selectedError) {
    toast.error(selectedError);
    navigate('/404');
    return null;
  }

  if (!selectedTurf) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-gray-500">Turf details not found</div>
      </div>
    );
  }

  // Sample reviews data
  const reviews = [
    {
      name: 'John Doe',
      rating: 5,
      comment: 'Great facilities and excellent service!',
      date: '2025-06-01'
    },
    {
      name: 'Jane Smith',
      rating: 4,
      comment: 'Very clean and well-maintained turf.',
      date: '2025-05-25'
    },
    {
      name: 'Mike Johnson',
      rating: 5,
      comment: 'Perfect for our team matches!',
      date: '2025-05-20'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {console.log(selectedTurf)};
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-gray-800"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span className="ml-2">Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Images Carousel */}
        <div className="lg:col-span-2">
          <div className="relative h-96 mb-6">
            {selectedTurf.images && selectedTurf.images.length > 0 ? (
              <>
                <img
                  src={selectedTurf.images[activeImageIndex]}
                  alt={selectedTurf.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {selectedTurf.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`p-1 rounded-full ${
                        activeImageIndex === index
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-white'
                      }`}
                    >
                      <span className="sr-only">Go to slide {index + 1}</span>
                      <span className="w-2 h-2 bg-white rounded-full" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-gray-500">No images available</div>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {selectedTurf.name ? (
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedTurf.name}</h1>
          ) : (
            <div className="text-gray-500">Loading...</div>
          )}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(selectedTurf.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">{selectedTurf.rating} ({selectedTurf.reviewCount})</span>
          </div>

          <div className="space-y-6">
            {/* Location */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPinIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-2">{selectedTurf.location.city}, {selectedTurf.location.state}</span>
              </div>
              <p className="text-gray-600 mb-6">{selectedTurf.description}</p>
            </div>

            {/* Sports */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sports</h3>
              <div className="flex items-center">

                <span className="flex flex-wrap gap-2">
                {selectedTurf.sportTypes && selectedTurf.sportTypes.map((sport) => (
                  <span
                    key={sport}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                  >
                    {sport}
                  </span>
                ))}
                </span>
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Facilities</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTurf.amenities && selectedTurf.amenities.map((facility) => (
                  <span
                    key={facility}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">₹{selectedTurf.pricePerHour}</span>
                <span className="ml-2 text-gray-600">per hour</span>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="mt-8">
              <button
                onClick={() => navigate(`/book/${selectedTurf._id}`)}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">{review.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{review.name}</h3>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TurfDetails;
