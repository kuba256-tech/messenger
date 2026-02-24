import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeClosed, Loader, LogIn, SquareUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLogging } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success == true) login(formData);

  };

  const togglePassword = () => {
    setShowPassword((prev) => {
      setShowPassword(!prev);
    });
  };

  return (
    <div className="min-h-screen  grid lg:flex lg:justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse z-10">
        <div className="text-center lg:text-left lg:w-1/2">
          <div className="flex items-center justify-center md:justify-start ">
            <h1 className="text-5xl font-bold font-sacrament font-poppins text-h2">
              Log in
            </h1>
             <LogIn className="hidden md:block font-poppins"
              size={"10%"}/>
          </div>
          <p className="text-body">Welcome back</p>
        </div>

        <div className="card bg-slate-600 w-full max-w-sm shrink-0 shadow-3xl ">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset ">
                <label className="label">Email</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="email"
                  name="email"
                  onChange={handleOnChange}
                />
                <div className="flex justify-between">
                  <label className="label">Password </label>
                  {showPassword ? (
                    <button onClick={togglePassword}>
                      <Eye />
                    </button>
                  ) : (
                    <button onClick={togglePassword}>
                      <EyeClosed />
                    </button>
                  )}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input w-full"
                  placeholder="password"
                  name="password"
                  onChange={handleOnChange}
                />

                <div className="ml-auto">
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <p className="first-letter:uppercase">Do not have an account? <span
                    onClick={() => navigate("/signup")}
                    className="text-blue-400 cursor-pointer underline"
                  >
                     sign up
                  </span>
                </p>
                <button
                  disabled={isLogging}
                  type="submit"
                  className="btn btn-neutral mt-4"
                >
                  {isLogging ? (
                    <Loader className="size-5 animate-spin" />
                  ) : (
                    "log in"
                  )}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
