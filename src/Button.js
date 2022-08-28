import React from "react";
import {Link} from "react-router-dom";

import { Avatar, IconButton } from '@material-ui/core';
import { useStateValue } from './StateProvider';

//const [{user}, dispatch] = useStateValue();
const cls = "bg-indigo-700 text-white py-3 px-5 rounded";

const Button = ({ onClick }) => (
    <button className = {cls} onClick={onClick}>
        Button
    </button>
)

export default Button