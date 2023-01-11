import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataProvider";
import SelectedChar from "../components/SelectedChar";
import SingleChar from "../components/SingleChar";

export default function Home() {
    const { chars, getChars, loadCharInfo, addChar, hideChar } = useContext(DataContext)

    return (
        <div className="Home">
            <div className="row justify-content-center">
                <h1 className="col-6 text-light ms-3 pb-3"><strong>Your Characters</strong></h1>
            </div>
            {<SelectedChar />}
            { chars.map(singleChar => <SingleChar key={singleChar.id} singleChar={singleChar}/>) }
        </div>
    )
}