import React, { useEffect, useRef, useState } from "react";
import { GOOGLE_MAPS_API_KEY } from "../../config/api";

interface DirectionsLeg {
  distance: { text: string; value: number };
  duration: { text: string; value: number };
  end_location: { lat: number; lng: number };
  start_location: { lat: number; lng: number };
  steps: Array<{
    distance: { text: string; value: number };
    duration: { text: string; value: number };
    end_location: { lat: number; lng: number };
    start_location: { lat: number; lng: number };
    html_instructions: string;
    polyline: { points: string };
  }>;
}

interface DirectionsRoute {
  bounds: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  };
  legs: DirectionsLeg[];
  overview_polyline: { points: string };
}

interface DirectionsResponse {
  routes: DirectionsRoute[];
  status: string;
}

interface GeocodingResponse {
  results: Array<{
    formatted_address: string;
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
  }>;
  status: string;
}

const GoogleMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const destination = "Truong+Dai+Hoc+FPT+TP+HCM,Thu+Duc,Ho+Chi+Minh,Vietnam";
  const watchIdRef = useRef<number | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
  } | null>(null);
  let bestAccuracy = Infinity;
  let autocomplete: google.maps.places.Autocomplete | null = null;

  // Hàm để xóa tất cả markers
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  // Hàm để xóa đường đi cũ
  const clearRoute = () => {
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }
  };

  // Hàm thêm marker mới
  const addMarker = (
    position: google.maps.LatLng | google.maps.LatLngLiteral,
    title: string,
    isSelected: boolean = false
  ) => {
    if (!mapInstanceRef.current) return;

    const marker = new google.maps.Marker({
      position,
      map: mapInstanceRef.current,
      title,
      icon: {
        url: isSelected
          ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
          : title === "Điểm đến"
          ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: new google.maps.Size(40, 40),
      },
    });

    markersRef.current.push(marker);
    return marker;
  };

  // Hàm lấy địa chỉ từ tọa độ mới
  const getAddressFromCoords = async (
    lat: number,
    lng: number
  ): Promise<string> => {
    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}&language=vi`
      );
      const text = await response.text();
      const fixedText = text.replace(/\bOK\s*$/, 'OK"}');
      const data = JSON.parse(fixedText);

      if (data.status === "OK" && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ:", error);
    }
    return "Không xác định được địa chỉ";
  };

  // Chuyển hàm updateMap ra ngoài useEffect
  const updateMap = async (
    origin: { lat: number; lng: number },
    accuracy: number,
    isSelected: boolean = false
  ) => {
    const mapElement = mapRef.current;
    if (!mapElement) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapElement, {
        zoom: 15,
        center: origin,
      });
    } else {
      mapInstanceRef.current.setCenter(origin);
    }

    const map = mapInstanceRef.current;

    // Xóa tất cả markers cũ và đường đi cũ
    clearMarkers();
    clearRoute();

    // Thêm marker mới
    addMarker(
      origin,
      isSelected ? "Vị trí đã chọn" : `Độ chính xác: ${Math.round(accuracy)}m`,
      isSelected
    );

    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/directions/json?language=vi&mode=driving&destination=${destination}&origin=${origin.lat},${origin.lng}&key=${GOOGLE_MAPS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const fixedText = text.replace(/\bOK\s*$/, 'OK"}');
      const data: DirectionsResponse = JSON.parse(fixedText);

      if (data.status === "OK" && data.routes?.[0]) {
        const route = data.routes[0];
        const path = google.maps.geometry.encoding.decodePath(
          route.overview_polyline.points
        );

        // Lưu và vẽ đường đi mới
        polylineRef.current = new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: map,
        });

        const endLocation = route.legs[0].end_location;
        addMarker(endLocation, "Điểm đến");

        // Cập nhật thông tin khoảng cách và thời gian
        if (route.legs[0]) {
          setRouteInfo({
            distance: route.legs[0].distance.text,
            duration: route.legs[0].duration.text,
          });
        }

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(origin);
        bounds.extend(endLocation);
        map.fitBounds(bounds);
      } else {
        console.error("Không có tuyến đường được tìm thấy");
        setRouteInfo(null);
      }
    } catch (error) {
      console.error("Lỗi khi lấy tuyến đường:", error);
      setRouteInfo(null);
    }
  };

  // Hàm xử lý khi chọn địa điểm từ autocomplete
  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry && place.geometry.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      updateMap(location, 0, true); // Thêm true để đánh dấu đây là vị trí được chọn
      setCurrentAddress(place.formatted_address || "");
      setSearchAddress(place.formatted_address || "");
    }
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!document.querySelector('script[src*="maps.gomaps.pro"]')) {
        const script = document.createElement("script");
        script.src = `https://maps.gomaps.pro/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        script.onload = initMap;
      } else {
        initMap();
      }
    };

    const initMap = () => {
      const mapElement = mapRef.current;
      if (!mapElement) return;

      // Khởi tạo autocomplete
      if (inputRef.current) {
        autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "vn" },
          fields: ["formatted_address", "geometry", "name"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete?.getPlace();
          if (place) {
            handlePlaceSelect(place);
          }
        });
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            bestAccuracy = position.coords.accuracy;
            const origin = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            updateMap(origin, bestAccuracy);

            watchIdRef.current = navigator.geolocation.watchPosition(
              async (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                if (accuracy < bestAccuracy) {
                  bestAccuracy = accuracy;
                  const newOrigin = { lat: latitude, lng: longitude };
                  updateMap(newOrigin, accuracy);
                }

                if (accuracy < 50) {
                  const address = await getAddressFromCoords(
                    latitude,
                    longitude
                  );
                  console.log(
                    "Vị trí chính xác:",
                    latitude,
                    longitude,
                    "Địa chỉ:",
                    address
                  );
                  setCurrentAddress(address);
                }
              },
              (error) => {
                console.error("Lỗi khi lấy vị trí:", error);
              },
              {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 1000,
              }
            );
          },
          (error) => {
            console.error("Lỗi khi lấy vị trí ban đầu:", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 1000,
          }
        );
      } else {
        console.error("Trình duyệt của bạn không hỗ trợ Geolocation API");
      }
    };

    loadGoogleMapsScript();

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h3>Bản đồ đường đi đến điểm đến</h3>
      <div style={{ marginBottom: "20px" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Nhập địa chỉ của bạn"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      <p>Vị trí hiện tại: {currentAddress}</p>
      <p>Điểm đến: {destination}</p>
      {routeInfo && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #dee2e6",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <p
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#0066cc",
                }}
              >
                <span role="img" aria-label="distance">
                  📍
                </span>{" "}
                Khoảng cách:
                <span style={{ marginLeft: "8px", color: "#333" }}>
                  {routeInfo.distance}
                </span>
              </p>
              <p
                style={{
                  margin: "0",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#0066cc",
                }}
              >
                <span role="img" aria-label="time">
                  ⏱️
                </span>{" "}
                Thời gian:
                <span style={{ marginLeft: "8px", color: "#333" }}>
                  {routeInfo.duration}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      <div ref={mapRef} style={{ height: "500px", width: "100%" }} />
    </div>
  );
};

export default GoogleMap;
