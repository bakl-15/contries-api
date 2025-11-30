import React from 'react'

function ButtonCustom({ label }) {
  return (
    <button
      className="border-1 border-white-700 ml-2 cursor-pointer bg-[#1E1F22] p-1 w-40 h-10 text-white font-bold rounded  hover:brightness-110 transition"
    >
      {label}
    </button>
  );
}


export default ButtonCustom