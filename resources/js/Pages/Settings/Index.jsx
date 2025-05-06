import { useState } from 'react';
import Settings from "@/Layouts/SettingsLayout";
import { Head } from "@inertiajs/react";
import ActionsForm from "./SettingsComponents/Actions";
import Pagination from "../Components/Pagination";
import ActionUpdateDeleteModal from './SettingsComponents/ActionUpdateDelete';
import Categories from './SettingsComponents/Category';
import CategoryUpdateDelete from './SettingsComponents/CategoryUpdateDelete';
import MedicationClasses from './SettingsComponents/MedicationClass';
import MedicationClassUpdateDelete from './SettingsComponents/MedicationClassUpdateDelete';
import LabResults from './SettingsComponents/LabResults';
import LabResultUpdateDelete from './SettingsComponents/LabResultUpdateDelete';
import Scans from './SettingsComponents/Scans';
import ScannerUpdateDelete from './SettingsComponents/ScannerUpdateDelete';
import Medication from './SettingsComponents/Medication';
import MedicationUpdateDelete from './SettingsComponents/MedicationUpdateDelete';
import CheckUps from './SettingsComponents/CheckUps';
import CheckUpUpdateDelete from './SettingsComponents/CheckUpsUpdateDelete';

export default function Index({ auth, actionsType, categories, medication_classes, lab_results, scanners, medications, check_ups }) {
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedMedicationClass, setSelectedMedicationClass] = useState(null);
    const [selectedLabResult, setSelectedLabResult] = useState(null);
    const [selectedScanner, setSelectedScanner] = useState(null);
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [selectedCheckUp, setSelectedCheckUp] = useState(null);

    const handleActionClick = (action) => {
        setSelectedAction(action);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleMedicationClassClick = (medication_class) => {
        setSelectedMedicationClass(medication_class);
    };

    const handleScannersClick = (scanner) => {
        setSelectedScanner(scanner);
    };

    const handleMedicationClick = (medication) => {
        setSelectedMedication(medication);
    };

    const handleCheckUpClick = (check_up) => {
        setSelectedCheckUp(check_up);
    };


    const closeCheckUpModal = () => {
        setSelectedCheckUp(null);
    };

    const closeActionModal = () => {
        setSelectedAction(null);
    };

    const closeCategoryModal = () => {
        setSelectedCategory(null);
    };

    const closeMedicationClassModal = () => {
        setSelectedMedicationClass(null);
    };

    const closeMedicationModal = () => {
        setSelectedMedication(null);
    };

    const handleLabResultsClick = (labResult) => {
        setSelectedLabResult(labResult);
    };

    const closeLabResultModal = () => {
        setSelectedLabResult(null);
    };

    const closeScannerModal = () => {
        setSelectedScanner(null);
    };

    return (
        <Settings
            user={auth.user}
            header={<h2 className="font-semibold text-xl dark:text-gray-200 leading-tight">Settings</h2>}
        >
            <Head title="Settings" />
            <section className="py-8 px-12 flex flex-wrap gap-4">
                {/* Actions management */}
                <div className="bg-cadetblue min-w-[25em] min-h-[6em] p-8 rounded-3xl flex-1 dark:bg-gray-700 bg-sky-300">
                    <h1 className="text-2xl font-extrabold">Actions Management</h1>
                    <div className="flex flex-col gap-5">
                        <ActionsForm />
                        <div className="flex-1 min-w-[8em] min-h-[6em] bg-sky-700 rounded-xl px-6 py-4">
                            {actionsType && actionsType.data && actionsType.data.length > 0 ? (
                                actionsType.data.map((action) => (
                                    <div
                                        key={action.id}
                                        className="bg-white p-4 mb-2 rounded-lg shadow-sm cursor-pointer"
                                        onClick={() => handleActionClick(action)}
                                    >
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{action.action}</h3>
                                            <p className="text-sm text-gray-500">
                                                Created At: {new Date(action.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 p-4">No actions available.</p>
                            )}
                            <Pagination links={actionsType.links} />
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="bg-cadetblue min-w-[25em] min-h-[6em] p-8 rounded-3xl flex-1 dark:text-amber-950  bg-sky-300 ">
                    <h1 className="text-2xl font-extrabold">Categories Management</h1>
                    <div className="flex flex-col gap-5 ">
                        <Categories />
                        <div className="flex-1 min-w-[8em] min-h-[6em] bg-sky-700 rounded-xl px-6 py-4">
                            {categories && categories.data && categories.data.length > 0 ? (
                                categories.data.map((category) => (
                                    <div
                                        key={category.id}
                                        className="bg-white p-4 mb-2 rounded-lg shadow-sm cursor-pointer"
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{category.category}</h3>
                                            <p className="text-sm text-gray-500">
                                                Created At: {new Date(category.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 p-4">No categories available.</p>
                            )}
                            <Pagination links={categories.links} />
                        </div>
                    </div>
                </div>

                {/* Lab Results */}
                <div className="bg-cadetblue min-w-[25em] min-h-[6em] p-8 rounded-3xl flex-1 dark:bg-gray-700 bg-sky-300 ">
                    <h1 className="text-2xl font-extrabold">Lab Results</h1>
                    <div className="flex flex-col gap-5">
                        <LabResults />
                        <div className="flex-1 min-w-[8em] min-h-[6em] bg-sky-700 rounded-xl px-6 py-4">
                            {lab_results?.data?.length > 0 ? (
                                lab_results.data.map((lab_result) => (
                                    <div
                                        key={lab_result.id}
                                        className="bg-white p-4 mb-2 rounded-lg shadow-sm cursor-pointer"
                                        onClick={() => handleLabResultsClick(lab_result)}
                                    >
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{lab_result.lab_results}</h3>
                                            <p className="text-sm text-gray-500">
                                                Created At: {new Date(lab_result.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center">No lab results available.</p>
                            )}
                            <Pagination links={lab_results.links} />
                        </div>
                    </div>
                </div>

                {/* Medication Class */}
                <div className="bg-cadetblue min-w-[25em] min-h-[6em] p-8 rounded-3xl flex-1 dark:text-amber-950  bg-sky-300 ">
                    <h1 className="text-2xl font-extrabold">Medication Class</h1>
                    <div className="flex flex-col gap-5 ">
                        <MedicationClasses />
                        <div className="flex-1 min-w-[8em] min-h-[6em] bg-sky-700 rounded-xl px-6 py-4">
                            {medication_classes && medication_classes.data && medication_classes.data.length > 0 ? (
                                medication_classes.data.map((medication_class) => (
                                    <div
                                        key={medication_class.id}
                                        className="bg-white p-4 mb-2 rounded-lg shadow-sm cursor-pointer"
                                        onClick={() => handleMedicationClassClick(medication_class)}
                                    >
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{medication_class.medication_class}</h3>
                                            <p className="text-sm text-gray-500">
                                                Created At: {new Date(medication_class.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 p-4">No medication classes available.</p>
                            )}
                            <Pagination links={medication_classes.links} />
                        </div>
                    </div>
                </div>

                {/* Medication Form */}
                <div className="bg-cadetblue min-w-[25em] min-h-[6em] p-8 rounded-3xl flex-1 dark:text-amber-950  bg-sky-300 ">
                    <h1 className="text-2xl font-extrabold">Add Medication</h1>
                    <div className="flex flex-col gap-5 ">
                        <Medication medicationClass={medication_classes} />
                        <div className="flex-1 min-w-[8em] min-h-[6em] bg-sky-700 rounded-xl px-6 py-4">
                            {medications && medications.data && medications.data.length > 0 ? (
                                medications.data.map((medication) => (
                                    <div
                                        key={medication.id}
                                        className="bg-white p-4 mb-2 rounded-lg shadow-sm cursor-pointer"
                                        onClick={() => handleMedicationClick(medication)}
                                    >
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{medication.medication}</h3>
                                            <p className="text-sm text-gray-500">
                                                Created At: {new Date(medication.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 p-4">No medication available.</p>
                            )
                            }
                            <Pagination links={medications.links} />
                        </div>
                    </div>
                </div>

                <div className="bg-cadetblue min-w-[25em] min-h-[6em] p-8 rounded-3xl flex-1 dark:text-amber-950  bg-sky-300 ">
                    <h1 className="text-2xl font-extrabold">Scans</h1>
                    <div className="flex flex-col gap-5 ">
                        <Scans />
                        <div className="flex-1 min-w-[8em] min-h-[6em] bg-sky-700 rounded-xl px-6 py-4">
                            {scanners && scanners.data && scanners.data.length > 0 ? (
                                scanners.data.map((scanner) => (
                                    <div
                                        key={scanner.id}
                                        className="bg-white p-4 mb-2 rounded-lg shadow-sm cursor-pointer"
                                        onClick={() => handleScannersClick(scanner)}
                                    >
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{scanner.scan}</h3>
                                            <p className="text-sm text-gray-500">
                                                Created At: {new Date(scanner.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 p-4">No medication classes available.</p>
                            )}
                            <Pagination links={scanners.links} />
                        </div>
                    </div>
                </div>
                <div className="bg-cadetblue min-w-[25em] min-h-[6em] p-8 rounded-3xl flex-1 dark:text-amber-950  bg-sky-300 ">
                    <h1 className="text-2xl font-extrabold">Check Up</h1>
                    <div className="flex flex-col gap-5 ">
                        <CheckUps />
                        <div className="flex-1 min-w-[8em] min-h-[6em] bg-sky-700 rounded-xl px-6 py-4">
                            {check_ups && check_ups.data && check_ups.data.length > 0 ? (
                                check_ups.data.map((check_up) => (
                                    <div
                                        key={check_up.id}
                                        className="bg-white p-4 mb-2 rounded-lg shadow-sm cursor-pointer"
                                        onClick={() => handleCheckUpClick(check_up)}
                                    >
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{check_up.check_up}</h3>
                                            <p className="text-sm text-gray-500">
                                                Created At: {new Date(check_up.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 p-4">No medication classes available.</p>
                            )}
                            <Pagination links={check_ups.links} />
                        </div>
                    </div>
                </div>
            </section>
            {/* Update/Delete Modals */}
            {selectedCheckUp && (
                <CheckUpUpdateDelete
                    check_up={selectedCheckUp}
                    onClose={closeCheckUpModal}
                />)}
            {selectedAction && (
                <ActionUpdateDeleteModal action={selectedAction} onClose={closeActionModal} />
            )}
            {selectedCategory && (
                <CategoryUpdateDelete
                    category={selectedCategory}
                    onClose={closeCategoryModal}
                />
            )}
            {selectedMedicationClass && (
                <MedicationClassUpdateDelete
                    medication={selectedMedicationClass}
                    onClose={closeMedicationClassModal}
                />
            )}
            {selectedLabResult && (
                <LabResultUpdateDelete
                    labResult={selectedLabResult}
                    onClose={closeLabResultModal}
                />
            )}
            {selectedScanner && (
                <ScannerUpdateDelete
                    scanner={selectedScanner}
                    onClose={closeScannerModal}
                />
            )}
            {selectedMedication && (
                <MedicationUpdateDelete
                    medication={selectedMedication}
                    medicationClasses={medication_classes} // Ensure this prop is passed correctly
                    onClose={closeMedicationModal}
                    onDeleteSuccess={closeMedicationModal}
                />
            )}
        </Settings>
    );
}
