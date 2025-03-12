import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function CTScans({ scans, action_id }) {
    const { data, setData, post, processing } = useForm({
        selectedScans: [null],
        action_id: action_id || null,
    });

    // State to track the number of select inputs
    const [selectCount, setSelectCount] = useState(1);

    // Handle scan selection change
    const handleScanChange = (index, value) => {
        const updatedScans = [...data.selectedScans];
        updatedScans[index] = value;
        setData("selectedScans", updatedScans);
    };

    // Add a new select input
    const addNewSelect = () => {
        setSelectCount((prevCount) => prevCount + 1);
        setData("selectedScans", [...data.selectedScans, null]);
    };

    useEffect(() => {
        if (action_id !== null && data.selectedScans.some(scan => scan !== null)) {
            post(route("scans.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    console.log("Data submitted successfully!");
                },
                onError: (errors) => {
                    console.error("Error submitting data:", errors);
                },
            });
        }
    }, [data.selectedScans, action_id]);

    return (
        <>
            <h1 className="dark:text-gray-200 text-xl font-extrabold">CT Scans</h1>
            <form className="flex flex-wrap gap-4">
                <input type="hidden" value={action_id} />
                <div className="flex flex-col flex-wrap items-center gap-3 min-w-full">
                    {Array.from({ length: selectCount }, (_, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <select
                                className="rounded-xl w-[16rem]"
                                name={`scans-${index}`}
                                id={`scans-${index}`}
                                value={data.selectedScans[index] || ""}
                                onChange={(e) => handleScanChange(index, e.target.value)}
                                disabled={processing || action_id === null}
                            >
                                <option value="">Select a scan</option>
                                {scans.map((scan) => (
                                    <option key={scan.id} value={scan.id}>
                                        {scan.scan}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addNewSelect}
                        className={`text-green-600 text-2xl ${action_id === null ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={action_id === null}
                    >
                        <i className="fa-solid fa-circle-plus"></i>
                    </button>
                </div>
            </form>
        </>
    );
}