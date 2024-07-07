import PatientsLayout from "@/Layouts/PatientsLayout";
import { Head } from "@inertiajs/react";

export default function Patient({ auth, }) {

    return (
        <PatientsLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"> Patient name</h2>}
        >
            <Head title="Patient file" />
            <section className="py-8 px-24 grid gap-3">
                <div className="dark:bg-gray-800 py-8 px-24 rounded-lg grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 col-span-2 dark:bg-gray-900 py-5 px-12 rounded-lg">
                        <div className="flex items-center flex-wrap gap-2 min-w-fit">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                First name :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Patient</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Last name :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Patient</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Birthdate :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> 2001/01/23</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Address :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Home address</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                CIN :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> CIN number</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Gender :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Male/Female </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1 w-full dark:bg-gray-900 py-5 px-12 rounded-lg">
                        <div className="min-w-fit flex bg-slate-500 py-2 px-4 rounded-md">
                            Action : action mame
                        </div>
                        <div className="min-w-fit flex bg-slate-500 py-2 px-4 rounded-md">
                            Action : action mame
                        </div>
                        <div className="min-w-fit flex bg-slate-500 py-2 px-4 rounded-md">
                            Action : action mame
                        </div>
                        <div className="min-w-fit flex bg-slate-500 py-2 px-4 rounded-md">
                            Action : action mame
                        </div>
                    </div>
                </div>
                <div className="dark:bg-gray-800 py-8 px-24 rounded-lg grid  lg:grid-cols-2 grid-cols-1 gap-4">
                    <div className="dark:bg-gray-900 rounded-lg py-4 px-10">
                        <div className="flex items-center flex-wrap gap-2 min-w-fit justify-between">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Past Medical Conditions :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Patient</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit justify-between">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Past Surgeries :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Patient</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit justify-between">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Family Medical History  :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Patient</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit justify-between">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Smoking Status :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Patient</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit justify-between">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Alcohol Consumption :
                            </h1>
                            <span className="font-bold dark:text-gray-200"> Patient</span>
                        </div>
                    </div>
                    <div className="dark:bg-gray-900 py-8 px-24 rounded-lg grid  lg:grid-cols-2 grid-cols-1 gap-4">
                        <div className="flex items-center flex-wrap gap-2 min-w-fit ">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Allergies  :
                            </h1>
                            <ul className="flex flex-col gap-4">
                                <li className="font-bold dark:text-gray-200"> Patient</li>
                                <li className="font-bold dark:text-gray-200"> Patient</li>
                            </ul>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 min-w-fit">
                            <h1 className="font-extrabold dark:text-stone-500 text-lg">
                                Chronic Diseases :
                            </h1>
                            <ul className="flex flex-col gap-4">
                                <li className="font-bold dark:text-gray-200"> Patient</li>
                                <li className="font-bold dark:text-gray-200"> Patient</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </PatientsLayout>
    )
};