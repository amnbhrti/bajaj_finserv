import React from "react";

export default function loading() {
  return (
    <div className="loader-container flex justify-center items-center fixed left-0 right-0 h-full">
      <div className="spinner"></div>
    </div>
  );
}
