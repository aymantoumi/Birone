import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import DynamicSelectGroup from "./DynamicSelectGroup";

export default function CTScans({ scans }) {
  const { data, setData } = useForm({
    selectedScans: [null],
  });

  const [selectCount, setSelectCount] = useState(1);

  const handleChange = (index, value) => {
    const updated = [...data.selectedScans];
    updated[index] = value;
    setData("selectedScans", updated);
  };

  const addNew = () => {
    setSelectCount((prev) => prev + 1);
    setData("selectedScans", [...data.selectedScans, null]);
  };

  const formattedOptions = scans.map((s) => ({ id: s.id, label: s.scan }));

  return (
    <DynamicSelectGroup
      title="CT Scans"
      options={formattedOptions}
      values={data.selectedScans}
      onChange={handleChange}
      onAdd={addNew}
      namePrefix="scans"
    />
  );
}
