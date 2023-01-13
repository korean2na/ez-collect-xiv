import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { DataContext } from "../contexts/DataProvider";
import SelectedChar from "../components/SelectedChar";
import SingleChar from "../components/SingleChar";

export default function Home() {
    const { chars, char, getChars, loadCharInfo, addChar, hideChar } = useContext(DataContext)
    const { user } = useContext(AuthContext)
    const [loaded, setLoaded] = useState('FALSE')

    useEffect(() => {
        getChars()

    }, [])

    return (
        <div id="Home">
            <div className="row justify-content-center">
                <h1 className="col-6 text-light ms-3 pb-3"><strong>Your Characters</strong></h1>
            </div>
            {
                (char.charName == null) ?
                <>
                <p className='text-center text-white'>Loading...</p>      
                </> :
                <>
                    {<SelectedChar />}
                    { chars.map(singleChar => <SingleChar key={singleChar.id} singleChar={singleChar}/>) }
                </>
            }
        </div>
    )
}