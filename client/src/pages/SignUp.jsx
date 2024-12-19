import { useEffect, useState } from "react";
import l from "../assets/l.png";
import l2 from "../assets/l2.png";
import r from "../assets/r.png";
import r2 from "../assets/r2.png";
import { Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [leftImage, setLeftImage] = useState(l);
  const [rightImage, setRightImage] = useState(r2);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftImage((prev) => (prev === l ? l2 : l));
      setRightImage((prev) => (prev === r2 ? r : r2));
    }, 2900);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className=" min-h-screen flex ">
      <div className="flex m-0 sm:m-16 w-[0] sm:w-[40%]   ">
        {/* left */}

        <img
          src={leftImage}
          alt="logo"
          className="-rotate-6 sm:flex hidden w-[40%] h-[80%] border-4 rounded-[38px] border-fuchsia-800 "
        />

        <img
          src={rightImage}
          alt="logo"
          className="rotate-6 sm:flex hidden  w-[40%] h-[80%] border-4 rounded-[38px] border-fuchsia-800 -ml-12 "
        />
      </div>
      {/* right */}
      <div className="  sm:w-[60%] w-full  justify-center items-center mx-auto ">
        <h2 className=" text-center text-orange-500 text-2xl font-semibold cursor-pointer">
          K Rajesh <span className=" text-black text-xl">Blog App</span>
        </h2>
        <div className="flex-1 mt-10 justify-center  items-center px-16">
          <form
            className="flex flex-col gap-4 w-[60%]  "
            onSubmit={handleSubmit}
          >
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <button
              disabled={loading}
              className=" text-white bg-sky-400 rounded-xl py-1"
              type="submit"
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <div className="bg-red-100 w-fit mt-3 p-2 rounded-xl">
              <p className=" text-red-800 text-sm ">{errorMessage} </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
