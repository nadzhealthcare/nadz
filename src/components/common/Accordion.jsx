"use client";

import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

export default function AccordionExpandIcon({ items = [] }) {
  const [expanded, setExpanded] = useState({});

  const toggle = (index) => {
    setExpanded(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const defaultItems = [
    { title: "Accordion 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
    { title: "Accordion 2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
    { title: "Accordion 3", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
    { title: "Accordion 4", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
  ];

  const accordionItems = items.length > 0 ? items : defaultItems;

  return (
    <div>
      {accordionItems.map((item, index) => (
        <div key={index} className="border-b border-neutral-lightGray first:rounded-t last:rounded-b overflow-hidden">
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            aria-expanded={expanded[index]}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <span className="font-medium text-sm md:text-base text-primary-mediumBlue">{item.title}</span>
            <MdAddCircleOutline 
              className={`transition-transform text-primary-mediumBlue text-xl md:text-2xl ${expanded[index] ? 'rotate-45' : ''}`}
            />
          </button>
          {expanded[index] && (
            <div
              id={`panel${index}-content`}
              className="px-4 pb-4 text-xs md:text-sm text-primary-mediumBlue"
            >
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
