import { useState } from "react";
import axios from 'axios';

export default function Checkup({ medications = [], labResults = [], scanners = [] }) {
    const [medicationInputs, setMedicationInputs] = useState([{ searchQuery: "", selectedMedication: null }]);
    const [labResultInputs, setLabResultInputs] = useState([{ searchQuery: "", selectedResult: null }]);
    const [scannerInputs, setScannerInputs] = useState([{ searchQuery: "", selectedScanner: null }]);
    const [result, setResult] = useState('');
    const [notes, setNotes] = useState('');

    const getFilteredMedications = (query) =>
        medications
            .filter(
                (med) => med.medication.toLowerCase().includes((query || "").toLowerCase())
            )
            .map((med) => ({
                id: med.id,
                medication: med.medication,
            }));

    const getFilteredLabResults = (query) =>
        labResults.filter((result) =>
            result.lab_results.toLowerCase().includes((query || "").toLowerCase())
        );

    // Function to filter scanners based on the search query
    const getFilteredScanners = (query) =>
        scanners.filter((scanner) =>
            scanner.scan.toLowerCase().includes((query || "").toLowerCase())
        );

    // Handle adding a new input field
    const handleAddInput = (setInputs) => {
        setInputs((prev) => [...prev, { searchQuery: "", selected: null }]);
    };

    // Handle removing an input field
    const handleRemoveInput = (index, setInputs) => {
        setInputs((prev) => prev.filter((_, i) => i !== index));
    };

    // Handle input changes for each field
    const handleInputChange = (index, type, value, setInputs) => {
        setInputs((prev) => {
            const updatedInputs = [...prev];
            updatedInputs[index] = { ...updatedInputs[index], [type]: value };
            return updatedInputs;
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const medicationIds = medicationInputs.map(input => input.selectedMedication?.id).filter(id => id);
        const labResultIds = labResultInputs.map(input => input.selectedResult?.id).filter(id => id);
        const scannerIds = scannerInputs.map(input => input.selectedScanner?.id).filter(id => id);

        try {
            const response = await axios.post('/api/checkup', {
                action_id: 1, // Replace with actual action ID
                medication_ids: medicationIds,
                lab_result_ids: labResultIds,
                scanner_ids: scannerIds,
                result,
                notes,
            });

            console.log('Success:', response.data.message);
        } catch (error) {
            console.error('Error:', error.response?.data?.error || error.message);
        }
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Checkup Form</h1>

            <form onSubmit={handleSubmit}>
                {/* Dynamic Input Fields for Medications */}
                <div className="flex justify-between gap-[5rem]">
                    <div className="min-w-[18em] flex-1">
                        {medicationInputs.map((input, index) => (
                            <div key={index} className="mb-4 border rounded-lg p-2 shadow-sm">
                                <label htmlFor={`medication_select_${index}`} className="font-bold block mb-1">
                                    Select Medication {index + 1}
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id={`medication_select_${index}`}
                                        value={input.searchQuery || ""}
                                        onChange={(e) =>
                                            handleInputChange(index, "searchQuery", e.target.value, setMedicationInputs)
                                        }
                                        onClick={() => handleInputChange(index, "isOpen", true, setMedicationInputs)}
                                        onBlur={() =>
                                            setTimeout(() => handleInputChange(index, "isOpen", false, setMedicationInputs), 300)
                                        }
                                        className="bg-amber-100 outline outline-amber-100 py-1 px-1.5 rounded-lg font-bold w-full"
                                        placeholder="Search or select..."
                                    />
                                    {input.isOpen && (
                                        <ul
                                            className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto z-10"
                                            style={{ maxHeight: "12rem" }}
                                        >
                                            {getFilteredMedications(input.searchQuery).length > 0 ? (
                                                getFilteredMedications(input.searchQuery).map((med, medIndex) => (
                                                    <li
                                                        key={medIndex}
                                                        onClick={() => {
                                                            handleInputChange(index, "searchQuery", med.medication, setMedicationInputs);
                                                            handleInputChange(index, "selectedMedication", med, setMedicationInputs);
                                                            handleInputChange(index, "isOpen", false, setMedicationInputs);
                                                        }}
                                                        className="py-2 px-3 cursor-pointer hover:bg-gray-100"
                                                    >
                                                        {med.medication}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="py-2 px-3 text-gray-500">No results found</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                                {medicationInputs.length > 1 && (
                                    <button
                                        onClick={() => handleRemoveInput(index, setMedicationInputs)}
                                        className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => handleAddInput(setMedicationInputs)}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full mb-4"
                        >
                            Add New Medication
                        </button>
                    </div>
                    <div className="min-w-[18em] flex-1">
                        {/* Dynamic Input Fields for Lab Results */}
                        {labResultInputs.map((input, index) => (
                            <div key={index} className="mb-4 border rounded-lg p-2 shadow-sm">
                                <label htmlFor={`lab_result_select_${index}`} className="font-bold block mb-1">
                                    Select Lab Result {index + 1}
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id={`lab_result_select_${index}`}
                                        value={input.searchQuery || ""}
                                        onChange={(e) => handleInputChange(index, "searchQuery", e.target.value, setLabResultInputs)}
                                        onClick={() => handleInputChange(index, "isOpen", true, setLabResultInputs)}
                                        onBlur={() => setTimeout(() => handleInputChange(index, "isOpen", false, setLabResultInputs), 300)}
                                        className="bg-amber-100 outline outline-amber-100 py-1 px-1.5 rounded-lg font-bold w-full"
                                        placeholder="Search or select..."
                                    />

                                    {input.isOpen && (
                                        <ul
                                            className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto z-10"
                                            style={{ maxHeight: "12rem" }}
                                        >
                                            {getFilteredLabResults(input.searchQuery).length > 0 ? (
                                                getFilteredLabResults(input.searchQuery).map((result, resultIndex) => (
                                                    <li
                                                        key={resultIndex}
                                                        onClick={() => {
                                                            handleInputChange(index, "searchQuery", result.lab_results, setLabResultInputs);
                                                            handleInputChange(index, "selectedResult", result, setLabResultInputs);
                                                            handleInputChange(index, "isOpen", false, setLabResultInputs);
                                                        }}
                                                        className="py-2 px-3 cursor-pointer hover:bg-gray-100"
                                                    >
                                                        {result.lab_results}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="py-2 px-3 text-gray-500">No results found</li>
                                            )}
                                        </ul>
                                    )}
                                </div>

                                {labResultInputs.length > 1 && (
                                    <button
                                        onClick={() => handleRemoveInput(index, setLabResultInputs)}
                                        className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => handleAddInput(setLabResultInputs)}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full mb-4"
                        >
                            Add New Lab Result
                        </button>
                    </div>
                    <div className="min-w-[18em] flex-1">
                        {/* Dynamic Input Fields for Scanners */}
                        {scannerInputs.map((input, index) => (
                            <div key={index} className="mb-4 border rounded-lg p-2 shadow-sm">
                                <label htmlFor={`scanner_select_${index}`} className="font-bold block mb-1">
                                    Select Scanner {index + 1}
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id={`scanner_select_${index}`}
                                        value={input.searchQuery || ""}
                                        onChange={(e) => handleInputChange(index, "searchQuery", e.target.value, setScannerInputs)}
                                        onClick={() => handleInputChange(index, "isOpen", true, setScannerInputs)}
                                        onBlur={() => setTimeout(() => handleInputChange(index, "isOpen", false, setScannerInputs), 300)}
                                        className="bg-amber-100 outline outline-amber-100 py-1 px-1.5 rounded-lg font-bold w-full"
                                        placeholder="Search or select..."
                                    />

                                    {input.isOpen && (
                                        <ul
                                            className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto z-10"
                                            style={{ maxHeight: "12rem" }}
                                        >
                                            {getFilteredScanners(input.searchQuery).length > 0 ? (
                                                getFilteredScanners(input.searchQuery).map((scanner, scannerIndex) => (
                                                    <li
                                                        key={scannerIndex}
                                                        onClick={() => {
                                                            handleInputChange(index, "searchQuery", scanner.scan, setScannerInputs);
                                                            handleInputChange(index, "selectedScanner", scanner, setScannerInputs);
                                                            handleInputChange(index, "isOpen", false, setScannerInputs);
                                                        }}
                                                        className="py-2 px-3 cursor-pointer hover:bg-gray-100"
                                                    >
                                                        {scanner.scan}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="py-2 px-3 text-gray-500">No results found</li>
                                            )}
                                        </ul>
                                    )}
                                </div>

                                {scannerInputs.length > 1 && (
                                    <button
                                        onClick={() => handleRemoveInput(index, setScannerInputs)}
                                        className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => handleAddInput(setScannerInputs)}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full mb-4"
                        >
                            Add New Scanner
                        </button>
                    </div>

                </div>


                {/* Result and Notes */}
                <div className="mb-4">
                    <label htmlFor="result" className="font-bold block mb-1">Result</label>
                    <textarea
                        id="result"
                        value={result}
                        onChange={(e) => setResult(e.target.value)}
                        className="bg-amber-100 outline outline-amber-100 py-1 px-1.5 rounded-lg font-bold w-full"
                        placeholder="Enter result..."
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="notes" className="font-bold block mb-1">Notes</label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="bg-amber-100 outline outline-amber-100 py-1 px-1.5 rounded-lg font-bold w-full"
                        placeholder="Enter notes..."
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 max-w-fit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
