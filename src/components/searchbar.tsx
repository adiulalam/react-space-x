import React from 'react'

const SearchBar = ({ searchString, handleSubmit, handleOnChange} : { searchString:any, handleSubmit:any, handleOnChange:any }) => {
  return (
    <>
      <div className="lg:flex sm:md:block max-w-sm lg:max-w-5xl rounded py-5 justify-between mx-2">
        <div className=" flex items-center w-full h-12  rounded-lg focus-within:shadow-lg bg-gray-700 overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="flex w-screen h-screen outline-none text-sm text-white bg-gray-700 overflow-hidden"
              type="text"
              id="search"
              placeholder="Search missions.."
              autoComplete="off"
              value={searchString}
              onChange={(e) => handleOnChange(e)}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
