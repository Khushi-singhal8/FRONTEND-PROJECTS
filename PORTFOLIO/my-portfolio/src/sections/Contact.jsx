import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Astra from "../assets/Astra.png";

const SERVICE_ID = "service_7q62jlp";
const TEMPLATE_ID = "template_a1umorr";
const PUBLIC_KEY = "yCtOmMiMyKkFXRutU";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget" && value && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["name", "email", "service", "idea"];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.service !== "other" && !formData.budget.trim()) {
      newErrors.budget = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          service: formData.service,
          budget: formData.budget,
          message: formData.idea,
        },
        PUBLIC_KEY
      );

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white px-6 py-10 flex justify-center items-center">
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10"
      >
        
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-4 text-center">
          Let's Work Together 🚀
        </h2>

        {/* ✅ IMAGE FIXED HERE */}
        <motion.img
          src={Astra}
          alt="contact"
          className="w-32 mx-auto mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:border-blue-500 outline-none"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:border-blue-500 outline-none"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </div>

          {/* Service */}
          <div>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-transparent border border-gray-600 text-gray-300"
            >
              <option value="">Select Service</option>
              <option value="web">Web Development</option>
              <option value="app">Mobile App</option>
              <option value="other">Other</option>
            </select>
            {errors.service && <p className="text-red-400 text-sm">{errors.service}</p>}
          </div>

          {/* Budget */}
          {formData.service !== "other" && (
            <div>
              <input
                type="text"
                name="budget"
                placeholder="Budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:border-blue-500 outline-none"
              />
              {errors.budget && <p className="text-red-400 text-sm">{errors.budget}</p>}
            </div>
          )}

          {/* Idea */}
          <div>
            <textarea
              name="idea"
              placeholder="Tell me about your idea..."
              value={formData.idea}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:border-blue-500 outline-none"
            />
            {errors.idea && <p className="text-red-400 text-sm">{errors.idea}</p>}
          </div>

          {/* Status */}
          {status && (
            <p className="text-sm text-center">
              {status === "sending" && "⏳ Sending..."}
              {status === "success" && "✅ Message sent!"}
              {status === "error" && "❌ Something went wrong"}
            </p>
          )}

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status === "sending"}
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
          >
            {status === "sending" ? "Sending..." : "Send Message 🚀"}
          </motion.button>

        </form>
      </motion.div>
    </section>
  );
}