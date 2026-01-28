"use client";
import React from "react";

export default function InputValidated({
  type,
  name,
  placeholder,
  validation,
}) {
  function validate() {
    const valid = validation?.error?.find((error) => error.path.includes(name));

    if (valid) {
      return <p>{valid?.message}</p>;
    }
  }

  return (
    <div>
      <input type={type} name={name} placeholder={placeholder}></input>
      <p>{validate()}</p>
    </div>
  );
}
