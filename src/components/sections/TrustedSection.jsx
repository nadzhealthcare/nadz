"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MdVerifiedUser,
  MdSchedule,
  MdLocalOffer,
  MdFavorite,
  MdPsychology,
  MdLocalHospital,
  MdAir,
  MdScience,
  MdSpa,
  MdArrowBack,
  MdArrowForward,
  MdTrendingUp,
  MdHeadphones,
  MdEmergency,
  MdDesktopWindows,
  MdLock,
  MdAirportShuttle,
  MdCheckCircle,
  MdCancel,
  MdStar,
  MdFormatQuote,
} from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

const MotionDiv = motion.div;

const trustFeatures = [
  {
    icon: MdVerifiedUser,
    title: "Licenced DHA Professional",
  },
  {
    icon: MdSchedule,
    title: "24/7 Available",
  },
  {
    icon: MdLocalOffer,
    title: "Affordable Packages",
  },
];

const areaOptions = [
  "Dubai Marina",
  "Downtown Dubai",
  "Business Bay",
  "Jumeirah",
  "Palm Jumeirah",
  "JBR",
  "Other",
];

const treatmentOptions = [
  "Doctor on Call",
  "Nursing Care",
  "Elderly Care",
  "Physiotherapy",
  "Labs at Home",
  "Wellness at Home",
];

const moreServices = [
  {
    icon: MdFavorite,
    title: "Cardiology",
    description: "Your heart health is our priority — expert care with compassion.",
  },
  {
    icon: MdPsychology,
    title: "Neurology",
    description: "Compassionate neurological care focused on restoring your quality of life.",
  },
  {
    icon: MdLocalHospital,
    title: "Urology",
    description: "Compassionate care for all urological concerns — from diagnosis to recovery.",
  },
  {
    icon: MdAir,
    title: "Pulmonary",
    description: "Helping you breathe better with compassionate and specialized pulmonary care.",
  },
  {
    icon: MdScience,
    title: "Radiology",
    description: "Cutting-Edge Technology for Every Scan",
  },
  {
    icon: MdSpa,
    title: "Hypotherapy",
    description: "A Path to Calm, Clarity, and Confidence",
  },
];

const doctors = [
  {
    name: "Dr. Diana Ayers",
    specialty: "Cardiologist",
    image: "/images/doctor.png",
    featured: false,
  },
  {
    name: "Dr. Tracy McKay",
    specialty: "Cardiologist",
    image: "/images/doctor.png",
    featured: false,
  },
  {
    name: "Dr. Jeffrey Davis",
    specialty: "Cardiologist",
    image: "/images/doctor.png",
    featured: false,
  },
  {
    name: "Dr. Allen Hartzler",
    specialty: "Cardiologist",
    image: "/images/doctor.png",
    featured: false,
  },
];

const facilities = [
  {
    icon: MdHeadphones,
    title: "Online Sessions",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Etiam eu turpis molestie.",
  },
  {
    icon: MdEmergency,
    title: "Emergency Care",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Etiam eu turpis molestie.",
  },
  {
    icon: MdDesktopWindows,
    title: "Instant Operation",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Etiam eu turpis molestie.",
  },
  {
    icon: MdLock,
    title: "Private & Secure",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Etiam eu turpis molestie.",
  },
  {
    icon: MdAirportShuttle,
    title: "Outdoor Service",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Etiam eu turpis molestie.",
  },
];

const benefits = [
  "Your Own Family Doctor at Home",
  "Health Beyond Symptoms",
  "Continuity of Care",
  "Whole Family Approach",
  "Personalized Treatment Plans",
  "Preventive Health Monitoring",
  "Holistic & Integrative Care",
  "Culturally Sensitive & Open-Minded",
  "Use of Modern Technology",
  "Advanced Labs at Home",
  "24/7 Accessibility",
  "No Waiting, No Crowds",
];

const patientStories = [
  {
    name: "Sarah Ahmed",
    role: "Patient",
    image: "/images/doctor.png",
    rating: 5,
    story: "NADZ Healthcare provided exceptional care for my elderly mother. The doctor was compassionate, professional, and always available when we needed them. Highly recommend!",
  },
  {
    name: "Mohammed Al-Rashid",
    role: "Patient",
    image: "/images/doctor.png",
    rating: 5,
    story: "The convenience of having a doctor come to our home was incredible. The team was knowledgeable, caring, and made us feel comfortable throughout the entire process.",
  },
  {
    name: "Fatima Hassan",
    role: "Patient",
    image: "/images/doctor.png",
    rating: 5,
    story: "As a busy professional, NADZ Healthcare saved me so much time. The quality of care was outstanding, and the staff was incredibly responsive to all our needs.",
  },
  {
    name: "Ahmed Khalil",
    role: "Patient",
    image: "/images/doctor.png",
    rating: 5,
    story: "We've been using NADZ Healthcare for our family for over a year now. The continuity of care and personalized attention is unmatched. Truly grateful for their services.",
  },
  {
    name: "Layla Mansour",
    role: "Patient",
    image: "/images/doctor.png",
    rating: 5,
    story: "The holistic approach to healthcare at NADZ is remarkable. They don't just treat symptoms; they care for the whole person. Exceptional service!",
  },
];

export const TrustedSection = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    area: "",
    treatment: "",
    name: "",
    phone: "",
  });
  
  const handleNext = () => {
    setCurrentSlide((prev) => {
      const maxSlide = doctors.length - 1;
      return Math.min(prev + 1, maxSlide);
    });
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/thank-you");
  };

  return (
    <section className="py-12 md:py-20 bg-[#f7f9fb]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <div className="flex-1 w-full md:w-auto md:flex-[1_1_60%] flex justify-center">
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-[600px]"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-primary-main leading-tight mb-6">
                Trusted by Families Across Dubai
              </h2>
              <p className="text-base md:text-lg text-text-gray leading-relaxed mb-10">
                Families rely on NADZ for advanced technology, licensed experts, and 24-hour
                home care that provides prompt, expert medical response to keep your loved
                ones safe and well.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 sm:gap-6 md:gap-8 mt-8 justify-center">
                {trustFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <MotionDiv
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex flex-col gap-4 items-center text-center">
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary-main/10">
                          <IconComponent className="text-4xl text-primary-main" />
                        </div>
                        <p className="text-sm font-medium text-text-gray max-w-[120px]">
                          {feature.title}
                        </p>
                      </div>
                    </MotionDiv>
                  );
                })}
              </div>
            </MotionDiv>
          </div>

          <div className="flex-1 w-full md:w-[480px] md:flex-[0_0_480px] md:mr-10">
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-[14px] p-6 md:p-8 shadow-xl w-full">
                <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 mb-6">
                  Choose a service
                </h3>

                <div className="flex flex-col gap-5 w-full">
                  <div className="w-full">
                    <label className="block font-medium text-gray-900 mb-2 text-sm">
                      Your area
                    </label>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-[#F7FAFC] rounded-full h-12 px-4 border border-gray-300 focus:border-primary-main focus:outline-none"
                    >
                      <option value="">Select your area</option>
                      {areaOptions.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="block font-medium text-gray-900 mb-2 text-sm">
                      Treatment
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full bg-[#F7FAFC] rounded-full h-12 px-4 border border-gray-300 focus:border-primary-main focus:outline-none"
                    >
                      <option value="">Select treatment</option>
                      {treatmentOptions.map((treatment) => (
                        <option key={treatment} value={treatment}>
                          {treatment}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="block font-medium text-gray-900 mb-2 text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F7FAFC] rounded-full h-12 px-4 border border-gray-300 focus:border-primary-main focus:outline-none"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block font-medium text-gray-900 mb-2 text-sm">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#F7FAFC] rounded-full h-12 px-4 border border-gray-300 focus:border-primary-main focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 h-12 text-base font-semibold rounded-full bg-[#45a4d0] text-white hover:bg-[#3a8cb0] hover:shadow-lg transition-all"
                  >
                    Submit request
                  </button>
                </div>
              </form>
            </MotionDiv>
          </div>
        </div>

        <div className="mt-16 md:mt-24 py-12 md:py-16 bg-white">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-12 md:mb-16">
                  How it works
                </h2>
              </MotionDiv>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 max-w-[900px] mx-auto">
                {[1, 2, 3].map((step, index) => (
                  <MotionDiv
                    key={step}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center relative z-10 flex-1"
                  >
                    <div className="w-20 h-20 md:w-25 md:h-25 rounded-full bg-primary-main/10 flex items-center justify-center mb-4">
                      <p className="text-3xl md:text-4xl font-bold text-primary-main">{step}</p>
                    </div>
                    <p className="text-sm md:text-base font-medium text-text-gray text-center">
                      {step === 1 && "Choose a service"}
                      {step === 2 && "We dispatch a professional"}
                      {step === 3 && "You receive care"}
                    </p>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
