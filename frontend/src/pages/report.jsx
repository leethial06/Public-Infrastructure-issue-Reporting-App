import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { AppShell } from "../components/AppShell";

import { useStore } from "../lib/useStore";

import { CATEGORIES} from "../lib/civic";



import {

  MapContainer,

  TileLayer,

  Marker,

  useMapEvents,
  useMap,

} from "react-leaflet";



import "leaflet/dist/leaflet.css";

import L from "leaflet";



/* Fix Leaflet marker icon */



delete L.Icon.Default.prototype._getIconUrl;



L.Icon.Default.mergeOptions({

  iconRetinaUrl:

    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",



  iconUrl:

    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
                  
   shadowUrl:

    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

});



const field =

  "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/25";



/* Voice Recognition */



/* Map click component */



function LocationMarker({

  position,

  setPosition,

  setAddress,

}) {

  useMapEvents({

    click(event) {

      const lat = event.latlng.lat;

      const lng = event.latlng.lng;



      setPosition({

        lat,

        lng,

      });



      /*

        OpenStreetMap reverse geocoding

        converts coordinates into address.

      */



      fetch(

        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`

      )

        .then((response) => response.json())

        .then((data) => {

          if (data.display_name) {

            setAddress(data.display_name);

          }

        })

        .catch(() => {

          setAddress(

            `Location (${lat.toFixed(5)}, ${lng.toFixed(5)})`

          );

        });

    },

  });

  return position ? (

    <Marker

      position={[

        position.lat,

        position.lng,

      ]}

    />

  ) : null;

}



function SearchLocation({ selectedLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedLocation) return;

    map.setView(
      [selectedLocation.lat, selectedLocation.lng],
      17
    );
  }, [selectedLocation, map]);

  return null;
}

function ReportPage() {

  const { addComplaint } = useStore();

  const navigate = useNavigate();



  const [category, setCategory] =

    useState("Pothole");



  const [priority, setPriority] =

    useState("Medium");

 const [searchText, setSearchText] = useState("");
 const [searchResults, setSearchResults] = useState([]);
 const [searching, setSearching] = useState(false);
 const [selectedLocation, setSelectedLocation] = useState(null);

  const [description, setDescription] =

    useState("");



  const [address, setAddress] =

    useState("");



  const [coords, setCoords] =

    useState(null);



  const [image, setImage] =

    useState();



  const [error, setError] =

    useState("");

  const [ , setLoading] =
  useState(false);



  const [locating, setLocating] =

    useState(false);

const searchLocation = async () => {
  if (!searchText.trim()) {
    setError("Please enter a location to search.");
    return;
  }

  setSearching(true);
  setError("");
  setSearchResults([]);

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchText
      )}&limit=5`
    );

    const data = await response.json();

    if (!data.length) {
      setError("Location not found. Try another place.");
      return;
    }

    setSearchResults(data);
  } catch (error) {
    console.error("Location search error:", error);
    setError("Unable to search location.");
  } finally {
    setSearching(false);
  }
};


 /* =========================
     VOICE RECOGNITION
  ========================= */

 

  
  /* =========================

     CURRENT LOCATION

       ========================= */



  const useMyLocation = () => {

    

    if (!navigator.geolocation) {

      setError(

        "Geolocation is not available in this browser."

      );

      return;

    }



    setLocating(true);

    setError("");



    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat =

          position.coords.latitude;



        const lng =

          position.coords.longitude;



        const newCoords = {

          lat,

          lng,

        };



        setCoords(newCoords);



        try {

          const response =

            await fetch(

              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`

            );



          const data =

            await response.json();



          if (data.display_name) {

            setAddress(

              data.display_name

            );

          }

        } catch {

          setAddress(

            `Current location (${lat.toFixed(

              5

            )}, ${lng.toFixed(5)})`

          );

        }



        setLocating(false);

      },



      () => {

        setError(

          "Could not get your location. Please select a location on the map."

        );



        setLocating(false);

      }

    );

  };

  /* =========================

     IMAGE UPLOAD

     ========================= */



  const onImage = (file) => {

    if (!file) return;



    const reader =

      new FileReader();



    reader.onload = () => {

      setImage(

        String(reader.result)

      );

    };



    reader.readAsDataURL(file);

  };

  /* =========================
        SUBMIT
     ========================= */
     const submit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (!description.trim() || description.trim().length < 10) {
        setError("Description must be at least 10 characters.");
        setLoading(false);
        return;
      }

      if (!address.trim()) {
        setError("Please select a location.");
        setLoading(false);
        return;
      }

      let token = localStorage.getItem("access_token");

      if (!token) {
        setError("Please login again.");
        setLoading(false);
        return;
      }

      const categoryMap = {
        Pothole: "pothole",
        "Damaged Road": "road",
        "Street Light": "street_light",
        Garbage: "garbage",
        Drainage: "drainage",
        "Water Leakage": "water_leakage",
        Other: "other",
      };
const priorityMap = {
        Low: "low",
        Medium: "medium",
        High: "high",
      };

      const createFormData = () => {
        const data = new FormData();

        data.append("category", categoryMap[category] || "other");
        data.append("priority", priorityMap[priority] || "medium");
        data.append("description", description.trim());
        data.append("address", address.trim());

        if (coords) {
          data.append("latitude", coords.lat.toFixed(6));
          data.append("longitude", coords.lng.toFixed(6));
        }

        return data;
      };

      let response = await fetch(
        "http://127.0.0.1:8000/api/complaints/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: createFormData(),
        }
      );
      if (response.status === 401) {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setError("Session expired. Please login again.");
          setLoading(false);
          return;
        }

        const refreshResponse = await fetch(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: refreshToken,
            }),
          }
        );
const refreshData = await refreshResponse.json();

        if (!refreshResponse.ok || !refreshData.access) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setError("Session expired. Please login again.");
          setLoading(false);
          return;
        }

        token = refreshData.access;
        localStorage.setItem("access_token", token);

        response = await fetch(
          "http://127.0.0.1:8000/api/complaints/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: createFormData(),
          }
        );
      }

      const data = await response.json();

      console.log("Complaint API response:", data);

      if (!response.ok) {
        console.log(
          "Complaint API error:",
          JSON.stringify(data, null, 2)
        );

        setError(
          data.detail || "Failed to submit complaint."
        );

        setLoading(false);
        return;
      }
      console.log(
        "Complaint created successfully:",
        data
      );

      addComplaint(data);
      setLoading(false);
      navigate("/complaints");
    } catch (error) {
      console.error(
        "Submit complaint error:",
        error
      );

      setError(
        "Could not connect to the backend. Please make sure Django server is running."
      );

      setLoading(false);
    }
  };

  return (

    <AppShell>



      {/* Header */}
      <h1 className="text-3xl font-bold">

        Report an issue

      </h1>



      <p className="mt-1 text-muted-foreground">

        The more detail you add, the faster it

        gets routed to the right department.

      </p>



      <form

        onSubmit={submit}

        className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]"

      >
{/* =========================

            LEFT SIDE

========================= */}



        <div className="space-y-6">



          {/* CATEGORY */}



          <div className="surface p-5">



            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">

              Category

            </h2>



            <div className="mt-3 grid gap-2 sm:grid-cols-3">



              {CATEGORIES.map(

                (categoryItem) => (

                  <button

                    type="button"

                    key={categoryItem.id}

                    onClick={() =>

                      setCategory(

                        categoryItem.id

                      )

                    }

                    className={`rounded-lg border p-3 text-left transition ${

                      category ===

                      categoryItem.id

                        ? "border-primary bg-primary/8 ring-2 ring-primary/25"

                        : "border-border hover:bg-secondary"

                    }`}

                  >



                    <span className="text-xl">

                      {categoryItem.icon}

                    </span>

          <p className="mt-1 text-sm font-medium">

                      {categoryItem.id}

                    </p>



                  </button>

                )

              )}



            </div>



          </div>



          {/* LOCATION */}



          <div className="surface space-y-4 p-5">



            <label className="block text-sm font-medium">



              Location / address



              <input

                className={field}

                value={address}

                onChange={(e) =>

                  setAddress(

                    e.target.value

                  )

                }

                placeholder="Click the map or enter address manually"

              />



            </label>



            {/* PLACE SEARCH */}

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Search Place
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  className={field}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search JJ College..."
                />

                <button
                  type="button"
                  onClick={searchLocation}
                  disabled={searching}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                >
                  {searching ? "..." : "Search"}
                </button>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-2 rounded-lg border border-border p-2">
                  {searchResults.map((result) => (
                    <button
                      type="button"
                      key={result.place_id}
                      className="block w-full rounded-md p-2 text-left text-sm hover:bg-secondary"
                      onClick={() => {
                        const location = {
                          lat: Number(result.lat),
                          lng: Number(result.lon),
                        };

                        setCoords(location);
                        setSelectedLocation(location);
                        setAddress(result.display_name);
                        setSearchText(result.display_name);
                        setSearchResults([]);
                      }}
                    >
                      {result.display_name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MAP */}



            <div>



              <h2 className="mb-2 text-sm font-semibold">

                Select location on map

              </h2>



              <div className="overflow-hidden rounded-lg border border-border">
<MapContainer

                  center={[

                    10.7905,

                    78.7047,

                  ]}

                  zoom={13}

                  style={{

                    height: "350px",

                    width: "100%",

                  }}

                >



                  <TileLayer

                    attribution="&copy; OpenStreetMap contributors"

                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                  />

                  <SearchLocation
                    selectedLocation={selectedLocation}
                  />



                  <LocationMarker

                    position={coords}

                    setPosition={

                      setCoords

                    }

                    setAddress={

                      setAddress

                    }

                  />



                </MapContainer>



              </div>



              <p className="mt-2 text-xs text-muted-foreground">

                Click anywhere on the map to select

                the issue location.

              </p>



            </div>


{/* CURRENT LOCATION */}

<div className="flex flex-wrap items-center gap-3">
  <button
    type="button"
    onClick={useMyLocation}
    disabled={locating}
    className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-secondary disabled:opacity-50"
  >
    {locating ? "Getting location..." : "Use Current Location"}
  </button>
</div>

</div>

{/* PRIORITY */}

<div className="surface p-5">
  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
    Priority
  </h2>

  <div className="mt-3 flex flex-wrap gap-2">
    {["Low", "Medium", "High"].map((priorityItem) => (
      <button
        type="button"
        key={priorityItem}
        onClick={() => setPriority(priorityItem)}
        className={`rounded-lg border px-4 py-2 text-sm transition ${
          priority === priorityItem
            ? "border-primary bg-primary/10 ring-2 ring-primary/25"
            : "border-border hover:bg-secondary"
        }`}
      >
        {priorityItem}
      </button>
    ))}
  </div>
</div>

{/* DESCRIPTION */}

<div className="surface p-5">
  <label className="block text-sm font-medium">
    Description

    <textarea
      className={`${field} mt-2 min-h-32 resize-y`}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Describe the issue in at least 10 characters"
      rows={5}
    />
  </label>

  <p className="mt-2 text-xs text-muted-foreground">
    Please provide details about the issue.
  </p>
</div>

{/* IMAGE UPLOAD */}

<div className="surface p-5">
  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
    Upload Photo
  </h2>

  {image ? (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <img
        src={image}
        alt="Selected complaint"
        className="h-32 w-32 rounded-lg object-cover"
      />

      <button
        type="button"
        onClick={() => setImage(undefined)}
        className="text-sm font-medium text-destructive"
      >
        Remove photo
      </button>
    </div>
  ) : (
    <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground transition hover:bg-secondary">
      <span className="text-3xl">📷</span>

      <span className="mt-2">
        Tap to upload a photo
      </span>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onImage(e.target.files?.[0])}
      />
    </label>
  )}
</div>






          {/* ERROR */}



          {error && (

            <p className="text-sm text-destructive">

              {error}

            </p>

          )}



          {/* SUBMIT */}



          <button

            type="submit"

            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"

          >

            Submit complaint

          </button>



        </div>



      </form>



    </AppShell>
  );
}

export default ReportPage;