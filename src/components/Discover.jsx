import React, { useState, useEffect } from "react";
import "./Discover.css";
import { CiSearch } from "react-icons/ci";
import { MdLocationOn, MdWorkOutline } from "react-icons/md";
import Header from "./HeaderComponents/Header";
import Footer from "./HeaderComponents/Footer";
// import "./HeaderComponents/Footer.css";
import { motion, AnimatePresence } from "framer-motion";


const normalizeScore = (score) => Math.round(score * 100);

const Discover = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [location, setLocation] = useState("");
  const [internships, setInternships] = useState([]);

  

  // 🔹 Fetch data from backend
  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); 

      const res = await fetch("http://127.0.0.1:8000/search/internships", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      const recs = data.recommendations || data;

      if (!Array.isArray(recs)) {
        console.error("❌ Backend did not return an array:", recs);
        setInternships([]);
        return;
      }

      const formatted = recs.map((rec, index) => ({
        id: index + 1,
        title: rec.title,
        company: rec.company_name,
        type: rec.workmode || "Not Specified",
        duration: rec.duration || "Not Specified",
        stipend: rec.stipend || "N/A",
        location: rec.location,
        domain: rec.domain,
        matchPercentage: normalizeScore(rec.final_score || 0),
        details: `Skills required: ${rec.skills || ""}`,
      }));

      setInternships(formatted);
    } catch (error) {
      console.error("❌ Error fetching internships:", error);
    }
  };

  fetchData();
}, []);

  // 🔹 Apply filters
  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(search.toLowerCase()) ||
      internship.company.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || internship.type === filterType;
    const matchesLocation =
      !location ||
      internship.location.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div><Header/>
 <div className="discover-container">
  <div className="discover-filters">
    <div className="discover-input">
      <CiSearch className="discover-icon" />
      <input
        type="text"
        placeholder="Search by Title or Company"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    <div className="discover-input">
      <MdWorkOutline className="discover-icon" />
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Remote">Remote</option>
        <option value="Onsite">Onsite</option>
        <option value="Hybrid">Hybrid</option>
      </select>
    </div>

    <div className="discover-input">
      <MdLocationOn className="discover-icon" />
      <input
        type="text"
        placeholder="Filter by location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
  </div>

  <AnimatePresence>
    {filteredInternships.length > 0 ? (
      filteredInternships.map((internship, index) => (
        <motion.div
          key={internship.id}
          className="discover-card"
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="discover-card-header">
            <div>
              <h3>{internship.title}</h3>
              <p className="discover-company">{internship.company}</p>

              <div className="discover-meta">
                <MdLocationOn />
                <span>{internship.location}</span>
                <span className="discover-domain">{internship.domain}</span>
                <span className="discover-stipend">
                  ₹{internship.stipend}/month
                </span>
              </div>
            </div>

            <div className="discover-match">
              <strong>{internship.matchPercentage}%</strong>
              <p>Match</p>
            </div>
          </div>

          <div className="discover-progress">
            <div className="discover-progress-bar">
              <div
                className="discover-progress-fill"
                style={{ width: `${internship.matchPercentage}%` }}
              />
            </div>
          </div>

          <div className="discover-skills">
            {internship.details
              .replace("Skills required:", "")
              .split(",")
              .map((skill, i) => (
                <span key={i}>{skill.trim()}</span>
              ))}
          </div>

          <button
            className="discover-apply"
            onClick={() =>
              setInternships((prev) =>
                prev.filter((_, i) => i !== index)
              )
            }
          >
            Apply Now
          </button>
        </motion.div>
      ))
    ) : (
      <p className="discover-empty">No internships found 🚫</p>
    )}
  </AnimatePresence>

</div>
<Footer />

    </div>
  );
};

export default Discover;