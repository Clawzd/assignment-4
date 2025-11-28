// src/pages/Contact.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/utils/useTheme";

export default function Contact() {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    // Name validation: required, minimum 3 characters
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    
    // Email validation: required, valid format
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    // Message validation: required, minimum 10 characters
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Real-time validation for submit button
  const isFormValid = () => {
    return (
      formData.name.trim().length >= 3 &&
      formData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.message.trim().length >= 10
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Save visitor name to localStorage for personalized greeting
    if (formData.name.trim()) {
      localStorage.setItem("visitorName", formData.name.trim());
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new CustomEvent("visitorNameUpdated", { detail: formData.name.trim() }));
    }

    const messages = JSON.parse(localStorage.getItem("messages") || "[]");
    messages.push({
      ...formData,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("messages", JSON.stringify(messages));

    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  // Validate on change for real-time feedback
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-transparent" : "bg-gray-50"
      }`}
    >
      {!isDark && <div className="absolute inset-0 tech-grid opacity-20" />}

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl font-bold mb-6 text-center ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Contact Me
        </motion.h1>

        <p
          className={`text-center mb-10 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Have a question or want to collaborate? Send me a message!
        </p>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg mb-6 text-center font-medium ${
                isDark
                  ? "bg-green-900/20 text-green-300 border border-green-600/40"
                  : "bg-green-100 text-green-700 border border-green-400"
              }`}
              role="status"
            >
              ✅ Message sent successfully!
            </motion.div>
          )}
        </AnimatePresence>

        <form
          onSubmit={handleSubmit}
          className={`rounded-xl p-8 shadow-lg transition-all duration-500 ${
            isDark
              ? "bg-gray-900/50 border border-purple-900/30"
              : "bg-white border border-purple-200/50"
          }`}
          noValidate
        >
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className={`block mb-2 font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Name *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={validate}
                className={`w-full p-2 rounded-md border outline-none ${
                  errors.name
                    ? "border-red-500"
                    : isDark
                    ? "bg-black/50 border-purple-500/30 text-white"
                    : "bg-gray-50 border-purple-300 text-gray-900"
                }`}
                placeholder="Your name"
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className={`block mb-2 font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={validate}
                className={`w-full p-2 rounded-md border outline-none ${
                  errors.email
                    ? "border-red-500"
                    : isDark
                    ? "bg-black/50 border-purple-500/30 text-white"
                    : "bg-gray-50 border-purple-300 text-gray-900"
                }`}
                placeholder="example@email.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className={`block mb-2 font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Message *
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={validate}
                className={`w-full p-2 h-32 rounded-md border outline-none ${
                  errors.message
                    ? "border-red-500"
                    : isDark
                    ? "bg-black/50 border-purple-500/30 text-white"
                    : "bg-gray-50 border-purple-300 text-gray-900"
                }`}
                placeholder="Write your message..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full p-3 rounded-md font-semibold transition-all glow-purple ${
                isFormValid()
                  ? "gradient-purple text-white hover:opacity-90 cursor-pointer"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50"
              }`}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
