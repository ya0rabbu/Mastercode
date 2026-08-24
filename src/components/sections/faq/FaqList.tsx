"use client";

import { useState } from "react";

import FaqItem from "./FaqItem";
import { faqs } from "@/data/faq";

export default function FaqList() {
  /** Figma ships item 1 open (bold question + visible answer). */
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex w-full flex-1 flex-col rounded-frame bg-bg-white px-5 py-4 sm:px-6 lg:px-10 lg:py-6">
      {faqs.map((faq, index) => (
        <FaqItem
          key={faq.question}
          faq={faq}
          open={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
}
