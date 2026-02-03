
import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { jurisdictions } from "./data"; // your data file
import AuthPage from "./components/AuthPage"; // your AuthPage component
import "./App.css"; // optional styling

function App() {
  const [view, setView] = useState("auth"); // "auth" | "map" | "table"
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);

  // Search function
  const handleSearch = () => {
    const q = search.toLowerCase();
    const found = jurisdictions.find(
      (j) =>
        j.station.toLowerCase().includes(q) ||
        j.district.toLowerCase().includes(q) ||
        j.areas.some((a) => a.toLowerCase().includes(q))
    );
    setResult(found || null);
  };

  // If AuthPage is active
  if (view === "auth") {
    return <AuthPage onLogin={() => setView("map")} />;
  }

  return (
    <div>
      {/* Header */}
      <header>
        <h1>Gujarat Police Station Jurisdiction Finder</h1>
        <p>Find police station jurisdiction across Gujarat.</p>
      </header>

      {/* Navigation */}
      <nav>
        <button onClick={() => setView("map")}>Map View</button>
        <button onClick={() => setView("table")}>Table View</button>
      </nav>

      {/* Search */}
      <section id="search-section">
        <input
          type="text"
          placeholder="Enter area or station"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {result && (
          <div>
            <strong>{result.station}</strong>
            <br />
            {result.district}
            <br />
            {result.contact}
          </div>
        )}
      </section>

      {/* Map view */}
      {view === "map" && (
        <MapContainer
          center={[23.0225, 72.5714]}
          zoom={7}
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {jurisdictions.map((jur, i) => (
            <Polygon
              key={i}
              positions={jur.bounds}
              pathOptions={{ color: "red", fillColor: "lightblue", fillOpacity: 0.4 }}
            >
              <Popup>
                <b>{jur.station}</b>
                <br />
                {jur.district}
                <br />
                {jur.areas.join(", ")}
              </Popup>
            </Polygon>
          ))}
        </MapContainer>
      )}

      {/* Table view */}
      {view === "table" && (
        <table>
          <thead>
            <tr>
              <th>Station</th>
              <th>District</th>
              <th>Areas</th>
            </tr>
          </thead>
          <tbody>
            {jurisdictions.map((j, i) => (
              <tr key={i}>
                <td>{j.station}</td>
                <td>{j.district}</td>
                <td>{j.areas.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
