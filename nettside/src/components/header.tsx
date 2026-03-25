import { useState } from "react";

export default function Header() {

    const [isActive, setIsActive] = useState<boolean>(false);

    const handleNavToggle = () => {
        setIsActive(!isActive);
    };

    return(
        <>
            <div className="bg-(--green) w-full h-15 sm:h-[13vh] flex flex-row items-center justify-between px-10">
  
                <div className="flex items-center gap-3">
                    <img src="/bilder/Logo.png" alt="Logo" className="h-17" />
                    <a href="/"><h4 className="text-white font-bold ml-10">Adgangskontroll</h4></a> {/* midlertidig navn */}
                    {/* hamburger icon */}
                    <div className={`inline-block mr-9 sm:hidden ${isActive ? 'change' : ''}`} onClick={handleNavToggle}> 
                        <div className="bar1 bg-white"></div>
                        <div className="bar2 bg-white"></div>
                        <div className="bar3 bg-white"></div>
                    </div>
                </div>
            </div>
            {/* dropdown menu (midlertidige navn og linker) */}
            <div className="sm:hidden block overflow-hidden dropdown-container bg-[#E8E8E8]" style={{ padding: isActive ? "1rem" : "0 1rem", maxHeight: isActive ? "20rem" : "0" }}>
                <a href="/">
                    <h3 className="font-semibold hover:bg-[#CFCFCF] border-b border-(--green)">Dashboard</h3>
                </a>
                <a href="/kort-administrering">
                    <h3 className="font-semibold hover:bg-[#CFCFCF] mt-2 border-b border-(--green)">Adgangskontroll</h3>
                </a>
                <a href="/bruker-administrering">
                    <h3 className="font-semibold hover:bg-[#CFCFCF] mt-2 border-b border-(--green)">Brukeradministrering</h3>
                </a>
            </div>
        </>
    );
}