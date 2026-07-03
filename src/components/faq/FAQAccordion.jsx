'use client';

import { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

export const FAQAccordion = ({ categories = [] }) => {
  const [openCategories, setOpenCategories] = useState({});
  const [openQuestions, setOpenQuestions] = useState({});

  const safeCategories = Array.isArray(categories) ? categories : [];

  const toggleCategory = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const toggleQuestion = (categoryId, questionIndex) => {
    const key = `${categoryId}-${questionIndex}`;
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-4 md:space-y-5 max-w-4xl">
      {safeCategories.map((category, index) => {
        // Use categoryId from Strapi, or id from JSON, or fallback to index + 1 for internal use
        const categoryId = category.categoryId || category.id || (index + 1);
        // Always display sequential numbers starting from 1
        const displayNumber = index + 1;
        
        return (
          <div
            key={categoryId}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(categoryId)}
              className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-left bg-gradient-to-r from-primary-light/5 to-primary-main/5 hover:from-primary-light/10 hover:to-primary-main/10 transition-all"
            >
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-normal mb-0 pb-0 border-b-0">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  {displayNumber}. {category.title}
                </span>
              </h2>
              {openCategories[categoryId] ? (
                <MdExpandLess className="w-5 h-5 text-primary-main flex-shrink-0" />
              ) : (
                <MdExpandMore className="w-5 h-5 text-primary-main flex-shrink-0" />
              )}
            </button>

            {/* Category Questions */}
            {openCategories[categoryId] && (
            <div className="px-4 md:px-6 py-3 space-y-3">
              {(category.questions || category.items || []).map((item, questionIndex) => (
                <div
                  key={questionIndex}
                  className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0"
                >
                  <button
                    onClick={() => toggleQuestion(categoryId, questionIndex)}
                    className="w-full flex items-start justify-between text-left gap-3"
                  >
                    <h3 className="text-xs sm:text-sm md:text-sm font-semibold flex-1">
                      <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                        {item.q ?? item.question ?? ''}
                      </span>
                    </h3>
                    {openQuestions[`${categoryId}-${questionIndex}`] ? (
                      <MdExpandLess className="w-4 h-4 text-primary-main flex-shrink-0 mt-0.5" />
                    ) : (
                      <MdExpandMore className="w-4 h-4 text-primary-main flex-shrink-0 mt-0.5" />
                    )}
                  </button>
                  {openQuestions[`${categoryId}-${questionIndex}`] && (
                    <p className="text-xs sm:text-sm text-text-gray leading-relaxed mt-2 pl-0">
                      {item.a ?? item.answer ?? ''}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        );
      })}
    </div>
  );
};

