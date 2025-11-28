// src/components/Weather.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/utils/useTheme";

const API_KEY = "681ffdbe5041173a8d915a327f1267c3";
const DEFAULT_CITY = "Dhahran";

export default function Weather() {
  const { isDark } = useTheme();
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | error | success
  const [isVisible, setIsVisible] = useState(false);
  const weatherRef = useRef(null);

  useEffect(() => {
    // Load saved city from localStorage
    const savedCity = localStorage.getItem("weatherCity");
    if (savedCity) {
      setCity(savedCity);
      fetchWeather(savedCity);
    } else {
      fetchWeather(DEFAULT_CITY);
    }

    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (weatherRef.current) {
      observer.observe(weatherRef.current);
    }

    return () => {
      if (weatherRef.current) {
        observer.unobserve(weatherRef.current);
      }
    };
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      setStatus("loading");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
      setStatus("success");
    } catch (error) {
      console.error("Error fetching weather:", error);
      setStatus("error");
    }
  };

  const handleGetWeather = (e) => {
    e.preventDefault();
    if (city.trim()) {
      localStorage.setItem("weatherCity", city.trim());
      fetchWeather(city.trim());
    }
  };

  const formatTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      ref={weatherRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={`max-w-md mx-auto mt-12 rounded-2xl p-6 transition-all duration-500 ${
        isDark
          ? "bg-gray-900/50 border border-purple-900/30"
          : "bg-white border border-purple-200/50"
      } glow-purple`}
    >
      <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
        Weather
      </h2>

      <form onSubmit={handleGetWeather} className="mb-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className={
              isDark
                ? "bg-black/50 border-purple-500/30 text-white"
                : "bg-gray-50 border-purple-300 text-gray-900"
            }
          />
          <Button type="submit" className="gradient-purple">
            Get Weather
          </Button>
        </div>
      </form>

      {status === "loading" && (
        <div className={`text-center py-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Loading weather data...
        </div>
      )}

      {status === "error" && (
        <div className={`text-center py-4 ${isDark ? "text-red-400" : "text-red-600"}`}>
          Could not load weather data. Please check the city name or try again later.
        </div>
      )}

      {status === "success" && weatherData && (
        <div className="space-y-3">
          <div>
            <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              {weatherData.name}, {weatherData.sys?.country}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <div className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {Math.round(weatherData.main.temp)}°C
              </div>
              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {weatherData.weather[0]?.description}
              </div>
            </div>
          </div>

          <div className={`text-sm space-y-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <div>Humidity: {weatherData.main.humidity}%</div>
            <div>Last updated: {formatTime()}</div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

