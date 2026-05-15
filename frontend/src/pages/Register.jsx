import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Register() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async () => {
        try {
            await API.post("/register", {
                name,
                email,
                password
            })

            alert("Registration successful! Please login.")
            navigate("/login")

        } catch (error) {
            alert(error.response?.data?.detail || "Registration failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

                <h1 className="text-3xl font-bold text-center text-blue-600">
                    Register
                </h1>

                <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-full mt-6 p-3 border rounded-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full mt-4 p-3 border rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full mt-4 p-3 border rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg mt-6"
                >
                    Register
                </button>

            </div>
        </div>
    )
}

export default Register