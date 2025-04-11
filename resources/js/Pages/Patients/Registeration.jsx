import PatientsLayout from "@/Layouts/PatientsLayout";
import { Head, useForm } from "@inertiajs/react";
import Pagination from "../Components/Pagination";

export default function Registration({ auth, total_count, waiting, done, actionsWaiting, categories }) {

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        cin: '',
        category_id: '',
        gender: '',
        phone: '',
        birth_date: '',
    });

    function submitForm(e) {
        e.preventDefault();
        post(route('Patients.store'));
    }

    return (
        <PatientsLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add Patients</h2>}
        >
            <Head title="Add Patients" />
            <section className="py-16 px-32">
                <div className="dark:bg-gray-800 bg-sky-500 py-4 px-16 rounded-2xl hover:shadow-2xl transition-all duration-300 shadow-sky-200">
                    <h1 className="font-extrabold text-3xl dark:text-gray-100 text-gray-900">Add new Patient</h1>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 ">
                        <div className="flex flex-wrap gap-2 justify-center items-start p-4 sm:col-span-1 lg:col-span-2">
                            <div className="min-w-[8em] min-h-[6em] p-8 rounded-3xl flex-1 dark:bg-stone-400 bg-sky-200 max-h-fit flex flex-col">
                                <div className="flex gap-2 dark:text-black font-extrabold text-xl">
                                    <span>Total</span>
                                    <i className="fa-solid fa-user"></i>
                                </div>
                                <span className="font-extrabold text-lg">{total_count}</span>
                            </div>
                            <div className="bg-cadetblue min-w-[8em] min-h-[6em] p-8 rounded-3xl flex-1 dark:bg-stone-400 bg-yellow-200 max-h-fit flex flex-col">
                                <div className="flex gap-2 dark:text-black font-extrabold text-xl">
                                    <span>Waiting</span>
                                    <i className="fa-regular fa-clock"></i>
                                </div>
                                <span className="font-extrabold text-lg">{waiting}</span>
                            </div>
                            <div className="bg-cadetblue min-w-[8em] min-h-[6em] p-8 rounded-3xl flex-1 dark:bg-stone-400 bg-emerald-200 max-h-fit flex flex-col">
                                <div className="flex gap-2 dark:text-black font-extrabold text-xl">
                                    <span>Complete</span>
                                    <i className="fa-solid fa-check-double"></i>
                                </div>
                                <span className="font-extrabold text-lg">{done}</span>
                            </div>
                        </div>
                        <div className="gap-3 px-3 py-2 min-h-32 bg-yellow-100 dark:bg-gray-700 rounded-xl flex flex-col 2xl:row-span-2 sm:col-span-1">
                            {actionsWaiting.data.map((action, index) => (
                                <div key={action.id} className="bg-sky-200 py-3 px-5 font-semibold flex justify-between rounded-lg">
                                    <div>
                                        {action.patient ? `${action.patient.first_name} ${action.patient.last_name}` : "Patient Not Found"} - {action.actionType?.action}
                                    </div>
                                    <div className="bg-green-400 py-1 px-4 rounded-md">
                                        <form action={route('action.changeStatus', { patient: action.id })} method="post">
                                            <input
                                                type="hidden"
                                                name="_token"
                                                value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')}
                                            />
                                            <input type="hidden" name="status" value="1" />
                                            <button type="submit">Done</button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                            <Pagination links={actionsWaiting.meta.links} />
                        </div>
                        <form onSubmit={submitForm} className="grid sm:grid-cols-1 2xl:grid-cols-2 gap-4 py-4 sm:col-span-1 lg:col-span-1 2xl:col-span-2">
                            <div className="flex flex-col">
                                <label htmlFor="first_name" className="dark:text-gray-100 font-extrabold">First name</label>
                                <input type="text" name="first_name" id="first_name" className="max-w-96 rounded-lg" value={data.first_name} onChange={e => setData('first_name', e.target.value)} />
                                {errors.first_name && <span className="text-red-500">{errors.first_name}</span>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="last_name" className="dark:text-gray-100 font-extrabold">Last name</label>
                                <input type="text" name="last_name" id="last_name" className="max-w-96 rounded-lg" value={data.last_name} onChange={e => setData('last_name', e.target.value)} />
                                {errors.last_name && <span className="text-red-500">{errors.last_name}</span>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="cin" className="dark:text-gray-100 font-extrabold">CIN</label>
                                <input type="text" name="cin" id="cin" className="max-w-96 rounded-lg" value={data.cin} onChange={e => setData('cin', e.target.value)} />
                                {errors.cin && <span className="text-red-500">{errors.cin}</span>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="category" className="dark:text-gray-100 font-extrabold">Category</label>
                                <select
                                    name="category_id"
                                    id="category"
                                    className="max-w-96 rounded-lg"
                                    value={data.category_id} 
                                    onChange={(e) => setData('category_id', e.target.value)}
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories?.map((category) => (
                                        <option key={category.id} value={category.id}>{category.category}</option>
                                    ))}
                                </select>
                                {errors.category_id && <span className="text-red-500">{errors.category_id}</span>}

                                {errors.category && <span className="text-red-500">{errors.category}</span>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="gender" className="dark:text-gray-100 font-extrabold">Gender</label>
                                <select
                                    name="gender"
                                    id="gender"
                                    className="max-w-96 rounded-lg"
                                    value={data.gender}
                                    onChange={(e) => setData("gender", e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Gender
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                {errors.gender && <span className="text-red-500">{errors.gender}</span>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="phone" className="dark:text-gray-100 font-extrabold">Phone number</label>
                                <input type="text" name="phone" id="phone" className="max-w-96 rounded-lg" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                                {errors.phone && <span className="text-red-500">{errors.phone}</span>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="birth_date" className="dark:text-gray-100 font-extrabold">Birthdate</label>
                                <input type="date" name="birth_date" id="birth_date" className="max-w-96 rounded-lg" value={data.birth_date} onChange={e => setData('birth_date', e.target.value)} />
                                {errors.birth_date && <span className="text-red-500">{errors.birth_date}</span>}
                            </div>
                            <div className="flex gap-5 items-center">
                                <button type="reset" className="bg-yellow-300 ax-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-yellow-400 hover:scale-110 transition-all ">
                                    Cancel
                                </button>
                                <button type="submit" className="dark:bg-green-400 dark:text-green-950 max-w-fit py-2 px-6 rounded-xl font-extrabold hover:bg-green-700 hover:scale-110 bg-emerald-500 transition-all" disabled={processing}>
                                    Add
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </section>
        </PatientsLayout>
    );
}