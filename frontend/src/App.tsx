import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Layout } from "./components/layout/Layout";
import { EASE } from "./components/reveal";
import { RouteMetadata } from "./components/RouteMetadata";

const Home = lazy(() => import("./pages/Home"));
const Team = lazy(() => import("./pages/Team"));
const Nibbl = lazy(() => import("./pages/Nibbl"));
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

function AnimatedRoutes() {
  const location = useLocation();
  const navigationType = useNavigationType();
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={location.pathname}
        initial={navigationType === "POP" ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } }}
        exit={{ opacity: 0, y: -14, transition: { duration: 0.22, ease: EASE } }}
      >
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="/team" element={<Team />} />
            <Route path="/nibbl" element={<Nibbl />} />
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
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <RouteMetadata />
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </MotionConfig>
    </BrowserRouter>
  );
}
