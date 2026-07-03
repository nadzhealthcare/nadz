"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { testimonials } from "@/data/landing";

const MotionDiv = motion.div;

export const TestimonialsSection = () => (
  <section className="py-16 md:py-20 bg-[#F5F3FF]/30">
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-4 text-center mb-12">
        <p className="text-text-secondary uppercase tracking-widest text-xs">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Why Our Patients Recommend Us
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.author}>
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full bg-white rounded-[14px] shadow-card border border-neutral-lightGray p-8"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed font-normal">
                  "{testimonial.quote}"
                </p>
                <div className="flex flex-row gap-4 items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-text-secondary">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        ))}
      </div>
    </div>
  </section>
);
