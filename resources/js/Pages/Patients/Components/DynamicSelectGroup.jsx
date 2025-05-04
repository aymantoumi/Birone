// components/DynamicSelectGroup.jsx
import React from "react";

export default function DynamicSelectGroup({
  title,
  options,
  values,
  onChange,
  onAdd,
  namePrefix,
}) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <h1 className="dark:text-gray-200 text-xl font-extrabold">{title}</h1>
      <div className="flex flex-col flex-wrap gap-3">
        {values.map((value, index) => (
          <div key={index} className="flex flex-col gap-1">
            <select
              className="rounded-xl w-[16rem]"
              name={`${namePrefix}-${index}`}
              id={`${namePrefix}-${index}`}
              value={value || ""}
              onChange={(e) => onChange(index, e.target.value)}
            >
              <option value="">Select an option</option>
              {options.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button
          type="button"
          onClick={onAdd}
          className="text-green-600 text-2xl"
        >
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      </div>
    </div>
  );
}
