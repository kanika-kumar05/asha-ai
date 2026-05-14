function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mt-6 p-3 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mt-4 p-3 border rounded-lg"
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg mt-6">
          Login
        </button>

      </div>

    </div>
  )
}

export default Login