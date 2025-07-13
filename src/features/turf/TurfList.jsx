import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import TurfCard from './components/TurfCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTurfs } from '../../store/slices/turfSlice';

const TurfList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { turfs, loading, error } = useSelector((state) => state.turfs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    dispatch(fetchTurfs());
  }, [dispatch]);

  // Extract unique sports
  const sports = Array.from(
    new Set(turfs?.flatMap((turf) => turf.sportTypes || []))
  );

  // Extract unique locations
  const locations = Array.from(
    new Map(
      (turfs ?? []).map((turf) => {
        const loc = turf.location;
        const locStr = `${loc.city}, ${loc.state}`;
        return [locStr, loc];
      })
    ).values()
  );

  // Filtered turfs
  const filteredTurfs =
    turfs?.filter((turf) => {
      const matchSport =
        selectedSport === '' ||
        turf.sportTypes?.includes(selectedSport);

      const matchLocation =
        selectedLocation === '' ||
        `${turf.location.city}, ${turf.location.state}` === selectedLocation;

      const matchName = turf.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchSport && matchLocation && matchName;
    }) ?? [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">{error}</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search turfs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Sport filter */}
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="flex-1 pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Sports</option>
          {sports.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>

        {/* Location filter */}
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="flex-1 pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Locations</option>
          {locations.map((location, index) => {
            const locStr = `${location.city}, ${location.state}`;
            return (
              <option
                key={index}
                value={locStr}
              >
                {locStr}
              </option>
            );
          })}
        </select>
      </div>

      {/* Turf cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTurfs.map((turf) => (
          <TurfCard key={turf._id} turf={turf} />
        ))}
      </div>
    </div>
  );
};

export default TurfList;
