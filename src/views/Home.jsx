import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";
import SingleChar from "../components/SingleChar";

export default function Home() {
    const { toTitleCase, chars, char, charInfo, addChar, removeChar } = useContext(DataContext)
    
    return (
        <div className="Home">
            <div className="row justify-content-center">
                <h1 className="col-8 text-light ms-3 pb-3"><strong>Your Characters</strong></h1>
            </div>
            { chars.map(singleChar => <SingleChar key={singleChar.id} singleChar={singleChar}/>) }
        </div>
    )
}