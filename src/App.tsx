import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { Layout } from "./components/layout/Layout";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Departments = lazy(() => import("./pages/Departments"));
const DepartmentDetail = lazy(() => import("./pages/DepartmentDetail"));
const Abr = lazy(() => import("./pages/Abr"));
const AbrDetail = lazy(() => import("./pages/AbrDetail"));
const Events = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
const WhatAwaitsYou = lazy(() => import("./pages/WhatAwaitsYou"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return (
    <div
      className="container-abc flex min-h-[60vh] items-center justify-center"
      aria-hidden="true"
    >
      <span className="font-display text-4xl font-black tracking-tight text-foreground/20">
        ABC
      </span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <Layout>
          <Suspense fallback={<PageFallback />}>
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
          </Suspense>
        </Layout>
      </MotionConfig>
    </BrowserRouter>
  );
}