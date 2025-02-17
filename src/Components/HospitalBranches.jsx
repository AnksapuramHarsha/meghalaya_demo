import React from "react";

const branches = [
  {
    id: 1,
    name: "Sree Sai Medical Center",
    location: "Madhapur, Hyderabad",
    services: ["Cardiology", "Orthopedics", "Pediatrics"],
  },
  {
    id: 2,
    name: "Raj Hospital",
    location: "Ameerpet, Hyderabad",
    services: ["Emergency", "General Medicine", "Neurology"],
  },
  {
    id: 3,
    name: "Gurukrupa Healthcare",
    location: "Kukatpally, Hyderabad",
    services: ["Gynecology", "Obstetrics", "Ultrasound"],
  },
  {
    id: 4,
    name: "Sunshine Clinic",
    location: "Borabanda, Hyderabad",
    services: ["Dental Care", "Dermatology", "Physiotherapy"],
  },
  {
    id: 5,
    name: "LifeLine Hospital",
    location: "Hitech City, Hyderabad",
    services: ["Oncology", "Radiology", "Pathology"],
  },
  {
    id: 5,
    name: "SunClose Hospital",
    location: "Kondapur City, Hyderabad",
    services: ["Oncology", "Radiology", "Pathology"],
  },
];

export default function HospitalBranches() {
  return (
    <div className="mt-20 min-h-screen bg-gradient-to-r from-lightgreen-400 to-lightgreen-200 p-6 flex justify-center items-center">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-lg">Hospital Branches</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <div key={branch.id} className="shadow-xl p-6 bg-lightgreen-100 rounded-2xl text-center transform hover:scale-105 transition duration-300">
              <h2 className="text-2xl font-semibold text-green-900">{branch.name}</h2>
              <p className="text-green-800">{branch.location}</p>
              <h3 className="mt-2 font-semibold text-green-900">Services:</h3>
              <ul className="text-md text-green-800">
                {branch.services.map((service, index) => (
                  <li key={index}>• {service}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
