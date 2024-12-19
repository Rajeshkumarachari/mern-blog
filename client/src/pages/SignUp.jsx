import { useEffect, useState } from "react";
import l from "../assets/l.png";
import l2 from "../assets/l2.png";
import r from "../assets/r.png";
import r2 from "../assets/r2.png";
import { Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [leftImage, setLeftImage] = useState(l);
  const [rightImage, setRightImage] = useState(r2);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftImage((prev) => (prev === l ? l2 : l));
      setRightImage((prev) => (prev === r2 ? r : r2));
    }, 2900);

    return () => {
      clearInterval(interval);
    };
  }, []);
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
        <div className="flex-1 mt-10 justify-center border items-center px-16">
          <form className="flex flex-col gap-4 w-[60%] ">
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="text"
                placeholder="name@company.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            <button
              className=" text-white bg-sky-400 rounded-xl py-1"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
