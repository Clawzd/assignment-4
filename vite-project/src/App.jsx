import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Landing from "./pages/Landing";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Github from "./pages/Github";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/github" element={<Github />} />
        </Routes>
      </Layout>
    </Router>
  );
}
