import React from "react";
import { Link } from "react-router-dom";

import clinic from "../assets/clinic.png";
import salon from "../assets/salon.png";
import repair from "../assets/repair.png";
import coaching from "../assets/coaching.png";
import photography from "../assets/photography.png";
import eventPlanning from "../assets/events.png";
import drivingSchool from "../assets/car.png";
import homeCleaning from "../assets/cleaning.png";
import petCare from "../assets/pet.png";
import legalAdvice from "../assets/legal.png";
import carServices from "../assets/carservice.png";
import musicClasses from "../assets/music.png";
import yogaSessions from "../assets/yoga.png";
import therapy from "../assets/therapy.png";
import HomeDecor from "../assets/homedecor.png";

const services = [
  { name: "Clinic Appointments", img: clinic, path: "/clinic-appointments", price: 300 },
  { name: "Salon Bookings", img: salon, path: "/salon-bookings", price: 200 },
  { name: "AC & Electronic Repair", img: repair, path: "/ac-repair", price: 500 },
  { name: "Coaching Sessions", img: coaching, path: "/coaching-sessions", price: 400 },
  { name: "Photography Services", img: photography, path: "/photography", price: 1000 },
  { name: "Event Planning", img: eventPlanning, path: "/event-planning", price: 1500 },
  { name: "Driving School", img: drivingSchool, path: "/driving-school", price: 800 },
  { name: "Home Cleaning", img: homeCleaning, path: "/home-cleaning", price: 600 },
  { name: "Pet Care", img: petCare, path: "/pet-care", price: 350 },
  { name: "Legal Advice", img: legalAdvice, path: "/legal-advice", price: 700 },
  { name: "Car Services", img: carServices, path: "/car-services", price: 900 },
  { name: "Home Decor", img: HomeDecor, path: "/home-decor", price: 1200 },
  { name: "Music Classes", img: musicClasses, path: "/music-classes", price: 450 },
  { name: "Yoga Sessions", img: yogaSessions, path: "/yoga-sessions", price: 300 },
  { name: "Therapy Services", img: therapy, path: "/therapy", price: 650 },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-10">Our Services</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {services.map((service, index) => (
          <Link
            key={index}
            to={service.path}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-xl transition hover:scale-105"
          >
            <div className="w-full h-40 flex items-center justify-center mb-4">
              <img
                src={service.img}
                alt={service.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold text-center">{service.name}</h2>
            <p className="text-center text-green-600 dark:text-green-400 mt-2 font-medium">
              ₹{service.price}
            </p>
          </Link>
        ))}
      </div>

      {/* Featured Services Section */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">✨ Featured Services</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Handpicked services for your everyday needs.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Trusted professionals and verified bookings.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Experience fast, easy, and reliable service.
        </p>
      </div>
    </div>
  );
};

export default Services;
