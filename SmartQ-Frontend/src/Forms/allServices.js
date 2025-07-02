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
import homeDecor from "../assets/homedecor.png";

export const allServices = [
  { name: "Clinic Appointments", img: clinic, path: "/clinic-appointments", type: "clinic", price: 300 },
  { name: "Salon Bookings", img: salon, path: "/salon-bookings", type: "salon", price: 200 },
  { name: "AC & Electronic Repair", img: repair, path: "/ac-repair", type: "repair", price: 500 },
  { name: "Coaching Sessions", img: coaching, path: "/coaching-sessions", type: "coaching", price: 400 },
  { name: "Photography Services", img: photography, path: "/photography", type: "photography", price: 1000 },
  { name: "Event Planning", img: eventPlanning, path: "/event-planning", type: "events", price: 1500 },
  { name: "Driving School", img: drivingSchool, path: "/driving-school", type: "driving", price: 800 },
  { name: "Home Cleaning", img: homeCleaning, path: "/home-cleaning", type: "cleaning", price: 600 },
  { name: "Pet Care", img: petCare, path: "/pet-care", type: "petcare", price: 350 },
  { name: "Legal Advice", img: legalAdvice, path: "/legal-advice", type: "legal", price: 700 },
  { name: "Car Services", img: carServices, path: "/car-services", type: "carservice", price: 900 },
  { name: "Home Decor", img: homeDecor, path: "/home-decor", type: "homedecor", price: 1200 },
  { name: "Music Classes", img: musicClasses, path: "/music-classes", type: "music", price: 450 },
  { name: "Yoga Sessions", img: yogaSessions, path: "/yoga-sessions", type: "yoga", price: 300 },
  { name: "Therapy Services", img: therapy, path: "/therapy", type: "therapy", price: 650 },
];
