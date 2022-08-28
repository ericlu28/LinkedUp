import React from "react";
import Button from "./Button";
import DropDownCard from "./DropDownCard";

const buttonData = new Array(5).fill('item name');
const ButtonWithDropDown = () => {
    const [open, setOpen] = React.useState(false);
    const drop = React.useRef(null);
    function handleClick(event) {
        if (!event.target.closest(`.${drop.current.className}`) && open) {
            setOpen(false);
        }
    }
    React.useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
    return (
        <div
            className = "dropdown"
            ref = {drop}
            style = {{position: "absolute", margin: "16px"}}
        >
            <Button onClick={() => setOpen(open => !open)} />
            {open && <DropDownCard data={buttonData} />}
        </div>
    );
};

export default ButtonWithDropDown
