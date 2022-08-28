import React from "react";

const liCls = "p-3 border text-gray-700 hover:text-white hover:bg-indigo-700";

const DropDownCard = ({data = []}) => (
    <div className = "shadow h-auto w-56 absolute">
        <ul className = "text-left">
            {data.map((item, i) => (
                <li key = {i} className = {liCls}>
                    {item}
                </li>
            ))}
        </ul>
    </div>
)

export default DropDownCard;