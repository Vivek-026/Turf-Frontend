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
  console.log(id);

  const [formData, setFormData] = useState({
    date: '',
    slot: '', // e.g. '09:00'
    hours: 1,
    sport: '',
    court: '',
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [maxHours, setMaxHours] = useState(5);
  const user = useSelector((state) => state.auth.user);


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
    let dateSlots = [];
  
    // check date match
    if (selectedTurf?.availableSlots && selectedDate) {
      dateSlots = selectedTurf.availableSlots.filter(slot =>
        new Date(slot.date).toDateString() === new Date(selectedDate).toDateString()
      );
    }
  
    // Fallback dummy slots: every hour from 6 AM to 11 PM
    if ((!selectedTurf?.availableSlots || selectedTurf.availableSlots.length === 0 || dateSlots.length === 0) && selectedDate) {
      const slots = [];
      for (let hour = 6; hour < 23; hour++) {
        const start = `${hour.toString().padStart(2, '0')}:00`;
        const end = `${(hour + 1).toString().padStart(2, '0')}:00`;
        slots.push({ date: selectedDate, startTime: start, endTime: end });
      }
      dateSlots = slots;
    }
  
    setAvailableSlots(dateSlots);
  }, [selectedTurf, selectedDate]);
  

  // Update maxHours when slot or slots list changes
  useEffect(() => {
    if (!formData.slot || !selectedDate || availableSlots.length === 0) {
      setMaxHours(1);
      return;
    }
  
    const slotsSorted = [...availableSlots].sort((a, b) =>
      a.startTime.localeCompare(b.startTime)
    );
  
    const index = slotsSorted.findIndex(slot => slot.startTime === formData.slot);
    if (index === -1) {
      setMaxHours(1);
      return;
    }
  
    let count = 1;
    let currentEnd = new Date(`${selectedDate}T${slotsSorted[index].endTime}`);
  
    for (let i = index + 1; i < slotsSorted.length; i++) {
      const nextStart = new Date(`${selectedDate}T${slotsSorted[i].startTime}`);
      if (nextStart.getTime() === currentEnd.getTime()) {
        count++;
        currentEnd = new Date(`${selectedDate}T${slotsSorted[i].endTime}`);
      } else {
        break;
      }
    }
  
    setMaxHours(count);
    setFormData(prev => ({
      ...prev,
      hours: Math.min(prev.hours, count),
    }));
  }, [formData.slot, selectedDate, availableSlots]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') {
      setSelectedDate(value);
      setFormData(prev => ({
        ...prev,
        date: value,
        slot: '',
        hours: 1,
      }));
    } else if (name === 'slot') {
      setFormData(prev => ({
        ...prev,
        slot: value,
        hours: 1,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const handleHourChange = (delta) => {
    setFormData(prev => {
      const newHours = Math.max(1, Math.min(prev.hours + delta, maxHours));
      return { ...prev, hours: newHours };
    });
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
    if (!formData.date || !formData.slot || !formData.sport || !formData.court) {
      toast.error('Please fill all required fields');
      return;
    }
    
    // Validate slot availability
    const slotObj = availableSlots.find(slot => slot.startTime === formData.slot);
    if (!slotObj) {
      toast.error('Selected time slot is not available');
      return;
    }
    
    // 🟢 Add this line to get the day from the selected date
    const day = new Date(formData.date).toLocaleString('en-US', { weekday: 'long' });
    
    // Calculate end time
    const start = new Date(`${formData.date}T${formData.slot}`);
    const end = new Date(start.getTime() + formData.hours * 60 * 60 * 1000);
    const slotEnd = new Date(`${formData.date}T${slotObj.endTime}`);
    console.log(formData,day,start,end,slotEnd,user.id,id);
    if (end > slotEnd) {
      toast.error('Selected duration exceeds available slot');
      return;
    }
  
    createBooking({
      ...formData, 
      id,
      userId: user.id,
      day, 
      startTime: formData.slot,
      endTime: end.toTimeString().slice(0, 5),
    });
  };
  

  // Date picker min/max
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const maxDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Sports and courts
  const sports = selectedTurf?.sportTypes || [];
  const courts = selectedTurf?.courts || [];

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
                    min={minDate}
                    max={maxDate}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Sport Dropdown */}
              <div>
                <label htmlFor="sport" className="block text-sm font-medium text-gray-700">Select Sport</label>
                <select
                  name="sport"
                  id="sport"
                  value={formData.sport}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Sport</option>
                  {sports.map((sport) => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>

              {/* Court Dropdown */}
              <div>
                <label htmlFor="court" className="block text-sm font-medium text-gray-700">Select Court</label>
                <select
                  name="court"
                  id="court"
                  value={formData.court}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Court</option>
                  <option value="court1">Court 1</option>
                  {courts.length > 0 ? courts.map((court, idx) => (
                    <option key={court._id || idx} value={court.name || court}>{court.name || court}</option>
                  )) : <option disabled>No courts available</option>}
                </select>
              </div>

              {/* Time Slot Dropdown */}
              <div>
                <label htmlFor="slot" className="block text-sm font-medium text-gray-700">Select Start Time</label>
                <select
                  name="slot"
                  id="slot"
                  value={formData.slot}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  disabled={availableSlots.length === 0}
                >
                  <option value="">Select Time Slot</option>
                  {availableSlots.map((slot, idx) => (
                    <option key={idx} value={slot.startTime}>
                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hour Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Hours</label>
                <div className="flex items-center gap-2 mt-1">
                  <button type="button" onClick={() => handleHourChange(-1)} className="px-3 py-1 bg-gray-200 rounded text-lg font-bold">-</button>
                  <span className="px-4 py-1 border rounded bg-white">{formData.hours}</span>
                  <button type="button" onClick={() => handleHourChange(1)} className="px-3 py-1 bg-gray-200 rounded text-lg font-bold">+</button>
                  <span className="text-xs text-gray-500 ml-2">(Max {maxHours} hr{maxHours > 1 ? 's' : ''})</span>
                </div>
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
