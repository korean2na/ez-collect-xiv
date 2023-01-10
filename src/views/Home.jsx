import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";
import SingleChar from "../components/SingleChar";

export default function Home() {
    const { toTitleCase, chars, char, charInfo, addChar, removeChar } = useContext(DataContext)
    
    return (
        <div className="Home">
            <h1 className="text-center text-light pb-3"><strong>Your Characters</strong></h1>
            { chars.map(singleChar => <SingleChar key={singleChar.id} singleChar={singleChar}/>) }
        </div>
    )
}