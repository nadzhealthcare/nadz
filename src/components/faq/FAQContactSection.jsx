'use client';

import { useState } from 'react';
import { BookNowDialog } from '@/components/common/BookNowDialog';

export const FAQContactSection = ({ contactSection }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-br from-primary-light/10 to-primary-main/10 border border-primary-main/20 rounded-[14px] p-6 md:p-8 mt-12">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-dark mb-3">
          {contactSection.title}
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-gray mb-4">
          {contactSection.description}
        </p>
        <button
          onClick={() => setDialogOpen(true)}
          className="inline-block bg-gradient-to-r from-primary-mediumBlue to-primary-main text-white px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          {contactSection.ctaText}
        </button>
      </div>
      <BookNowDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

