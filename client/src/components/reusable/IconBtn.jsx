import React from "react";

const IconBtn = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses=[],
  type,
}) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 px-6 h-fit py-2 rounded-md bg-yellow-200 text-black hover:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all duration-300 ease-in-out`}
      disabled={disabled}
      onClick={onclick}
      type={type}
    >
      {children ? (
        <>
          {children}
          <span>{text}</span>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
