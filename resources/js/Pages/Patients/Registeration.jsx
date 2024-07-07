import PatientsLayout from "@/Layouts/PatientsLayout";
import { Head } from "@inertiajs/react";

export default function Registeration({ auth }) {
    return (
        <PatientsLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add Patients </h2>}
        >
            <Head title="Add Patients" />
            <section className="py-16 px-32">
                <div className=" dark:bg-gray-800 py-4 px-16 rounded-2xl">
                    <h1 className="font-extrabold text-3xl dark:text-gray-100 text-gray-900">Add new Patient</h1>
                    <div className="flex flex-wrap">
                        <div className="grid grid-cols-1 2xl:w-1/2 lg:grid-cols-3 md:w-full  justify-items-center gap-5 p-8 ">
                            <div className=" dark:bg-gray-700 rounded-2xl py-4 px-6 max-w-fit flex flex-col">
                                <div className="flex gap-2 dark:text-black font-extrabold text-xl ">
                                    <span>Total</span>
                                    <i class="fa-solid fa-user"></i>
                                </div>
                                <span className="font-extrabold text-lg">100</span>
                            </div>
                            <div className=" dark:bg-gray-700 rounded-2xl py-4 px-6 max-w-fit flex flex-col">
                                <div className="flex gap-2 dark:text-black font-extrabold text-xl ">
                                    <span>Waiting</span>
                                    <i class="fa-regular fa-clock"></i>
                                </div>
                                <span className="font-extrabold text-lg">100</span>
                            </div>
                            <div className=" dark:bg-gray-700 rounded-2xl py-4 px-6 max-w-fit flex flex-col">
                                <div className="flex gap-2 dark:text-black font-extrabold text-xl ">
                                    <span>Complete</span>
                                    <i class="fa-solid fa-check-double"></i>
                                </div>
                                <span className="font-extrabold text-lg">100</span>
                            </div>
                        </div>
                        <form action="" method="post" className="grid lg:grid-cols-2 gap-4 py-4 w-full">
                            <div className="flex flex-col">
                                <label htmlFor="" className="dark:text-gray-100 font-extrabold">First name </label>
                                <input type="text" name="" id="" className="max-w-96 rounded-lg" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="dark:text-gray-100 font-extrabold">Last name </label>
                                <input type="text" name="" id="" className="max-w-96 rounded-lg" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="dark:text-gray-100 font-extrabold">Gender</label>
                                <input type="text" name="" id="" className="max-w-96 rounded-lg" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="dark:text-gray-100 font-extrabold">Phone number </label>
                                <input type="text" name="" id="" className="max-w-96 rounded-lg" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="dark:text-gray-100 font-extrabold">Birthdate </label>
                                <input type="text" name="" id="" className="max-w-96 rounded-lg" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="dark:text-gray-100 font-extrabold">Address </label>
                                <input type="text" name="" id="" className="max-w-96 rounded-lg" />
                            </div>
                            <button className="dark:bg-green-400 dark:text-green-950 max-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-green-700 hover:scale-110 bg-green-900 text-green-200 transition-all">
                                Add
                            </button>
                        </form>

                    </div>
                </div>

            </section>
        </PatientsLayout>
    )
};
