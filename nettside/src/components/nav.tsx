import { useEffect, useState } from "react";

export default function Nav(props: any) {
    /* bruker midlertidige navn */
    const [activeBg, setActiveBg] = useState<any>({dashboard: '', adgangskontroll: ''});

    useEffect(() => {
        if (props.location === 'dashboard') {
            setActiveBg({...activeBg, dashboard: 'bg-[#CFCFCF]'});
        } else if (props.location === 'adgangskontroll') {
            setActiveBg({...activeBg, adgangskontroll: 'bg-[#CFCFCF]'});
        }
    }, [props.location]);

    return(
        <div className="bg-[#E8E8E8] w-1/1 h-[87vh] hidden sm:block -z-1">
            <a href="/">
                <h3 className={`border-b-2 border-black p-2 pl-5 hover:bg-[#CFCFCF] active:bg-[#CFCFCF] ${activeBg ? activeBg.dashboard : ''}`}>
                    Dashboard
                </h3>
            </a>
            <a href="/kort-administrering">
                <h3 className={`border-b-2 border-black p-2 pl-5 hover:bg-[#CFCFCF]   active:bg-[#CFCFCF] ${activeBg ? activeBg.adgangskontroll : ''}`}>
                    Adgangskontroll
                </h3>
            </a>
            <a href="/bruker-administrering">
                <h3 className={`border-b-2 border-black p-2 pl-5 hover:bg-[#CFCFCF]   active:bg-[#CFCFCF] ${activeBg ? activeBg.adgangskontroll : ''}`}>
                    Brukeradministrering
                </h3>
            </a>
        </div>
    );
}