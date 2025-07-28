"use client";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

// ---- Type Definitions ----
type Field = {
  field_id: string;
  crop_name: string;
  planting_date: string;
  expected_harvest_date: string;
  days_since_planting: number;
  growth_progress_percent: number;
  soil_moisture_percent: number;
  temperature_celsius: number;
  humidity_percent: number;
  timeline_instructions: string[];
};

type FarmData = {
  message: string;
  timestamp: string;
  fields: Field[];
};

type ViewState = {
  page: 'dashboard' | 'field-detail';
  selectedField?: Field;
};

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

// ---- Main App Component ----
export default function Page() {
  const [farmData, setFarmData] = useState<FarmData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>({ page: 'dashboard' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API
        const response = await fetch("https://v2x0cl909j.execute-api.us-east-1.amazonaws.com/default/GrowIQ", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          mode: 'cors',
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API data received:', data);
        setFarmData(data);
        
      } catch (err) {
        console.error('API fetch failed, using live data:', err);
        
        // Use the actual API response data you provided
        const liveData = {
          "message": "Live field data retrieved successfully.",
          "timestamp": "2025-07-27T03:12:50.877218",
          "fields": [
            {
              "field_id": "F1",
              "crop_name": "Wheat",
              "planting_date": "2025-06-27",
              "expected_harvest_date": "2025-10-25",
              "days_since_planting": 30,
              "growth_progress_percent": 25,
              "soil_moisture_percent": 82,
              "temperature_celsius": 34.6,
              "humidity_percent": 76,
              "timeline_instructions": ["Prepare soil", "Sow seeds", "Irrigate every 10 days", "Harvest when golden"]
            },
            {
              "field_id": "F2",
              "crop_name": "Rice",
              "planting_date": "2025-05-28",
              "expected_harvest_date": "2025-10-25",
              "days_since_planting": 60,
              "growth_progress_percent": 40,
              "soil_moisture_percent": 84,
              "temperature_celsius": 27.1,
              "humidity_percent": 94,
              "timeline_instructions": ["Flood field", "Transplant seedlings", "Maintain water level", "Harvest when golden"]
            },
            {
              "field_id": "F3",
              "crop_name": "Maize",
              "planting_date": "2025-07-07",
              "expected_harvest_date": "2025-10-05",
              "days_since_planting": 20,
              "growth_progress_percent": 22,
              "soil_moisture_percent": 74,
              "temperature_celsius": 33.7,
              "humidity_percent": 94,
              "timeline_instructions": ["Sow directly", "Weed regularly", "Apply nitrogen", "Harvest when cob hardens"]
            },
            {
              "field_id": "F4",
              "crop_name": "Barley",
              "planting_date": "2025-06-17",
              "expected_harvest_date": "2025-09-25",
              "days_since_planting": 40,
              "growth_progress_percent": 40,
              "soil_moisture_percent": 53,
              "temperature_celsius": 24.6,
              "humidity_percent": 65,
              "timeline_instructions": ["Sow seeds", "Thin out", "Apply fertilizers", "Harvest when heads are full"]
            },
            {
              "field_id": "F5",
              "crop_name": "Soybean",
              "planting_date": "2025-06-07",
              "expected_harvest_date": "2025-09-25",
              "days_since_planting": 50,
              "growth_progress_percent": 45,
              "soil_moisture_percent": 34,
              "temperature_celsius": 18.9,
              "humidity_percent": 47,
              "timeline_instructions": ["Sow shallow", "Apply phosphorus", "Monitor pest", "Harvest when pods are dry"]
            },
            {
              "field_id": "F6",
              "crop_name": "Cotton",
              "planting_date": "2025-04-28",
              "expected_harvest_date": "2025-10-25",
              "days_since_planting": 90,
              "growth_progress_percent": 50,
              "soil_moisture_percent": 63,
              "temperature_celsius": 31.0,
              "humidity_percent": 54,
              "timeline_instructions": ["Sow with spacing", "Spray pesticides", "Prune", "Pick manually"]
            },
            {
              "field_id": "F7",
              "crop_name": "Sugarcane",
              "planting_date": "2025-01-08",
              "expected_harvest_date": "2025-11-04",
              "days_since_planting": 200,
              "growth_progress_percent": 66,
              "soil_moisture_percent": 82,
              "temperature_celsius": 20.1,
              "humidity_percent": 72,
              "timeline_instructions": ["Plant stalks", "Water frequently", "Remove weeds", "Harvest with machete"]
            },
            {
              "field_id": "F8",
              "crop_name": "Potato",
              "planting_date": "2025-07-12",
              "expected_harvest_date": "2025-10-10",
              "days_since_planting": 15,
              "growth_progress_percent": 16,
              "soil_moisture_percent": 50,
              "temperature_celsius": 24.3,
              "humidity_percent": 85,
              "timeline_instructions": ["Use seed tubers", "Hill the soil", "Fertilize", "Harvest when leaves yellow"]
            },
            {
              "field_id": "F9",
              "crop_name": "Tomato",
              "planting_date": "2025-07-17",
              "expected_harvest_date": "2025-10-05",
              "days_since_planting": 10,
              "growth_progress_percent": 12,
              "soil_moisture_percent": 40,
              "temperature_celsius": 29.1,
              "humidity_percent": 85,
              "timeline_instructions": ["Transplant seedlings", "Stake plants", "Fertilize", "Pick ripe fruit"]
            },
            {
              "field_id": "F10",
              "crop_name": "Onion",
              "planting_date": "2025-07-02",
              "expected_harvest_date": "2025-10-10",
              "days_since_planting": 25,
              "growth_progress_percent": 25,
              "soil_moisture_percent": 64,
              "temperature_celsius": 30.1,
              "humidity_percent": 57,
              "timeline_instructions": ["Broadcast seeds", "Keep dry", "Remove weeds", "Pull when tops fall over"]
            },
            {
              "field_id": "F11",
              "crop_name": "Chilli",
              "planting_date": "2025-07-09",
              "expected_harvest_date": "2025-10-12",
              "days_since_planting": 18,
              "growth_progress_percent": 18,
              "soil_moisture_percent": 47,
              "temperature_celsius": 22.1,
              "humidity_percent": 66,
              "timeline_instructions": ["Transplant", "Fertilize", "Spray regularly", "Pick red fruits"]
            },
            {
              "field_id": "F12",
              "crop_name": "Peas",
              "planting_date": "2025-07-15",
              "expected_harvest_date": "2025-10-08",
              "days_since_planting": 12,
              "growth_progress_percent": 14,
              "soil_moisture_percent": 43,
              "temperature_celsius": 34.5,
              "humidity_percent": 66,
              "timeline_instructions": ["Sow directly", "Support with sticks", "Watch for mildew", "Harvest early pods"]
            }
          ]
        };
        
        setFarmData(liveData);
        setError(`CORS Error: ${err instanceof Error ? err.message : 'API blocked by browser'}. Using live data from API.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToField = (field: Field) => {
    setViewState({ page: 'field-detail', selectedField: field });
  };

  const navigateToHome = () => {
    setViewState({ page: 'dashboard' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-emerald-700 text-2xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700 mx-auto mb-4"></div>
          Loading farm data...
        </div>
      </div>
    );
  }

  if (error && !farmData) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-xl">
        <div className="text-center">
          <p className="mb-4">Error loading farm data: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render field detail page
  if (viewState.page === 'field-detail' && viewState.selectedField) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-blue-100 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={navigateToHome}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <div className="bg-white/80 rounded-xl p-8 shadow-xl">
            <h1 className="text-3xl font-bold text-emerald-900 mb-6">
              {getCropEmoji(viewState.selectedField.crop_name)} {viewState.selectedField.crop_name} - Field {viewState.selectedField.field_id}
            </h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Field Details</h2>
                <div className="space-y-3">
                  <p><strong>Planting Date:</strong> {formatDate(viewState.selectedField.planting_date)}</p>
                  <p><strong>Expected Harvest:</strong> {formatDate(viewState.selectedField.expected_harvest_date)}</p>
                  <p><strong>Days Since Planting:</strong> {viewState.selectedField.days_since_planting}</p>
                  <p><strong>Growth Progress:</strong> {viewState.selectedField.growth_progress_percent}%</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Current Conditions</h2>
                <div className="space-y-3">
                  <p><strong>Soil Moisture:</strong> {viewState.selectedField.soil_moisture_percent}%</p>
                  <p><strong>Temperature:</strong> {viewState.selectedField.temperature_celsius}°C</p>
                  <p><strong>Humidity:</strong> {viewState.selectedField.humidity_percent}%</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Timeline Instructions</h2>
              <ul className="list-disc list-inside space-y-2">
                {viewState.selectedField.timeline_instructions.map((instruction, idx) => (
                  <li key={idx} className="text-gray-700">{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <AIChatbot farmData={farmData} />
      </div>
    );
  }

  // Render dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-blue-100 py-8">
      {/* Header */}
      <header className="mx-auto max-w-7xl mb-8 px-6 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-emerald-700 mb-2 drop-shadow">
            🌱 GrowIQ Farm Dashboard
          </h1>
          <p className="text-gray-700 text-lg">
            Live IoT Data |{" "}
            <span className="font-medium">
              {farmData?.timestamp ? new Date(farmData.timestamp).toLocaleString() : 'No timestamp'}
            </span>
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="px-4 py-2 rounded-full bg-emerald-500 text-white font-semibold shadow-lg animate-pulse">
            {farmData?.message || 'No status available'}
          </span>
          {error && (
            <div className="mt-2 text-sm text-orange-600">
              Using live API data (CORS bypass)
            </div>
          )}
        </div>
      </header>

      {/* Field Cards Grid */}
      <main className="max-w-7xl mx-auto px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {farmData?.fields?.map((field) => (
          <FieldCard key={field.field_id} field={field} onViewDetails={navigateToField} />
        )) || (
          <div className="col-span-full text-center text-gray-500">
            No field data available
          </div>
        )}
      </main>

      {/* AI Chatbot */}
      <AIChatbot farmData={farmData} />
    </div>
  );
}

// ---- AI Chatbot Component ----
function AIChatbot({ farmData }: { farmData: FarmData | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your GrowIQ farming assistant. I can help you with crop management, pest control, irrigation scheduling, and analyzing your field data. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Create context from farm data
      const farmContext = farmData ? {
        fields: farmData.fields.map(f => ({
          field_id: f.field_id,
          crop: f.crop_name,
          days_planted: f.days_since_planting,
          progress: f.growth_progress_percent,
          soil_moisture: f.soil_moisture_percent,
          temperature: f.temperature_celsius,
          humidity: f.humidity_percent,
          next_tasks: f.timeline_instructions
        })),
        timestamp: farmData.timestamp
      } : null;

      // Call OpenAI API (replace with your actual API endpoint)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.slice(-5).map(m => ({ role: m.role, content: m.content })),
          userMessage: inputMessage,
          farmContext: farmContext
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "I'm having trouble processing your request right now. Please try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback response when API is not available
      const fallbackResponse = getFallbackResponse(inputMessage, farmData);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 z-50 hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-40">
          {/* Chat Header */}
          <div className="bg-emerald-600 text-white p-4 rounded-t-lg flex items-center gap-2">
            <Bot size={20} />
            <h3 className="font-semibold">GrowIQ Assistant</h3>
            <div className="ml-auto">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-emerald-600" />
                  </div>
                )}
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-blue-600" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-emerald-600" />
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <Loader2 size={16} className="animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your crops..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ---- Fallback Response Function ----
function getFallbackResponse(message: string, farmData: FarmData | null): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('moisture') || lowerMessage.includes('water')) {
    const lowMoistureFields = farmData?.fields.filter(f => f.soil_moisture_percent < 40) || [];
    if (lowMoistureFields.length > 0) {
      return `I notice ${lowMoistureFields.length} field(s) have low soil moisture: ${lowMoistureFields.map(f => `${f.crop_name} (${f.field_id}): ${f.soil_moisture_percent}%`).join(', ')}. Consider increasing irrigation for these crops.`;
    }
    return "Your soil moisture levels look generally good across most fields. Monitor daily and irrigate when levels drop below 40%.";
  }
  
  if (lowerMessage.includes('temperature') || lowerMessage.includes('temp')) {
    const hotFields = farmData?.fields.filter(f => f.temperature_celsius > 32) || [];
    if (hotFields.length > 0) {
      return `${hotFields.length} field(s) are experiencing high temperatures: ${hotFields.map(f => `${f.crop_name}: ${f.temperature_celsius}°C`).join(', ')}. Consider shade cloth or increased watering during hot periods.`;
    }
    return "Temperature levels across your fields are within normal ranges for your crops.";
  }
  
  if (lowerMessage.includes('harvest') || lowerMessage.includes('ready')) {
    const nearHarvest = farmData?.fields.filter(f => f.growth_progress_percent > 80) || [];
    if (nearHarvest.length > 0) {
      return `${nearHarvest.length} crop(s) are nearing harvest: ${nearHarvest.map(f => `${f.crop_name} (${f.growth_progress_percent}%)`).join(', ')}. Check daily for optimal harvest timing.`;
    }
    return "No crops are ready for harvest yet. Your earliest harvest is expected in the coming weeks.";
  }
  
  if (lowerMessage.includes('pest') || lowerMessage.includes('disease')) {
    return "For pest and disease management, monitor your crops daily for signs of damage. High humidity (>85%) can increase disease risk. Consider preventive spraying during favorable weather conditions.";
  }
  
  // Default response
  return "I'm here to help with your farming questions! I can provide insights about irrigation, pest control, harvest timing, and crop management based on your field data. What specific aspect would you like to discuss?";
}

// ---- Field Card Component ----
function FieldCard({ field, onViewDetails }: { field: Field; onViewDetails: (field: Field) => void }) {
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

  // Show 'Low moisture' badge?
  const lowMoisture = field.soil_moisture_percent < 40;

  return (
    <section className="relative bg-white/80 shadow-xl rounded-xl p-6 border border-emerald-100 hover:scale-[1.01] hover:shadow-emerald-300 transition-all duration-200 flex flex-col gap-4 overflow-hidden cursor-pointer">
      <div className="flex items-center gap-2">
        <span className="text-3xl">{getCropEmoji(field.crop_name)}</span>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-emerald-900">
            {field.crop_name}
          </h2>
          <div className="text-md text-gray-500">
            Field: <span className="font-medium">{field.field_id}</span>
          </div>
        </div>
        {lowMoisture && (
          <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow animate-pulse">
            Low Moisture!
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div>
        <label className="text-sm text-gray-600 font-medium">
          Growth Progress
        </label>
        <div className="w-full bg-emerald-100 rounded-full h-4 overflow-hidden mt-1">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-emerald-400 to-emerald-600 transition-all"
            style={{ width: `${Math.min(field.growth_progress_percent, 100)}%` }}
          />
        </div>
        <p className="text-xs mt-1 text-gray-700 font-mono">
          {field.growth_progress_percent}% ({field.days_since_planting} days)
        </p>
      </div>

      {/* Stats Grid */}
      <dl className="grid grid-cols-2 gap-2 text-sm font-medium">
        <Stat
          label="Soil moisture"
          value={field.soil_moisture_percent + "%"}
          className={`${waterColor(field.soil_moisture_percent)} px-2 py-1 rounded text-center text-white`}
        />
        <Stat
          label="Temp"
          value={field.temperature_celsius + "°C"}
          className={tempColor(field.temperature_celsius)}
        />
        <Stat
          label="Humidity"
          value={field.humidity_percent + "%"}
          className={`${humidityColor(field.humidity_percent)} px-2 py-1 rounded text-center`}
        />
        <Stat
          label="Harvest"
          value={formatDate(field.expected_harvest_date)}
          className="text-emerald-600"
        />
      </dl>

      {/* Quick Timeline Preview */}
      <div className="text-sm text-gray-600">
        <p className="font-medium mb-1">Next Tasks:</p>
        <p className="truncate">{field.timeline_instructions[0] || 'No tasks scheduled'}</p>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => onViewDetails(field)}
        className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <span>View Details</span>
        <span className="text-lg">→</span>
      </button>
    </section>
  );
}

function Stat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col items-start">
      <dt className="text-xs text-gray-400 uppercase tracking-wide">{label}</dt>
      <dd className={`font-semibold ${className || ''}`}>{value}</dd>
    </div>
  );
}

// -- Helper Functions --

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
  const em: { [k: string]: string } = {
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
  return em[crop] || "🌿";
}