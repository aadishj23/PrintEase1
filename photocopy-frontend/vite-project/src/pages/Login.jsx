import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");  //backend error message
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormError("");
        if (e.target.name === "password") {
            const password = e.target.value;
            setPasswordError(password.length >= 5 ? "" : "Password must be at least 5 characters long.");
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setFormError("Please fill in all fields.");
            return;
        }
        if (passwordError) {
            alert("Please correct the password issue before proceeding.");
            return;
        }
        try{
            const response=await axios.post(
                "/api/v1/users/login",
                {
                    email:formData.email,
                    password:formData.password
                },
                {withCredentials:true}
            );
            console.log("Login Successful:", response.data);
            alert("Login successful!");
            navigate("/buyer-dashboard");
        }catch(error){
            console.error("Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong!");
        }

      
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 text-white animate__animated animate__fadeIn">
            <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105">
                <h2 className="text-3xl font-bold text-center text-purple-800 animate__animated animate__fadeIn">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-purple-800">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-900 bg-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-text transform transition-all duration-300 ease-in-out hover:shadow-lg"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block mb-2 text-sm font-medium text-purple-800">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-900 bg-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-text transform transition-all duration-300 ease-in-out hover:shadow-lg"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-9 right-3 text-gray-600 focus:outline-none hover:text-purple-600 transform transition-all duration-200"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {passwordError && (
                            <p className="text-red-600 text-sm mt-1">
                                {passwordError}
                            </p>
                        )}
                    </div>
                    {formError && (
                        <p className="text-red-600 text-sm mt-2 text-center">
                            {formError}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 text-white bg-gradient-to-br from-purple-600 to-purple-700 shadow-2xl hover:bg-gradient-to-br hover:from-purple-700 hover:to-purple-800 transform transition-all duration-300 ease-in-out hover:scale-105"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-purple-800">
                    Don't have an account?{" "}
                    <a href="/register" className="text-purple-600 hover:underline transform transition-all duration-300 ease-in-out hover:text-purple-800">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
