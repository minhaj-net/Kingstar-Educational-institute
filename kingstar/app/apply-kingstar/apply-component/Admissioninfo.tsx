import { useState } from "react";

const deadlines = [
  { type: "Early Decision 1", application: "November 1", decision: "December 15" },
  { type: "Early Decision 2", application: "January 1", decision: "February 15" },
  { type: "Regular Decision", application: "January 1", decision: "April 1" },
];

const requirements = [
  "Contact information for the counselor or other school representative who will complete your Common Application School Report and submit your official high school transcript.",
  "Contact information for one teacher (or two, maximum) who will complete the Teacher Evaluation form.",
  "Nonrefundable $50 application fee. Students who are unable to pay the application fee can request a fee waiver.",
];

export default function AdmissionInfo() {
  const [tourHovered, setTourHovered] = useState(false);
  const [infoHovered, setInfoHovered] = useState(false);

  return (
    <section className="w-full bg-white font-sans px-4 py-10 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            Things To Know First
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            The Common Application is required for students applying to any or all
            of KU's three degree. You'll be able to choose your campus and programs
            that you are interested in.
          </p>

          <div className="flex flex-col gap-1">
            <p className="text-gray-700 text-sm sm:text-base font-medium mb-2">
              You will need :
            </p>
            <ul className="flex flex-col gap-4">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  {/* Custom circle-dot icon */}
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 border-[#3aaa5c] flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#3aaa5c]" />
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              onMouseEnter={() => setTourHovered(true)}
              onMouseLeave={() => setTourHovered(false)}
              className={`px-6 py-4 text-sm sm:text-base font-semibold text-white rounded-sm transition-all duration-200 ${
                tourHovered ? "bg-[#2e8f4d]" : "bg-[#3aaa5c]"
              }`}
            >
              Request a campus tour
            </button>
            <button
              onMouseEnter={() => setInfoHovered(true)}
              onMouseLeave={() => setInfoHovered(false)}
              className={`px-6 py-4 text-sm sm:text-base font-semibold text-white rounded-sm transition-all duration-200 ${
                infoHovered ? "bg-[#2e8f4d]" : "bg-[#3aaa5c]"
              }`}
            >
              Request information
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-10">

          {/* When To Apply */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-5">
              When To Apply?
            </h2>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-sm">
              <table className="w-full border-collapse text-sm sm:text-base">
                <thead>
                  <tr>
                    <th className="bg-[#3aaa5c] text-white py-3 px-4 text-center font-semibold w-1/3" />
                    <th className="bg-[#3aaa5c] text-white py-3 px-4 text-center font-semibold w-1/3">
                      Application Deadline
                    </th>
                    <th className="bg-[#3aaa5c] text-white py-3 px-4 text-center font-semibold w-1/3">
                      Decision
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deadlines.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="py-3 px-4 text-center text-gray-700">
                        {row.type}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {row.application}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {row.decision}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Where To Submit */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-3">
              Where to submit necessary documents?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">
              Documents not submitted through the online method can be mailed to:
            </p>
            <address className="not-italic text-gray-500 text-sm sm:text-base leading-relaxed">
              Box 35300
              <br />
              1810 Campus Way NE
              <br />
              Bothell, WA 98011-8246 USA
            </address>
          </div>

        </div>
      </div>
    </section>
  );
}