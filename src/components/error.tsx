import React from "react";

const Error = ({ message }: { message: any }) => {
  return (
    <div className="bg-black flex h-screen flex-col items-center divide-y-4 divide-slate-400/25">
      <div
        className="flex m-auto p-4 text-sm rounded-lg bg-yellow-200 text-yellow-800"
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Warning alert!</span> {message ?? ""}
        </div>
      </div>
    </div>
  );
};

export default Error;
