import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import DynamicSelectGroup from "./DynamicSelectGroup";

export default function Medication({ medication }) {
  const { data, setData } = useForm({
    selectedMedications: [null],
  });

  const [selectCount, setSelectCount] = useState(1);

  const handleChange = (index, value) => {
    const updated = [...data.selectedMedications];
    updated[index] = value;
    setData("selectedMedications", updated);
  };

  const addNew = () => {
    setSelectCount((prev) => prev + 1);
    setData("selectedMedications", [...data.selectedMedications, null]);
  };

  const formattedOptions = medication.map((m) => ({ id: m.id, label: m.medication }));

  return (
    <DynamicSelectGroup
      title="Medication"
      options={formattedOptions}
      values={data.selectedMedications}
      onChange={handleChange}
      onAdd={addNew}
      namePrefix="medication"
    />
  );
}
