import { useState } from "react";

export default function CustomSelect({ options, value, onChange }) {
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full md:w-48">
      {/* BUTTON */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-left shadow-sm hover:shadow-md transition"
      >
        <div className="flex justify-between items-center">
          <span>{selected.label}</span>
          <span
            className={`text-gray-500 text-lg ml-2 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </div>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-[#f5e6e8] transition ${
                value === opt.value ? "bg-[#f9f1f2] font-medium" : ""
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
