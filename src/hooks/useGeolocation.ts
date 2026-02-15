import { useState, useEffect } from "react";

interface GeoState {
  country: string | null;
  region: string | null;
  flag: string | null;
  loading: boolean;
  denied: boolean;
}

// Mock country detection based on rough coordinates
const detectCountry = (lat: number, lng: number): { country: string; region: string; flag: string } => {
  // Simplified bounding boxes for West/Central Africa
  if (lat > 4 && lat < 11 && lng > -9 && lng < -2) return { country: "Côte d'Ivoire", region: "Abidjan", flag: "🇨🇮" };
  if (lat > 12 && lat < 17 && lng > -17 && lng < -11) return { country: "Sénégal", region: "Dakar", flag: "🇸🇳" };
  if (lat > 10 && lat < 25 && lng > -12 && lng < 4) return { country: "Mali", region: "Bamako", flag: "🇲🇱" };
  if (lat > 3 && lat < 14 && lng > -1 && lng < 4) return { country: "Ghana", region: "Accra", flag: "🇬🇭" };
  if (lat > 4 && lat < 14 && lng > 2 && lng < 15) return { country: "Nigeria", region: "Lagos", flag: "🇳🇬" };
  if (lat > 1 && lat < 13 && lng > 8 && lng < 16) return { country: "Cameroun", region: "Douala", flag: "🇨🇲" };
  if (lat > -5 && lat < 5 && lng > 11 && lng < 19) return { country: "Congo", region: "Brazzaville", flag: "🇨🇬" };
  if (lat > 6 && lat < 12 && lng > -1 && lng < 2) return { country: "Bénin", region: "Cotonou", flag: "🇧🇯" };
  if (lat > 9 && lat < 15 && lng > -3 && lng < 3) return { country: "Burkina Faso", region: "Ouagadougou", flag: "🇧🇫" };
  if (lat > 4 && lat < 9 && lng > -12 && lng < -7) return { country: "Guinée", region: "Conakry", flag: "🇬🇳" };
  // Default
  return { country: "Côte d'Ivoire", region: "Abidjan", flag: "🇨🇮" };
};

export const useGeolocation = () => {
  const [geo, setGeo] = useState<GeoState>({
    country: null,
    region: null,
    flag: null,
    loading: true,
    denied: false,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeo({ country: null, region: null, flag: null, loading: false, denied: true });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const result = detectCountry(pos.coords.latitude, pos.coords.longitude);
        setGeo({ ...result, loading: false, denied: false });
      },
      () => {
        setGeo({ country: null, region: null, flag: null, loading: false, denied: true });
      },
      { timeout: 8000 }
    );
  }, []);

  return geo;
};
