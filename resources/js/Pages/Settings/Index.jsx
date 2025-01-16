import Settings from "@/Layouts/SettingsLayout";

export default function Index({ auth }) {

    return (
        <Settings
            user={auth.user}
            header={<h2 className="font-semibold text-xl dark:text-gray-200 leading-tight">Settings</h2>}
        >
            <section className="py-8 px-12">
                {/* Actions managment */}
                <div>
                    <h1 className="dark:text-cyan-100 text-3xl font-extrabold">Actions Managment</h1>
                    {/* Actions Form */}

                    {/* Actions List */}
                </div>
                
            </section>
        </Settings>
    )
}