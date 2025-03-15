import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import TrainingFacilities from "@/components/sections/TrainingFacilities";
import TrainingProgram from "@/components/sections/TrainingProgram";
import Activities from "@/components/sections/Activities";
import Footer from "@/components/layout/Footer";
import Cooperate from "@/components/sections/Cooperate";
import Hero from "@/components/sections/Hero";
import ClientWrapper from "@/components/ClientWrapper";
import OutstandingStudents from "@/components/sections/OutstandingStudents";

export default function Home() {
  return (
    <main className="text-gray-900">
      <ClientWrapper>
        <Navbar />
        <Hero />
        <About />
        <TrainingFacilities />
        <Cooperate />
        <TrainingProgram />
        <OutstandingStudents />
        <Activities />
        <Footer />
      </ClientWrapper>
    </main>
  );
}
