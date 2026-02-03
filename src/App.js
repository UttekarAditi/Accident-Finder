
import React, { useState } from "react";
import AuthPage from "./components/AuthPage";
import "./App.css";

function App() {
  const [view, setView] = useState("auth");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);

  // If AuthPage is active
  if (view === "auth") {
    return <AuthPage onLogin={() => setView("map")} />;
  }

  return (
    <div>
      <header>
        <h1>Gujarat Police Station Jurisdiction Finder</h1>
        <p>Find police station jurisdiction across Gujarat.</p>
      </header>

      <nav>
        <button onClick={() => setView("auth")}>Logout</button>
      </nav>

      <section id="search-section">
        <input
          type="text"
          placeholder="Enter area or station"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => {}}>Search</button>

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

      <p>Map and table views coming soon...</p>
    </div>
  );
}

export default App;
