
export const MOCK_USERS = [
  {
    id: 1,
    name: "Ansh Mishra",
    email: "rahul@example.com",
    phone: "9876543210",
    password: "password123", // In real app, this would be hashed
    userType: "user",
    walletBalance: 1500,
    joinedDate: "2023-01-15T10:30:00Z",
    totalRides: 12,
    averageRating: 4.8,
    profileImage: null
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "8765432109",
    password: "password123",
    userType: "user",
    walletBalance: 2500,
    joinedDate: "2023-02-20T14:45:00Z",
    totalRides: 8,
    averageRating: 4.9,
    profileImage: null
  }
];


export const MOCK_DRIVERS = [
  {
    id: 101,
    name: "Raj Kumar",
    email: "raj.driver@example.com",
    phone: "7654321098",
    password: "driver123",
    userType: "driver",
    vehicle: {
      type: "Sedan",
      model: "Hyundai i10",
      color: "White",
      plateNumber: "DL 04 AB 1234",
      year: 2020
    },
    status: "available", // available | busy | offline
    currentLocation: {
      address: "Dwarka, Delhi",
      coordinates: [28.5920, 77.0423] // [lat, lng]
    },
    rating: 4.8,
    totalRides: 245,
    totalEarnings: 125000,
    joinedDate: "2022-03-10T09:15:00Z",
    isVerified: true,
    profileImage: null
  },
  {
    id: 102,
    name: "Anil Singh",
    email: "anil.driver@example.com",
    phone: "6543210987",
    password: "driver123",
    userType: "driver",
    vehicle: {
      type: "Hatchback",
      model: "Maruti Swift",
      color: "Silver",
      plateNumber: "MH 01 XY 5678",
      year: 2019
    },
    status: "available",
    currentLocation: {
      address: "Andheri, Mumbai",
      coordinates: [19.0760, 72.8777]
    },
    rating: 4.6,
    totalRides: 189,
    totalEarnings: 98000,
    joinedDate: "2022-05-22T11:30:00Z",
    isVerified: true,
    profileImage: null
  },
  {
    id: 103,
    name: "Sanjay Verma",
    email: "sanjay.driver@example.com",
    phone: "9432109876",
    password: "driver123",
    userType: "driver",
    vehicle: {
      type: "SUV",
      model: "Toyota Innova",
      color: "Black",
      plateNumber: "KA 05 CD 7890",
      year: 2021
    },
    status: "busy", // Currently on a ride
    currentLocation: {
      address: "Indiranagar, Bangalore",
      coordinates: [12.9784, 77.6408]
    },
    rating: 4.9,
    totalRides: 312,
    totalEarnings: 185000,
    joinedDate: "2021-11-05T08:20:00Z",
    isVerified: true,
    profileImage: null
  }
];

// Mock Rides Data (Initial)
export const INITIAL_RIDES = [
  {
    id: "RIDE001",
    userId: 1, // Rahul Sharma
    driverId: null, // Not assigned yet
    pickup: {
      address: "Connaught Place, New Delhi",
      coordinates: [28.6329, 77.2195]
    },
    drop: {
      address: "Noida Sector 62, Noida",
      coordinates: [28.6274, 77.3620]
    },
    status: "requested", // requested | accepted | started | completed | paid | cancelled
    fare: 350,
    distance: "15.2 km",
    estimatedDuration: "45 min",
    rideType: "sedan", // auto | mini | sedan | suv
    requestedAt: "2024-01-29T10:30:00Z",
    acceptedAt: null,
    startedAt: null,
    completedAt: null,
    paidAt: null,
    paymentMethod: null, // cash | upi | card | wallet
    cancellationReason: null,
    cancelledBy: null, // user | driver
    userRating: null,
    driverRating: null,
    userReview: null,
    driverReview: null
  },
  {
    id: "RIDE002",
    userId: 2, // Priya Patel
    driverId: 101, // Raj Kumar
    pickup: {
      address: "Marine Drive, Mumbai",
      coordinates: [19.0760, 72.8777]
    },
    drop: {
      address: "Bandra West, Mumbai",
      coordinates: [19.0550, 72.8400]
    },
    status: "accepted",
    fare: 280,
    distance: "8.5 km",
    estimatedDuration: "25 min",
    rideType: "sedan",
    requestedAt: "2024-01-29T09:15:00Z",
    acceptedAt: "2024-01-29T09:18:00Z",
    startedAt: null,
    completedAt: null,
    paidAt: null,
    paymentMethod: null,
    cancellationReason: null,
    cancelledBy: null,
    userRating: null,
    driverRating: null,
    userReview: null,
    driverReview: null
  },
  {
    id: "RIDE003",
    userId: 1, // Rahul Sharma
    driverId: 103, // Sanjay Verma
    pickup: {
      address: "MG Road, Bangalore",
      coordinates: [12.9758, 77.6089]
    },
    drop: {
      address: "Electronic City, Bangalore",
      coordinates: [12.8456, 77.6631]
    },
    status: "started",
    fare: 420,
    distance: "22.3 km",
    estimatedDuration: "55 min",
    rideType: "suv",
    requestedAt: "2024-01-29T08:00:00Z",
    acceptedAt: "2024-01-29T08:05:00Z",
    startedAt: "2024-01-29T08:15:00Z",
    completedAt: null,
    paidAt: null,
    paymentMethod: null,
    cancellationReason: null,
    cancelledBy: null,
    userRating: null,
    driverRating: null,
    userReview: null,
    driverReview: null
  },
  {
    id: "RIDE004",
    userId: 2, // Priya Patel
    driverId: 102, // Anil Singh
    pickup: {
      address: "Hauz Khas, Delhi",
      coordinates: [28.5480, 77.1921]
    },
    drop: {
      address: "Gurugram Sector 29",
      coordinates: [28.4926, 77.0783]
    },
    status: "completed",
    fare: 310,
    distance: "18.7 km",
    estimatedDuration: "40 min",
    rideType: "sedan",
    requestedAt: "2024-01-28T18:30:00Z",
    acceptedAt: "2024-01-28T18:32:00Z",
    startedAt: "2024-01-28T18:40:00Z",
    completedAt: "2024-01-28T19:20:00Z",
    paidAt: null, // Not paid yet
    paymentMethod: null,
    cancellationReason: null,
    cancelledBy: null,
    userRating: 5,
    driverRating: 4,
    userReview: "Good ride, comfortable car",
    driverReview: "Punctual passenger"
  },
  {
    id: "RIDE005",
    userId: 1, // Rahul Sharma
    driverId: 101, // Raj Kumar
    pickup: {
      address: "Koramangala, Bangalore",
      coordinates: [12.9279, 77.6271]
    },
    drop: {
      address: "Indiranagar, Bangalore",
      coordinates: [12.9784, 77.6408]
    },
    status: "paid",
    fare: 180,
    distance: "6.2 km",
    estimatedDuration: "20 min",
    rideType: "mini",
    requestedAt: "2024-01-28T16:00:00Z",
    acceptedAt: "2024-01-28T16:02:00Z",
    startedAt: "2024-01-28T16:10:00Z",
    completedAt: "2024-01-28T16:30:00Z",
    paidAt: "2024-01-28T16:35:00Z",
    paymentMethod: "upi",
    cancellationReason: null,
    cancelledBy: null,
    userRating: 5,
    driverRating: 5,
    userReview: "Excellent service!",
    driverReview: "Very polite passenger"
  },
  {
    id: "RIDE006",
    userId: 2, // Priya Patel
    driverId: null,
    pickup: {
      address: "South Extension, Delhi",
      coordinates: [28.5678, 77.2241]
    },
    drop: {
      address: "Rajouri Garden, Delhi",
      coordinates: [28.6473, 77.1216]
    },
    status: "cancelled",
    fare: 220,
    distance: "12.5 km",
    estimatedDuration: "35 min",
    rideType: "sedan",
    requestedAt: "2024-01-28T14:30:00Z",
    acceptedAt: null,
    startedAt: null,
    completedAt: null,
    paidAt: null,
    paymentMethod: null,
    cancellationReason: "Driver asked me to cancel",
    cancelledBy: "user",
    userRating: null,
    driverRating: null,
    userReview: null,
    driverReview: null
  }
];

// Ride Status Constants
export const RIDE_STATUS = {
  REQUESTED: "requested",
  ACCEPTED: "accepted",
  STARTED: "started",
  COMPLETED: "completed",
  PAID: "paid",
  CANCELLED: "cancelled"
};

// User Types
export const USER_TYPES = {
  USER: "user",
  DRIVER: "driver",
  ADMIN: "admin"
};

// Payment Methods
export const PAYMENT_METHODS = {
  CASH: "cash",
  UPI: "upi",
  CARD: "card",
  WALLET: "wallet"
};

// Ride Types with Icons and Multipliers
export const RIDE_TYPES = {
  auto: {
    name: "Auto",
    icon: "🛺",
    multiplier: 0.8,
    baseFare: 25,
    description: "Budget friendly"
  },
  mini: {
    name: "Mini",
    icon: "🚗",
    multiplier: 1.0,
    baseFare: 30,
    description: "Affordable car"
  },
  sedan: {
    name: "Sedan",
    icon: "🚘",
    multiplier: 1.5,
    baseFare: 40,
    description: "Comfort ride"
  },
  suv: {
    name: "SUV",
    icon: "🚙",
    multiplier: 2.0,
    baseFare: 50,
    description: "Spacious ride"
  }
};

// Fare Configuration (INR)
export const FARE_CONFIG = {
  BASE_FARE: 30,
  PER_KM_RATE: 12,
  MINIMUM_FARE: 50,
  WAITING_CHARGE_PER_MIN: 2,
  NIGHT_CHARGE_PERCENT: 20, // 10 PM to 6 AM
  PEAK_HOUR_MULTIPLIER: 1.2, // 8-10 AM, 5-8 PM
  GST_PERCENT: 5
};

// Cancellation Reasons
export const CANCELLATION_REASONS = [
  "Driver asked me to cancel",
  "My plans changed",
  "Driver didn't move",
  "Too many stops requested",
  "Price too high",
  "Found another ride",
  "Emergency",
  "Wait time too long",
  "Driver not found",
  "Other reason"
];

// Helper function to generate unique ride ID
export const generateRideId = () => {
  return `RIDE${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

// Helper function to get user by ID
export const getUserById = (id) => {
  return MOCK_USERS.find(user => user.id === id);
};

// Helper function to get driver by ID
export const getDriverById = (id) => {
  return MOCK_DRIVERS.find(driver => driver.id === id);
};

// Helper function to get ride by ID
export const getRideById = (id, rides) => {
  return rides.find(ride => ride.id === id);
};

// Helper function to get rides by user ID
export const getRidesByUserId = (userId, rides) => {
  return rides.filter(ride => ride.userId === userId);
};

// Helper function to get rides by driver ID
export const getRidesByDriverId = (driverId, rides) => {
  return rides.filter(ride => ride.driverId === driverId);
};

// Helper function to get available drivers
export const getAvailableDrivers = () => {
  return MOCK_DRIVERS.filter(driver => driver.status === "available");
};

// Helper function to get active ride for user
export const getActiveUserRide = (userId, rides) => {
  return rides.find(ride => 
    ride.userId === userId && 
    ["requested", "accepted", "started"].includes(ride.status)
  );
};

// Helper function to get active ride for driver
export const getActiveDriverRide = (driverId, rides) => {
  return rides.find(ride => 
    ride.driverId === driverId && 
    ["accepted", "started"].includes(ride.status)
  );
};

export default {
  MOCK_USERS,
  MOCK_DRIVERS,
  INITIAL_RIDES,
  RIDE_STATUS,
  USER_TYPES,
  PAYMENT_METHODS,
  RIDE_TYPES,
  FARE_CONFIG,
  CANCELLATION_REASONS,
  generateRideId,
  getUserById,
  getDriverById,
  getRideById,
  getRidesByUserId,
  getRidesByDriverId,
  getAvailableDrivers,
  getActiveUserRide,
  getActiveDriverRide
};