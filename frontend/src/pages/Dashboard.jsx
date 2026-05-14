function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-blue-600">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mt-10">

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          Medicine Reminders
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          Memory Timeline
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          AI Assistant
        </div>

      </div>

    </div>
  )
}

export default Dashboard