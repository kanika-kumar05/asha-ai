import { useState } from "react"
import API from "../services/api"

function Assistant() {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const sendMessage = async () => {
        if (!message.trim()) return

        const userMsg = {
            sender: "user",
            text: message
        }

        setMessages((prev) => [...prev, userMsg])

        try {
            const response = await API.post("/chat", {
                message: message
            })

            const botMsg = {
                sender: "bot",
                text: response.data.reply
            }

            setMessages((prev) => [...prev, botMsg])
            setMessage("")

        } catch (error) {
            console.log(error)

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Something went wrong. Please try again."
                }
            ])
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">

                <h1 className="text-3xl font-bold text-blue-600">
                    Asha AI Assistant
                </h1>

                <p className="text-gray-600 mt-2">
                    Ask me about medicines, memories, family, or daily help.
                </p>

                <div className="h-[400px] overflow-y-auto border rounded-xl p-4 mt-6 bg-gray-50">

                    {messages.length === 0 && (
                        <p className="text-gray-400 text-center mt-32">
                            Start a conversation with Asha AI
                        </p>
                    )}

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-4 flex ${
                                msg.sender === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`p-3 rounded-xl max-w-[70%] ${
                                    msg.sender === "user"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-800"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}

                </div>

                <div className="flex gap-3 mt-4">

                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 p-3 border rounded-lg"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage()
                            }
                        }}
                    />

                    <button
                        onClick={sendMessage}
                        className="bg-blue-600 text-white px-6 rounded-lg"
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Assistant