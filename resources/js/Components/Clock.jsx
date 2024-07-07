import { useEffect, useState } from "react";

export default function Clock() {
    const[clockState, setClockState] = useState()

    useEffect(() => {
        setInterval(() => {
            const time = new Date()
            setClockState(time.toLocaleTimeString())
        },1000)
    }, [])

    return (
        <div className="min-w-full flex justify-center py-3 px-6">
            <span className="dark:text-gray-200 text-3xl font-extrabold">
                {clockState}
            </span>
        </div>
    )
}