"use client";

import { useState } from "react";
import type { AdmissionInfoData } from "./types";

interface Props {
  data: AdmissionInfoData;
}

export default function AdmissionInfo({ data }: Props) {
  const [tourHovered, setTourHovered] = useState(false);
  const [infoHovered, setInfoHovered] = useState(false);

  const { thingsToKnow, whenToApply, whereToSubmit } = data;
  const addressLines = whereToSubmit.address.split("\n");

  return (
    <section className="w-full bg-white font-sans px-4 py-10 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* LEFT — Things To Know First */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {thingsToKnow.heading}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {thingsToKnow.intro}
          </p>
          <div className="flex flex-col gap-1">
            <p className="text-gray-700 text-sm sm:text-base font-medium mb-2">
              {thingsToKnow.requirementsLabel}
            </p>
            <ul className="flex flex-col gap-4">
              {thingsToKnow.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 border-[#3aaa5c] flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#3aaa5c]" />
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              onMouseEnter={() => setTourHovered(true)}
              onMouseLeave={() => setTourHovered(false)}
              className={`px-6 py-4 text-sm sm:text-base font-semibold text-white rounded-sm transition-all duration-200 ${
                tourHovered ? "bg-[#2e8f4d]" : "bg-[#3aaa5c]"
              }`}
            >
              {thingsToKnow.btn1}
            </button>
            <button
              onMouseEnter={() => setInfoHovered(true)}
              onMouseLeave={() => setInfoHovered(false)}
              className={`px-6 py-4 text-sm sm:text-base font-semibold text-white rounded-sm transition-all duration-200 ${
                infoHovered ? "bg-[#2e8f4d]" : "bg-[#3aaa5c]"
              }`}
            >
              {thingsToKnow.btn2}
            </button>
          </div>
        </div>

        {/* RIGHT — When To Apply + Where To Submit */}
        <div className="flex flex-col gap-10">

          {/* When To Apply */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-5">
              {whenToApply.heading}
            </h2>
            <div className="w-full overflow-x-auto rounded-sm">
              <table className="w-full border-collapse text-sm sm:text-base">
                <thead>
                  <tr>
                    <th className="bg-[#3aaa5c] text-white py-3 px-4 text-center font-semibold w-1/3" />
                    {whenToApply.tableHeaders.map((h) => (
                      <th key={h} className="bg-[#3aaa5c] text-white py-3 px-4 text-center font-semibold w-1/3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {whenToApply.deadlines.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                      <td className="py-3 px-4 text-center text-gray-700">{row.type}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{row.application}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{row.decision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Where To Submit */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-3">
              {whereToSubmit.heading}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">
              {whereToSubmit.intro}
            </p>
            <address className="not-italic text-gray-500 text-sm sm:text-base leading-relaxed">
              {addressLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < addressLines.length - 1 && <br />}
                </span>
              ))}
            </address>
          </div>

        </div>
      </div>
    </section>
  );
}
