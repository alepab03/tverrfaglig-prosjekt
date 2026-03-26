import { useEffect, useState } from "react";

export default function Nav(props: any) {
    /* bruker midlertidige navn */
    const [activeBg, setActiveBg] = useState<any>({dashboard: '', adgangskontroll: '', brukeradministrering: ''});

    useEffect(() => {
        if (props.location === 'dashboard') {
            setActiveBg({...activeBg, dashboard: 'bg-[#0a765f]'});
        } else if (props.location === 'adgangskontroll') {
            setActiveBg({...activeBg, adgangskontroll: 'bg-[#0a765f]'});
        } else if (props.location === 'brukeradministrering'){
            setActiveBg({...activeBg, brukeradministrering: 'bg-[#0a765f]'});
        }
    }, [props.location]);

    return(
       <div className="bg-[#005850] w-64 h-[87vh] hidden sm:block -z-10 text-white">
            <a href="/">
                <p className={` p-2 pl-5 hover:bg-[#0a765f]  active:bg-[#0a765f] ${activeBg ? activeBg.dashboard : ''}`}>
                    Dashboard
                </p>
            </a>
            <a href="/kort-administrering">
                <p className={` p-2 pl-5 hover:bg-[#0a765f]   active:bg-[#0a765f] ${activeBg ? activeBg.adgangskontroll : ''}`}>
                    Adgangskontroll
<<<<<<< Updated upstream
                </p>
            </a>
            <a href="/bruker-administrering">
                <p className={` p-2 pl-5 hover:bg-[#0a765f]   active:bg-[#0a765f] ${activeBg ? activeBg.brukeradministrering : ''}`}>
                    Brukeradministrering
=======
>>>>>>> Stashed changes
                </p>
            </a>
        </div>
    );
}