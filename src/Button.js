import React from "react";

const cls = "bg-indigo-700 text-white py-3 px-5 rounded";
const Button = ({ onClick }) => (
    <button className = {cls} onClick={onClick}>
        Dropdown button
    </button>
)

export default Button