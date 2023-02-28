import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from "../contexts/AuthProvider";
import { DataContext } from "../contexts/DataProvider";
import SelectedChar from "../components/SelectedChar";
import SingleChar from "../components/SingleChar";

export default function Home() {
    const { user } = useContext(AuthContext)
    const { loading, chars, char, getChars, loadCharInfo, addChar, hideChar } = useContext(DataContext)
    const [loaded, setLoaded] = useState('FALSE')

    return (
        <div id="Home">
            <div className="row justify-content-center">
                <h1 className="col-6 text-light ms-3 pb-3"><strong>Your Characters</strong></h1>
            </div>
            {
                (loading == true) ?
                <p className='text-center text-white'>Loading...</p> :
                (loading == false && char.charName == null) ?
                <>
                    <div className="row justify-content-center">
                        <div id="liveAlertBar"></div>
                        <div className="card col-6 text-center py-4 mb-5 shadow-lg rounded">
                            <div className="row justify-content-center align-items-center">
                                <div className="col">
                                    <p className='text-center mb-2'>Currently no visible or added characters.</p>
                                    <p className='text-center mb-4'>Please unhide a character or add a character from Search.</p>
                                    <Link to="/search" className="col-9 btn btn-primary">Go to Search</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    { chars.map(singleChar => <SingleChar key={singleChar.id} singleChar={singleChar} showHidden='yes'/>) }
                </> :
                <>
                    {<SelectedChar />}
                    { chars.map(singleChar => <SingleChar key={singleChar.id} singleChar={singleChar} showHidden='no'/>) }
                </>
            }
        </div>
    )
}