import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../context/LanguageContext';
import { 
  TELANGANA_PESTICIDE_SHOPS, 
  TELANGANA_DISTRICTS, 
  TelanganaPesticideShop 
} from '../data/telanganaPesticideShops';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Search, 
  Filter, 
  ShieldCheck, 
  Clock, 
  Star, 
  ExternalLink, 
  Crosshair, 
  Store, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Compass,
  AlertCircle,
  MessageCircle,
  Building2
} from 'lucide-react';

// Haversine formula to calculate distance in km between two GPS coordinates
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export const PesticideShopsMap: React.FC = () => {
  const { language } = useLanguage();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Telangana');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedShop, setSelectedShop] = useState<TelanganaPesticideShop | null>(TELANGANA_PESTICIDE_SHOPS[0]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Compute shops with distance if user location is known
  const processedShops = useMemo(() => {
    let list = TELANGANA_PESTICIDE_SHOPS.map((shop) => {
      const distance = userLocation
        ? calculateDistanceKm(userLocation.lat, userLocation.lng, shop.lat, shop.lng)
        : null;
      return { ...shop, distance };
    });

    // Filter by district
    if (selectedDistrict !== 'All Telangana') {
      list = list.filter((s) => s.district.toLowerCase().includes(selectedDistrict.toLowerCase()));
    }

    // Filter by category/type
    if (selectedType === 'organic') {
      list = list.filter((s) => s.type === 'organic_bio');
    } else if (selectedType === 'govt') {
      list = list.filter((s) => s.type === 'govt_center');
    } else if (selectedType === 'open') {
      list = list.filter((s) => s.isOpen);
    }

    // Filter by search query (name, town, remedies)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => 
        s.name.toLowerCase().includes(q) ||
        s.name_te.includes(q) ||
        s.name_hi.includes(q) ||
        s.townMandal.toLowerCase().includes(q) ||
        s.district.toLowerCase().includes(q) ||
        s.stockedRemedies.some((r) => r.toLowerCase().includes(q))
      );
    }

    // Sort by distance if GPS active, else by rating
    if (userLocation) {
      list.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedDistrict, selectedType, searchQuery, userLocation]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Telangana (Warangal/Karimnagar center ~ 17.8749, 78.1008)
    const map = L.map(mapContainerRef.current, {
      center: [17.8749, 79.1008],
      zoom: 7.5,
      scrollWheelZoom: false
    });

    // High quality OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    // Clean up on unmount
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers whenever filtered shops or selected shop changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing shop markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    processedShops.forEach((shop) => {
      const isSelected = selectedShop?.id === shop.id;

      // Custom SVG Marker Pin
      const pinColor = isSelected ? '#047857' : '#059669'; // Dark emerald vs emerald
      const borderColor = isSelected ? '#10b981' : '#ffffff';

      const customIcon = L.divIcon({
        className: 'custom-shop-pin',
        html: `
          <div style="position: relative; width: 36px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            ${isSelected ? '<span style="position: absolute; inset: -4px; border-radius: 50%; background: rgba(16,185,129,0.4); animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></span>' : ''}
            <svg width="34" height="42" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">
              <path d="M16 0C7.16344 0 0 7.16344 0 16C0 27 16 40 16 40C16 40 32 27 32 16C32 7.16344 24.8366 0 16 0Z" fill="${pinColor}" stroke="${borderColor}" stroke-width="2"/>
              <circle cx="16" cy="15" r="9" fill="white"/>
              <!-- Store Front Icon -->
              <path d="M11 14H21V19H11V14Z" fill="${pinColor}"/>
              <path d="M10 11L11 13H21L22 11H10Z" fill="${pinColor}"/>
            </svg>
          </div>
        `,
        iconSize: [36, 44],
        iconAnchor: [18, 42],
        popupAnchor: [0, -40]
      });

      const marker = L.marker([shop.lat, shop.lng], { icon: customIcon }).addTo(map);

      // Popup with shop information
      const popupHtml = `
        <div style="font-family: inherit; font-size: 12px; min-width: 220px; padding: 4px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="font-size: 10px; background: #ecfdf5; color: #065f46; font-weight: 800; padding: 2px 6px; border-radius: 9999px; border: 1px solid #a7f3d0;">
              ${shop.district}
            </span>
            <span style="font-size: 10px; color: #d97706; font-weight: 800;">
              ★ ${shop.rating}
            </span>
          </div>
          <h4 style="font-size: 13px; font-weight: 800; color: #0f172a; margin: 0 0 4px 0;">${shop.name}</h4>
          <p style="font-size: 11px; color: #475569; margin: 0 0 6px 0;">${shop.address}</p>
          <div style="display: flex; gap: 6px; margin-top: 6px;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: #059669; color: white; padding: 5px 8px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 11px;">
              Directions ➔
            </a>
            <a href="tel:${shop.phone}" style="background: #f1f5f9; color: #0f172a; padding: 5px 8px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 11px; border: 1px solid #cbd5e1;">
              Call
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setSelectedShop(shop);
      });

      markersRef.current[shop.id] = marker;
    });
  }, [processedShops, selectedShop]);

  // Center map on selected shop
  const handleSelectShop = (shop: TelanganaPesticideShop) => {
    setSelectedShop(shop);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([shop.lat, shop.lng], 14, { duration: 1.2 });
      const marker = markersRef.current[shop.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  // User GPS Geolocation handler
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        language === 'te' 
          ? 'మీ బ్రౌజర్‌లో GPS సదుపాయం అందుబాటులో లేదు' 
          : language === 'hi' 
          ? 'ब्राउज़र में GPS उपलब्ध नहीं है' 
          : 'Geolocation not supported by browser'
      );
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(coords);
        setIsLocating(false);

        const map = mapInstanceRef.current;
        if (map) {
          // Remove old user marker if any
          if (userMarkerRef.current) {
            userMarkerRef.current.remove();
          }

          const userIcon = L.divIcon({
            className: 'custom-user-gps',
            html: `
              <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                <span style="position: absolute; inset: -8px; border-radius: 50%; background: rgba(59,130,246,0.3); animation: ping 1.5s infinite;"></span>
                <span style="width: 16px; height: 16px; border-radius: 50%; background: #2563eb; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></span>
              </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });

          const userMarker = L.marker([coords.lat, coords.lng], { icon: userIcon })
            .addTo(map)
            .bindPopup('<b>Your Current Location</b>')
            .openPopup();

          userMarkerRef.current = userMarker;
          map.flyTo([coords.lat, coords.lng], 10, { duration: 1.5 });
        }
      },
      (err) => {
        setIsLocating(false);
        // Fallback default: set to Hyderabad / Telangana central location
        setUserLocation({ lat: 17.3850, lng: 78.4867 });
        setLocationError(
          language === 'te' 
            ? 'GPS అనుమతి లభించలేదు. తెలంగాణ కేంద్ర స్థానాన్ని పరిగణిస్తున్నాము.' 
            : language === 'hi' 
            ? 'GPS अनुमति नहीं मिली। तेलंगाना केंद्र का उपयोग कर रहे हैं।' 
            : 'GPS permission denied. Displaying Telangana locations.'
        );
      },
      { timeout: 8000 }
    );
  };

  return (
    <div id="pesticide-shops-map" className="w-full my-8 scroll-mt-20">
      {/* Header Section with Telangana Focus */}
      <div className="text-center max-w-4xl mx-auto mb-8 px-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-black mb-3 shadow-xs">
          <Store className="w-4 h-4 text-emerald-700" />
          <span>
            {language === 'te' 
              ? 'తెలంగాణ సమగ్ర పురుగుమందుల & ఎరువుల దుకాణాల GPS మ్యాప్' 
              : language === 'hi' 
              ? 'तेलंगाना कीटनाशक एवं खाद दुकानें GPS मानचित्र' 
              : 'Telangana Pesticide & Agro-Chemical Shops GPS Locator'}
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {language === 'te' 
            ? 'తెలంగాణలోని అన్ని జిల్లాల పురుగుమందుల దుకాణాలు' 
            : language === 'hi' 
            ? 'तेलंगाना के सभी जिलों में कीटनाशक एवं उर्वरक केंद्र' 
            : 'Pesticide & Agro-Input Shops Across All Telangana'}
        </h2>

        <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl mx-auto">
          {language === 'te'
            ? 'ప్రభుత్వ అనుమతి పొందిన పురుగుమందుల డీలర్లు, బయో-ఆర్గానిక్ కేంద్రాలు మరియు మండల రైతు సేవా కేంద్రాల ఖచ్చితమైన చిరునామాలు, లైసెన్స్ వివరాలు మరియు GPS నావిగేషన్.'
            : language === 'hi'
            ? 'सरकारी लाइसेंस प्राप्त कीटनाशक विक्रेता, जैविक कृषि केंद्र एवं तहसील किसान सेवा केंद्रों के सटीक पते, फोन नंबर और जीपीएस नेविगेशन।'
            : 'Locate authorized pesticide retailers, certified organic bio-input dealers, and Mandal Rythu Seva Kendras with exact GPS coordinates and instant navigation.'}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-emerald-200 shadow-xl shadow-emerald-950/5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'te'
                  ? 'షాప్ పేరు, మండలం లేదా మందు పేరు వెతకండి...'
                  : language === 'hi'
                  ? 'दुकान, कस्बा या दवा का नाम खोजें...'
                  : 'Search shop name, town, or remedy (e.g. Mancozeb)...'
              }
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* District Dropdown Selector */}
          <div className="lg:col-span-3">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-black text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {TELANGANA_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter Pills */}
          <div className="lg:col-span-3 flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                selectedType === 'all'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'te' ? 'అన్నీ' : language === 'hi' ? 'सभी' : 'All'}
            </button>
            <button
              onClick={() => setSelectedType('organic')}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                selectedType === 'organic'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🌱 {language === 'te' ? 'సేంద్రీయ' : language === 'hi' ? 'जैविक' : 'Organic'}
            </button>
            <button
              onClick={() => setSelectedType('govt')}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                selectedType === 'govt'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🏛️ {language === 'te' ? 'ప్రభుత్వ' : language === 'hi' ? 'सरकारी' : 'Govt Hub'}
            </button>
          </div>

          {/* GPS Auto-Locate Button */}
          <div className="lg:col-span-2 flex justify-end">
            <button
              onClick={handleGetLocation}
              disabled={isLocating}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Detecting GPS...' : 'Nearest (GPS)'}</span>
            </button>
          </div>
        </div>

        {locationError && (
          <p className="text-[11px] text-amber-700 font-medium mt-2 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{locationError}</span>
          </p>
        )}
      </div>

      {/* Main Map & Shop List Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Leaflet GPS Map (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-3 sm:p-4 border-2 border-emerald-300 shadow-2xl shadow-emerald-950/10 overflow-hidden relative">
          <div className="flex items-center justify-between px-2 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                {language === 'te' ? 'తెలంగాణ ఉపగ్రహ & రోడ్డు మ్యాప్' : language === 'hi' ? 'तेलंगाना सड़क एवं जीपीएस मानचित्र' : 'Telangana GPS Road Map'}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {processedShops.length} {language === 'te' ? 'దుకాణాలు అందుబాటులో ఉన్నాయి' : language === 'hi' ? 'दुकानें उपलब्ध' : 'Verified Shops'}
            </span>
          </div>

          {/* Leaflet Map Canvas */}
          <div 
            ref={mapContainerRef} 
            className="w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden border border-slate-200 z-10" 
          />

          {/* Quick Map Legend Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-600 px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
              <span>{language === 'te' ? 'పురుగుమందుల దుకాణం' : language === 'hi' ? 'कीटनाशक दुकान' : 'Pesticide Shop'}</span>
            </div>
            {userLocation && (
              <div className="flex items-center gap-1.5 text-blue-700">
                <span className="w-3 h-3 rounded-full bg-blue-600 inline-block animate-ping" />
                <span>{language === 'te' ? 'మీ ప్రస్తుత స్థానం' : language === 'hi' ? 'आपका स्थान' : 'Your GPS Location'}</span>
              </div>
            )}
            <div className="text-slate-500 font-medium">
              Click any pin on the map to view instant directions & contact
            </div>
          </div>
        </div>

        {/* Telangana Shop Directory List (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-3 max-h-[580px] overflow-y-auto pr-1">
          {processedShops.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border-2 border-slate-200 text-center">
              <Store className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h4 className="text-sm font-black text-slate-800">No shops found</h4>
              <p className="text-xs text-slate-500 mt-1">Try selecting a different Telangana district or clearing your search term.</p>
            </div>
          ) : (
            processedShops.map((shop) => {
              const isSelected = selectedShop?.id === shop.id;
              return (
                <div
                  key={shop.id}
                  onClick={() => handleSelectShop(shop)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative bg-white ${
                    isSelected
                      ? 'border-emerald-500 shadow-lg shadow-emerald-600/10 ring-2 ring-emerald-400/30'
                      : 'border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 shadow-xs'
                  }`}
                >
                  {/* Top Bar: District & Distance */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                      {language === 'te' ? shop.district_te : language === 'hi' ? shop.district_hi : shop.district}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {shop.distance !== null && (
                        <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 flex items-center gap-1">
                          <Navigation className="w-3 h-3 text-blue-600" />
                          <span>{shop.distance} km</span>
                        </span>
                      )}

                      <span className="text-xs font-black text-amber-800 flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{shop.rating}</span>
                      </span>
                    </div>
                  </div>

                  {/* Shop Name & Dealer Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                        {language === 'te' ? shop.name_te : language === 'hi' ? shop.name_hi : shop.name}
                      </h4>
                      <p className="text-[11px] font-semibold text-emerald-800 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{language === 'te' ? shop.townMandal_te : language === 'hi' ? shop.townMandal_hi : shop.townMandal}</span>
                      </p>
                    </div>

                    {shop.verifiedDealer && (
                      <span className="shrink-0 p-1 rounded-full bg-emerald-50 text-emerald-700" title="Govt Authorized Pesticide License">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </span>
                    )}
                  </div>

                  {/* Full Address & Landmark */}
                  <p className="text-[11px] text-slate-600 font-medium mt-1.5 line-clamp-2 leading-relaxed">
                    {language === 'te' ? shop.address_te : language === 'hi' ? shop.address_hi : shop.address}
                  </p>

                  {/* Stocked Pesticide Badges */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {(language === 'te' ? shop.stockedRemedies_te : language === 'hi' ? shop.stockedRemedies_hi : shop.stockedRemedies)
                      .slice(0, 3)
                      .map((med, i) => (
                        <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {med}
                        </span>
                      ))}
                    {shop.stockedRemedies.length > 3 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                        +{shop.stockedRemedies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Quick Action Buttons: Get Directions & Call */}
                  <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-100">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all text-decoration-none"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{language === 'te' ? 'GPS రూట్' : language === 'hi' ? 'रास्ता देखें' : 'Get Directions'}</span>
                    </a>

                    <a
                      href={`tel:${shop.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center justify-center gap-1 border border-slate-200 active:scale-95 transition-all text-decoration-none"
                      title="Call Shop"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-700" />
                      <span>{language === 'te' ? 'కాల్' : language === 'hi' ? 'कॉल' : 'Call'}</span>
                    </a>

                    {shop.whatsapp && (
                      <a
                        href={`https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(
                          language === 'te'
                            ? 'నమస్కారం, క్రాప్ షీల్డ్ యాప్ ద్వారా సంప్రదిస్తున్నాను. మీ దుకాణంలో పంట రక్షణ మందుల లభ్యత గురించి తెలుసుకోవాలనుకుంటున్నాను.'
                            : language === 'hi'
                            ? 'नमस्ते, क्रॉप शील्ड ऐप के माध्यम से संपर्क कर रहा हूँ। कीटनाशक दवाओं की उपलब्धता की जानकारी चाहिए।'
                            : 'Hello, inquiring via CropShield about crop medicine and pesticide availability.'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-2 px-2.5 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 text-xs font-black flex items-center justify-center border border-green-200 active:scale-95 transition-all text-decoration-none"
                        title="WhatsApp Shop"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
