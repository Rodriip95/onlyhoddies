import React from "react";

function ButtonSizes({ size, sizes, active, handlerFunction, disabledOption }) {
  const disabledObserver = () => {
    if (disabledOption) {
      return (
        "bg-white py-2 rounded text-gray-400 font-medium border border-gray-300" +
        sizes
      );
    }
    return active
      ? "bg-indigo-600 hover:bg-indigo-700 py-2 rounded text-gray-100 font-medium border border-indigo-600" +
          sizes
      : "bg-white hover:bg-indigo-300 py-2 rounded text-gray-900 font-medium border border-gray-300" +
          sizes;
  };

  let classCompoust = disabledObserver();
  return (
    <button
      disabled={disabledOption}
      className={classCompoust}
      onClick={handlerFunction}
    >
      {size}
    </button>
  );
}

export default ButtonSizes;
