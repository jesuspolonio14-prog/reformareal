'use client'

import { useState } from 'react'

interface Faq { q: string; a: string }

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [abierto, setAbierto] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <div key={f.q} className="border border-[#E8DFD8] rounded-2xl overflow-hidden">
          <button
            onClick={() => setAbierto(abierto === i ? null : i)}
            className="w-full text-left px-6 py-5 flex justify-between items-start gap-4 hover:bg-[#F7F3EE] transition-colors"
          >
            <span className="font-bold text-base leading-snug">{f.q}</span>
            <svg
              className={`w-5 h-5 text-[#C4531A] shrink-0 mt-0.5 transition-transform duration-200 ${abierto === i ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {abierto === i && (
            <div className="px-6 pb-5 text-[#6B5B4E] text-sm leading-relaxed border-t border-[#F0EAE4] pt-4">
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
