import { useState } from "react";
import Hamburger from "./hamburger";
import DropDownNav from "./dropDownNav";

export default function Header() {

    const [isActive, setIsActive] = useState<boolean>(false);

    const handleNavToggle = () => {
        setIsActive(!isActive);
    };

    return(
        <>
            <div className="bg-(--green) w-1/1 h-15 sm:h-[13vh] flex flex-row items-center justify-between">
                <a href="/"><h1 className="text-white font-bold ml-10">Tittel</h1></a> {/* midlertidig navn */}
                <Hamburger isActive={isActive} toggle={handleNavToggle} />
            </div>
            <DropDownNav isActive={isActive} toggle={handleNavToggle} />
        </>
    );
}