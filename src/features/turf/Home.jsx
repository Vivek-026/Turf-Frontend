import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  BoltIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  PlayIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Reset slide on component mount
    setCurrentSlide(0);
  }, []);
  const [isVisible, setIsVisible] = useState({});

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920",
      title: "Premium Football Turfs",
      subtitle: "Professional-grade pitches for your team"
    },
    {
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1920",
      title: "Cricket Grounds",
      subtitle: "Perfect wickets for every match"
    },
    {
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1920", 
      title: "Basketball Courts",
      subtitle: "Modern courts with premium facilities"
    }
  ];

  const features = [
    {
      icon: MapPinIcon,
      title: "Smart Location Search",
      description: "AI-powered search to find the perfect turf near you with real-time availability",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BoltIcon,
      title: "Multiple Sports",
      description: "Football, Cricket, Basketball, Tennis, Badminton and more sports facilities",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: ClockIcon,
      title: "Instant Booking",
      description: "Book in seconds with our streamlined process and get instant confirmation",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure Payments",
      description: "Safe and secure payment processing with multiple payment options",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: UserGroupIcon,
      title: "Team Management",
      description: "Organize your team, send invites, and manage group bookings effortlessly",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you with any queries",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Discover & Search",
      description: "Browse through hundreds of verified sports turfs with detailed photos and reviews",
      icon: MagnifyingGlassIcon
    },
    {
      number: "02", 
      title: "Select & Customize",
      description: "Choose your preferred time slot, duration, and add extra services like equipment rental",
      icon: CalendarDaysIcon
    },
    {
      number: "03",
      title: "Pay & Confirm",
      description: "Secure payment processing with instant booking confirmation and digital receipt",
      icon: CreditCardIcon
    },
    {
      number: "04",
      title: "Play & Enjoy",
      description: "Show up and play! Rate your experience and help others discover great turfs",
      icon: PlayIcon
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Team Captain",
      content: "SportTurf made organizing our weekend matches so much easier. The booking process is seamless!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Priya Patel",
      role: "Fitness Enthusiast", 
      content: "Love the variety of sports facilities available. Found the perfect badminton court near my home.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Arjun Kumar",
      role: "Sports Club Manager",
      content: "The team management features are fantastic. We can easily coordinate with all our members.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="animate-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);



  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
          ))}
        </div>

        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-2 mb-6">
                <SparklesIcon className="h-6 w-6 text-yellow-400" />
                <span className="text-yellow-400 font-medium text-lg">India's #1 Sports Booking Platform</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
                <span className="block">Find Your Perfect</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Sports Turf
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Discover and book premium sports turfs near you. Perfect for matches, training, and events. 
                Join thousands of athletes who trust SportTurf for their sporting needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => navigate('/turf')}
                  className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
                >
                  <MagnifyingGlassIcon className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Find Turf Now
                  <ChevronRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-md">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-300">Sports Venues</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50K+</div>
                  <div className="text-sm text-gray-300">Happy Players</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">25+</div>
                  <div className="text-sm text-gray-300">Cities</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="animate-features" className={`text-center mb-16 transition-all duration-1000 ${isVisible['animate-features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mb-4">
              Why Choose SportTurf?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of sports booking with our cutting-edge platform designed for athletes by athletes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden ${
                    isVisible['animate-features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`} />
                  
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced How It Works Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="animate-steps" className={`text-center mb-16 transition-all duration-1000 ${isVisible['animate-steps'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four simple steps to book your perfect sports venue and start playing
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className={`relative text-center group transition-all duration-700 ${
                      isVisible['animate-steps'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {/* Step number */}
                    <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                      {step.number}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    </div>
                    
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4 group-hover:bg-blue-50 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="animate-testimonials" className={`text-center mb-16 transition-all duration-1000 ${isVisible['animate-testimonials'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">What Players Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied athletes who love SportTurf</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
                  isVisible['animate-testimonials'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Play?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the SportTurf community today and discover amazing sports venues near you
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleNavigate('/register')}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Get Started Free
            </button>
            <button
              onClick={() => handleNavigate('/contact')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;