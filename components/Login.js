import { signIn } from "next-auth/react";
import React from "react";

import Header from "./Header";

function Login({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center ">
        <img
          className="h-40 w-80 object-contain"
          src="https://links.papareact.com/t4i"
          alt=""
        />
        <p className="italic mt-4">
          This is not the real Facebook! just for education purpose
        </p>
        <div className="mt-40">
          <div>
            <button
              className="bg-blue-500 text-white font-bold p-3 rounded-lg  text-lg"
              onClick={signIn}
            >
              Sign in with Facebook
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
