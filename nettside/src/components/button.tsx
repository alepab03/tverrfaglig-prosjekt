
interface ButtonProps {
    color: number;
    url: string;
    onClick: () => void;
    title: string;
}

export default function Button(props: ButtonProps) {

    let btnColor;
    if (props.color === 0) {
        btnColor = "bg-(--green) hover:bg-[#00302B]"
    } else if (props.color === 1) {
        btnColor = "bg-(--light-green) hover:bg-[#005D2F]"
    } /* usikker på om vi noen gang kommer til å bruke lysegrønn, men har laget det til en mulighet for nå */

    return(
        <div>
            <a href={props.url}>
                <button onClick={props.onClick} className={`pl-2 pr-2 sm:pl-8 sm:pr-8 pt-2.5 pb-2.5 ${btnColor} rounded-[0.313rem] cursor-pointer`}> {/* Er det mulig å gjøre sånn og omitte når man ikke trenger?? jeg vet ikke */}
                    <p className="font-bold text-white">{props.title}</p>
                </button>
            </a>
        </div>
    );
}