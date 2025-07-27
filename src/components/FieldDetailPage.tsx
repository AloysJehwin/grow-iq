import React from 'react';

// ---- Field Detail Page Component ----
interface FieldDetailPageProps {
  field: {
    crop_name: string;
    field_id: string | number;
    soil_moisture_percent: number;
    growth_progress_percent: number;
    days_since_planting: number;
    expected_harvest_date: string;
    temperature_celsius: number;
    humidity_percent: number;
    timeline_instructions: string[];
    planting_date: string;
  };
  onBack: () => void;
}

function FieldDetailPage({ field, onBack }: FieldDetailPageProps) {
  // Color helpers
  function waterColor(val: number) {
    return val < 40
      ? "bg-red-400"
      : val < 60
      ? "bg-yellow-300"
      : "bg-emerald-400";
  }
  
  function tempColor(val: number) {
    if (val < 15) return "text-sky-700";
    if (val > 33) return "text-red-400";
    return "text-emerald-700";
  }
  
  function humidityColor(val: number) {
    return val > 80 ? "bg-blue-200" : "bg-emerald-200";
  }

  const lowMoisture = field.soil_moisture_percent < 40;
  const daysToHarvest = Math.ceil((new Date(field.expected_harvest_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-blue-100 py-8">
      {/* Header with Back Button */}
      <header className="mx-auto max-w-4xl mb-8 px-6">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-semibold transition-colors"
        >
          <span className="text-xl">←</span>
          <span>Back to Dashboard</span>
        </button>
        
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{getCropEmoji(field.crop_name)}</span>
          <div>
            <h1 className="text-4xl font-bold text-emerald-700 mb-2">
              {field.crop_name} Field
            </h1>
            <p className="text-xl text-gray-700">
              Field ID: <span className="font-semibold">{field.field_id}</span>
            </p>
            {lowMoisture && (
              <div className="mt-2 inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                <span>⚠️</span>
                <span>Low Moisture Alert!</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Growth Progress Section */}
        <section className="bg-white/90 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">Growth Progress</h2>
          <div className="mb-4">
            <div className="w-full bg-emerald-100 rounded-full h-8 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-emerald-400 to-emerald-600 transition-all flex items-center justify-end pr-4"
                style={{ width: `${Math.min(field.growth_progress_percent, 100)}%` }}
              >
                <span className="text-white font-bold text-sm">
                  {field.growth_progress_percent}%
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-emerald-700">{field.days_since_planting}</p>
              <p className="text-sm text-gray-600">Days Since Planting</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">{daysToHarvest}</p>
              <p className="text-sm text-gray-600">Days to Harvest</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-yellow-700">{formatDate(field.expected_harvest_date)}</p>
              <p className="text-sm text-gray-600">Expected Harvest</p>
            </div>
          </div>
        </section>

        {/* Environmental Conditions */}
        <section className="bg-white/90 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">Environmental Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`mx-auto w-24 h-24 rounded-full ${waterColor(field.soil_moisture_percent)} flex items-center justify-center text-white font-bold text-xl mb-2`}>
                {field.soil_moisture_percent}%
              </div>
              <h3 className="font-semibold text-gray-800">Soil Moisture</h3>
              <p className="text-sm text-gray-600 mt-1">
                {field.soil_moisture_percent < 40 ? 'Low - Needs irrigation' : 
                 field.soil_moisture_percent < 60 ? 'Moderate - Monitor closely' : 
                 'Good - Adequate moisture'}
              </p>
            </div>
            
            <div className="text-center">
              <div className={`mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xl mb-2 ${tempColor(field.temperature_celsius)}`}>
                {field.temperature_celsius}°C
              </div>
              <h3 className="font-semibold text-gray-800">Temperature</h3>
              <p className="text-sm text-gray-600 mt-1">
                {field.temperature_celsius < 15 ? 'Cool temperature' : 
                 field.temperature_celsius > 33 ? 'High temperature' : 
                 'Optimal temperature range'}
              </p>
            </div>
            
            <div className="text-center">
              <div className={`mx-auto w-24 h-24 rounded-full ${humidityColor(field.humidity_percent)} flex items-center justify-center font-bold text-xl mb-2`}>
                {field.humidity_percent}%
              </div>
              <h3 className="font-semibold text-gray-800">Humidity</h3>
              <p className="text-sm text-gray-600 mt-1">
                {field.humidity_percent > 80 ? 'High humidity' : 'Normal humidity levels'}
              </p>
            </div>
          </div>
        </section>

        {/* Timeline & Care Instructions */}
        <section className="bg-white/90 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">Care Timeline & Instructions</h2>
          <div className="space-y-4">
            {field.timeline_instructions.map((instruction, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{instruction}</p>
                  {index === 0 && (
                    <p className="text-sm text-emerald-600 mt-1">← Current Priority</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Dates */}
        <section className="bg-white/90 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">Important Dates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🌱 Planting Date</h3>
              <p className="text-lg font-bold text-green-700">{formatDate(field.planting_date)}</p>
              <p className="text-sm text-gray-600">{field.days_since_planting} days ago</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-800 mb-2">🌾 Expected Harvest</h3>
              <p className="text-lg font-bold text-amber-700">{formatDate(field.expected_harvest_date)}</p>
              <p className="text-sm text-gray-600">In {daysToHarvest} days</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Helper Functions
function formatDate(str: string) {
  try {
    const opts: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Date(str).toLocaleDateString(undefined, opts);
  } catch (error) {
    return str;
  }
}

function getCropEmoji(crop: string) {
  const em: Record<string, string> = {
    Wheat: "🌾",
    Rice: "🌱",
    Maize: "🌽",
    Barley: "🌾",
    Soybean: "🫘",
    Cotton: "🧵",
    Sugarcane: "🥃",
    Potato: "🥔",
    Tomato: "🍅",
    Onion: "🧅",
    Chilli: "🌶️",
    Peas: "🥗",
    Lentils: "🟤",
    Millet: "🍚",
    Groundnut: "🥜",
  };
  return em[crop] ?? "🌿";
}

export default FieldDetailPage;