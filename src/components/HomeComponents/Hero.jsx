import React from "react";
import "./Home.css";
import heroImage from "/background.jpg"; // adjust path
import { Users, Brain, Target, ArrowRight } from "lucide-react";
import {Link} from "react-router-dom";
const Hero = () => {

  return (
    <section className="hero">
      {/* Background */}
      <div className="hero-background">
        <img
          src={heroImage}
          alt="Students and professionals collaborating in modern workspace"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1>
          Smart <span className="highlight">AI-Powered</span> <br />
          Internship Matching
        </h1>

        <p>
          Enter another dimension of career opportunities. Your journey into the unknown begins here.
        </p>

        {/* Buttons */}
        <div className="hero-buttons">
          <Link to="/Dashboard" className="btn btn-primary flex items-center gap-2">
            Find My Match <ArrowRight className="icon" />
          </Link>
          <a href="#HowItWorks" className="btn btn-outline">How It Works</a>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
