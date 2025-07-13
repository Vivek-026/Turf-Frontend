import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTurf, clearSelectedTurf } from '../../store/slices/turfSlice';

const formatTime = (time) => {
  const date = new Date(`1970-01-01T${time}`);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    name: '',
    phone: '',
    email: '',
    players: 1,
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const { selectedTurf, selectedLoading, selectedError } = useSelector((state) => state.turfs);

  useEffect(() => {
    if (!selectedTurf || selectedTurf._id !== id) {
      dispatch(fetchTurf(id))
        .unwrap()
        .catch((error) => {
          toast.error(error || 'Failed to fetch turf');
          navigate('/404');
        });
    }
  }, [id, dispatch, selectedTurf, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedTurf());
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedTurf?.availableSlots && selectedDate) {
      const dateSlots = selectedTurf.availableSlots.filter(slot =>
        new Date(slot.date).toDateString() === new Date(selectedDate).toDateString()
      );
      setAvailableSlots(dateSlots);
    }
  }, [selectedTurf, selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'date') {
      setSelectedDate(value);
      setFormData(prev => ({
        ...prev,
        startTime: '',
        endTime: '',
      }));
    }
  };

  const { mutate: createBooking, isLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ turfId: selectedTurf._id, ...data }),
      });
      if (!response.ok) throw new Error('Failed to create booking');
      return response.json();
    },
    onSuccess: () => {
      toast.success('Booking created successfully!');
      navigate('/profile');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedTime = new Date(formData.date + 'T' + formData.startTime);
    const endTime = new Date(formData.date + 'T' + formData.endTime);

    if (!availableSlots.some(slot => {
      const slotStart = new Date(slot.date + 'T' + slot.startTime);
      const slotEnd = new Date(slot.date + 'T' + slot.endTime);
      return selectedTime >= slotStart && endTime <= slotEnd;
    })) {
      toast.error('Selected time slot is not available');
      return;
    }

    createBooking(formData);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Turf</h1>

          {selectedLoading ? (
            <div className="text-gray-500">Loading turf details...</div>
          ) : selectedError ? (
            <div className="text-red-500">Failed to load turf details</div>
          ) : !selectedTurf ? (
            <div className="text-gray-500">No turf selected</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Picker */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Select Date
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Time Slots */}
              {availableSlots.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Time Slot
                  </label>
                  {availableSlots.map((slot, index) => {
                    const isSelected =
                      formData.startTime === slot.startTime &&
                      formData.endTime === slot.endTime &&
                      formData.date === slot.date;

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            date: slot.date,
                            startTime: slot.startTime,
                            endTime: slot.endTime,
                          }));
                        }}
                        className={`w-full p-3 rounded-md border text-left ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        <div className="flex justify-between">
                          <span>{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</span>
                          <span className="text-sm">
                            {new Date(slot.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Inputs */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="players" className="block text-sm font-medium text-gray-700">Number of Players</label>
                <input
                  type="number"
                  name="players"
                  id="players"
                  min="1"
                  value={formData.players}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Booking...' : 'Book Now'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
