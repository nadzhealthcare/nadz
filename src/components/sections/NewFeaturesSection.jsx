"use client";

import { motion } from "framer-motion";
import { MdVerifiedUser, MdSpeed, MdAnalytics } from "react-icons/md";

const MotionDiv = motion.div;

export const NewFeaturesSection = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col gap-6">
                <div className="w-16 h-16 rounded-full bg-primary-main flex items-center justify-center">
                  <MdVerifiedUser className="text-3xl text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Your Trusted Healthcare Providers
                </h3>
                <p className="text-base md:text-lg text-text-gray leading-relaxed">
                  We route all orders directly and do not participate in payment flow as a source
                  of revenue. Your health and trust are our top priorities.
                </p>
                <button className="self-start px-6 py-3 bg-[#E3C699] text-[#5C2533] rounded-[14px] font-semibold text-base shadow-lg hover:bg-[#d4b588] hover:shadow-xl transition-all">
                  Book an appointment
                </button>
              </div>
            </MotionDiv>
          </div>

          <div>
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex flex-col gap-6">
                <div className="w-16 h-16 rounded-full bg-primary-main flex items-center justify-center">
                  <MdSpeed className="text-3xl text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Very fast and accurate service with us
                </h3>
                <p className="text-base md:text-lg text-text-gray leading-relaxed">
                  Connect with our professional doctors who are ready to help you manage your health.
                </p>
                <div className="rounded-[14px] overflow-hidden shadow-xl mt-4">
                  <div className="p-6 bg-[#F7FAFC]">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary-main flex items-center justify-center text-white font-bold">
                          H
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Hi Madhu</p>
                          <p className="text-xs text-text-gray">Jakarta, Indonesia</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-[14px] p-4 border border-gray-200">
                        <p className="text-sm text-text-gray mb-2">Appointment Scheduled</p>
                        <p className="text-xs text-text-gray">7 October 2021, 08:00 AM - 09:00 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>

          <div>
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col gap-6">
                <div className="w-16 h-16 rounded-full bg-primary-main flex items-center justify-center">
                  <MdAnalytics className="text-3xl text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Analysis your physical performance from anywhere
                </h3>
                <p className="text-base md:text-lg text-text-gray leading-relaxed">
                  Track your health metrics including body mass index (BMI), skinfold measurements,
                  or bioelectrical impedance analysis.
                </p>
                <div className="rounded-[14px] overflow-hidden shadow-xl mt-4 bg-[#F7FAFC]">
                  <div className="p-6">
                    <div className="flex flex-col gap-4">
                      {["Alex", "Hamilton", "Jenny", "Methio"].map((name, index) => (
                        <div key={name} className="flex items-center gap-4">
                          <p className="min-w-[80px] text-sm font-semibold text-gray-900">
                            {name}
                          </p>
                          <div
                            className="flex-1 h-6 bg-primary-main rounded"
                            style={{ width: `${60 + index * 10}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
};
