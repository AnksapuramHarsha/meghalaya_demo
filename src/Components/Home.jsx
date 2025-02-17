

export default function MeghalayaHealthcare() {
  return (
    <div className="mt-20 min-h-screen bg-gradient-to-r from-lightgreen-400 to-lightgreen-200 p-6 flex justify-center items-center">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-lg">Meghalaya Health Welfare</h1>
        <p className="text-lg text-gray-700 mb-8 shadow-md p-4 rounded-lg  bg-opacity-80">
          Meghalaya is committed to providing quality healthcare to its citizens, with a focus on
          accessibility, affordability, and innovation. The state has a robust healthcare
          infrastructure that includes government hospitals, community health centers, and private
          clinics to ensure comprehensive medical care.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Hospital Card */}
          <div className="shadow-xl p-6 bg-lightgreen-100 rounded-2xl text-center transform hover:scale-105 transition duration-300">
            <div className="text-green-700 text-5xl mb-3">🏥</div>
            <h3 className="text-2xl font-semibold text-green-900">Advanced Hospitals</h3>
            <p className="text-green-800 text-md">
              Meghalaya has well-equipped hospitals with modern facilities to ensure quality
              treatment.
            </p>
          </div>

          {/* Community Healthcare Card */}
          <div className="shadow-xl p-6 bg-lightgreen-200 rounded-2xl text-center transform hover:scale-105 transition duration-300">
            <div className="text-green-800 text-5xl mb-3">❤️</div>
            <h3 className="text-2xl font-semibold text-green-900">Community Healthcare</h3>
            <p className="text-green-800 text-md">
              Primary health centers and rural healthcare programs ensure medical services reach
              every citizen.
            </p>
          </div>

          {/* Emergency Services Card */}
          <div className="shadow-xl p-6 bg-lightgreen-300 rounded-2xl text-center transform hover:scale-105 transition duration-300">
            <div className="text-green-900 text-5xl mb-3">🚑</div>
            <h3 className="text-2xl font-semibold text-green-900">Emergency Services</h3>
            <p className="text-green-800 text-md">
              24/7 ambulance and emergency response systems are in place for quick medical
              assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
