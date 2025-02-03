import { useState } from 'react';
import Settings from "@/Layouts/SettingsLayout";
import { Head } from "@inertiajs/react";
import ActionsForm from "./SettingsComponents/Actions";
import Pagination from "../Components/Pagination";
import ActionUpdateDeleteModal from './SettingsComponents/ActionUpdateDelete';
import Categories from './SettingsComponents/Category';
import CategoryUpdateDelete from './SettingsComponents/CategoryUpdateDelete';

export default function Index({ auth, actionsType, categories }) {
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleActionClick = (action) => {
        setSelectedAction(action);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const closeActionModal = () => {
        setSelectedAction(null);
    };

    const closeCategoryModal = () => {
        setSelectedCategory(null);
    };

    const handleCategoryDeleteSuccess = () => {
        // Optionally, refresh the categories or trigger any other side effect
        // after a category is successfully deleted.
    };

    return (
        <Settings
            user={auth.user}
            header={<h2 className="font-semibold text-xl dark:text-gray-200 leading-tight">Settings</h2>}
        >
            <Head title="Settings" />
            <section className="py-8 px-12 flex flex-wrap gap-4">
                {/* Actions management */}
                <div className="bg-cadetblue min-w-[25em] min-h-[6em] p-8 rounded-3xl flex-1 dark:bg-gray-700 bg-sky-400">
                    <h1 className="dark:text-amber-950 text-2xl font-extrabold">Actions Management</h1>
                    <div className="flex flex-col gap-5">
                        {/* Actions Form */}
                        <ActionsForm />
                        {/* Actions List */}
                        <div className="flex-1 min-w-[8em] min-h-[6em] bg-stone-400 rounded-xl px-6 py-4">
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
                <div className="bg-cadetblue min-w-[25em] min-h-[6em] p-8 rounded-3xl flex-1 dark:bg-gray-700 bg-sky-400">
                    <h1 className="dark:text-amber-950 text-2xl font-extrabold">Categories Management</h1>
                    <div className="flex flex-col gap-5 ">
                        <Categories />
                        <div className="flex-1 min-w-[8em] min-h-[6em] bg-stone-400 rounded-xl px-6 py-4">
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

                {/* Blood Groups */}
                <div className="bg-cadetblue min-w-[25em] min-h-[6em] p-8 rounded-3xl flex-1 dark:bg-stone-100 bg-sky-400">
                    <h1 className="dark:text-amber-950 text-2xl font-extrabold">Blood Groups</h1>
                </div>

                {/* Medication Class */}
                <div className="bg-cadetblue min-w-[25em] min-h-[6em] p-8 rounded-3xl flex-1 dark:bg-stone-100 bg-sky-400">
                    <h1 className="dark:text-amber-950 text-2xl font-extrabold">Medication Class</h1>
                </div>
            </section>

            {/* Update/Delete Modals */}
            {selectedAction && (
                <ActionUpdateDeleteModal action={selectedAction} onClose={closeActionModal} />
            )}
            {selectedCategory && (
                <CategoryUpdateDelete
                    category={selectedCategory}
                    onClose={closeCategoryModal}
                    onDeleteSuccess={handleCategoryDeleteSuccess}
                />
            )}
        </Settings>
    );
}
