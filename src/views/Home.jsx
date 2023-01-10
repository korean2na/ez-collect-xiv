import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";

export default function Home() {
    const { toTitleCase, chars, char, charInfo, addChar, removeChar } = useContext(DataContext)
    
    return (
        <div className="Home">
            <h1 className="text-center text-light pb-3"><strong>Your Character</strong></h1>
            <p>{char.charName}</p>
        </div>
    )
}