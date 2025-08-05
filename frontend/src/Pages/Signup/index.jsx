import React, { useState } from "react";
import { Eye, EyeOff, Mountain } from "lucide-react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { AxiosError, isAxiosError } from "axios";
import axiosInstance from "../../helpers/axiosInstance";
import userState from "../../utils/UserState";
import { signUpSchema } from "../../helpers/schema";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data) => {
    try {
      const response = axiosInstance.post("/api/auth/register", data);

      toast.promise(response, {
        pending: "Creating your account...",
        success: {
          render({ data }) {
            reset();
            navigate("/signin");
            return data?.data?.message;
          },
        },
        error: {
          render({ data }) {
            if (data instanceof AxiosError) {
              if (data?.response?.data?.message.includes("Username")) {
                setError("userName", {
                  type: "manual",
                  message: data?.response?.data?.message,
                });
              } else if (data?.response?.data?.message.includes("Email")) {
                setError("email", {
                  type: "manual",
                  message: data?.response?.data?.message,
                });
              } else {
                setError("password", {
                  type: "manual",
                  message: data?.response?.data?.message,
                });
              }
            }
            return "Signup failed";
          },
        },
      });

      return (await response).data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data?.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 lg:flex">
      {/* Left side - Hero (Sticky) */}
      <div className="hidden lg:block lg:w-1/2 lg:fixed lg:inset-y-0 lg:left-0 bg-gradient-to-br from-teal-600 to-blue-700">
        <div className="h-full flex items-center justify-center p-12">
          <div className="text-center text-white">
            <Mountain className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4">Journey Beyond Horizons</h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Dive into the world of travel with stories that transport you to far-off lands.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form (Scrollable) */}
      <div className="w-full lg:w-1/2 lg:ml-auto min-h-screen overflow-y-auto">
        <div className="flex items-center justify-center p-8 min-h-screen">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-8">
              <Mountain className="w-12 h-12 mx-auto mb-4 text-teal-600" />
              <h1 className="text-2xl font-bold text-gray-900">AgileTravles</h1>
            </div>

            {/* Form header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create account</h2>
              <p className="text-gray-600">Join us and start your travel journey</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  name="userName"
                  {...register("userName")}
                  placeholder="Choose a unique username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none"
                />
                {errors.userName && (
                  <p className="p-3 text-xs text-red-500">{`${errors.userName.message}`}</p>
                )}
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  {...register("fullName")}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none"
                />
                {errors.fullName && (
                  <p className="p-3 text-xs text-red-500">{`${errors.fullName.message}`}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  {...register("email")}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none"
                />
                {errors.email && (
                  <p className="p-3 text-xs text-red-500">{`${errors.email.message}`}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    {...register("password")}
                    placeholder="Create a strong password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors pr-10 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {passwordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="p-3 text-xs text-red-500">{`${errors.password.message}`}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    {...register("confirmPassword")}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors pr-10 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {confirmPasswordVisible ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="p-3 text-xs text-red-500">{`${errors.confirmPassword.message}`}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Sign in link */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a href="/signin" className="text-teal-600 hover:text-teal-700 font-semibold">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
