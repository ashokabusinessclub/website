import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Departments from "./pages/Departments";
import DepartmentDetail from "./pages/DepartmentDetail";
import Abr from "./pages/Abr";
import AbrDetail from "./pages/AbrDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Sponsors from "./pages/Sponsors";
import WhatAwaitsYou from "./pages/WhatAwaitsYou";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:slug" element={<DepartmentDetail />} />
          <Route path="/abr" element={<Abr />} />
          <Route path="/abr/:slug" element={<AbrDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/what-awaits-you" element={<WhatAwaitsYou />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
