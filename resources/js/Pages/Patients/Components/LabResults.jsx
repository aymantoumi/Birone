import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import DynamicSelectGroup from "./DynamicSelectGroup";

export default function LabResults({ labResults }) {
  const { data, setData } = useForm({
    selectedLabResults: [null],
  });

  const [selectCount, setSelectCount] = useState(1);

  const handleChange = (index, value) => {
    const updated = [...data.selectedLabResults];
    updated[index] = value;
    setData("selectedLabResults", updated);
  };

  const addNew = () => {
    setSelectCount((prev) => prev + 1);
    setData("selectedLabResults", [...data.selectedLabResults, null]);
  };

  const formattedOptions = labResults.map((lab) => ({ id: lab.id, label: lab.lab_results }));

  return (
    <DynamicSelectGroup
      title="Lab Results"
      options={formattedOptions}
      values={data.selectedLabResults}
      onChange={handleChange}
      onAdd={addNew}
      namePrefix="labResults"
    />
  );
}
