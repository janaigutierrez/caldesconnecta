"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapBusiness {
  id: number;
  nom: string;
  categoria: string;
  adreca: string;
  lat: number;
  lng: number;
}

interface MapViewProps {
  businesses: MapBusiness[];
  onPinClick: (id: number) => void;
}

/* Bounds: Caldes de Montbui area */
const CALDES_BOUNDS: L.LatLngBoundsExpression = [
  [41.615, 2.145], // SW
  [41.650, 2.195], // NE
];

const CALDES_CENTER: L.LatLngExpression = [41.6317, 2.1681];

/* Custom pin icon using inline SVG */
function createPinIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="28" height="40">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#C75B2A"/>
    <circle cx="12" cy="11" r="5" fill="white"/>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -42],
  });
}

export default function MapView({ businesses, onPinClick }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  /* Initialize map once */
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: CALDES_CENTER,
      zoom: 15,
      minZoom: 14,
      maxZoom: 18,
      maxBounds: CALDES_BOUNDS,
      maxBoundsViscosity: 1.0,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  /* Update markers when businesses change */
  useEffect(() => {
    if (!markersRef.current) return;

    markersRef.current.clearLayers();
    const icon = createPinIcon();

    businesses.forEach((b) => {
      const marker = L.marker([b.lat, b.lng], { icon }).on("click", () => {
        onPinClick(b.id);
      });

      marker.bindTooltip(b.nom, {
        direction: "top",
        offset: [0, -42],
        className: "ch-tooltip",
      });

      markersRef.current!.addLayer(marker);
    });
  }, [businesses, onPinClick]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-2xl overflow-hidden"
      style={{ minHeight: 400 }}
    />
  );
}
