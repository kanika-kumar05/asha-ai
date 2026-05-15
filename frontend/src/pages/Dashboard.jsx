import { useNavigate } from "react-router-dom"

function Dashboard() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="flex justify-between items-center">

                <h1 className="text-4xl font-bold text-blue-600">
                    Asha AI Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg"
                >
                    Logout
                </button>

            </div>

            <div className="grid grid-cols-3 gap-6 mt-10">

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold">Medicine Reminders</h2>
                    <p className="text-gray-600 mt-2">Track daily medicines.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold">Memory Timeline</h2>
                    <p className="text-gray-600 mt-2">View daily memory logs.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold">AI Assistant</h2>
                    <p className="text-gray-600 mt-2">Ask memory-related questions.</p>
                </div>

            </div>

        </div>
    )
}

export default Dashboard