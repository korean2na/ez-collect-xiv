import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataProvider";

export default function CharProfile() {
    const { char, charInfo } = useContext(DataContext)

    return (
        <div id="CharProfile">
            <div className="row justify-content-center">
                <div className="card col-9 text-center pt-2 pb-4 mb-5 shadow-lg rounded">
                    <h5 className="text-end text-black text-opacity-50 mx-3">Selected Character</h5><hr className="mx-2 mt-0" />
                    <div className="row align-items-center">
                        <div className="col-8 text-start">
                            <h4 className="mb-0 ps-3"><img id='avatar' src={char.avatarUrl} alt='' height='75' width='75' className='me-3' /> <strong>{char.charName}</strong></h4>
                        </div>
                        <div className="col-4 text-end ps-0 pe-4">
                            <p className="text-black text-opacity-50 mb-0">Lodestone ID:</p>
                            <p className="mb-0">{char.lodestoneId}</p>
                            <br />
                            <p className="text-black text-opacity-50 mb-0">Server:</p>
                            <p className="mb-0">{char.server}</p>
                        </div>
                    </div>
                    <hr className="mx-2 pb-2" />
                    <div className="row justify-content-evenly">
                        <div className="col-4 px-0">
                            <div id="portrait-box" className='ms-2'>
                                <img id="portrait" src={ charInfo.portrait } alt='character portrait'/>
                            </div>
                        </div>
                        <div className="col-7 me-3">
                            <div className="row card py-3 shadow rounded">
                                <div className="col">
                                    <h4 className="mb-0">Achievements</h4>
                                </div>
                            </div>
                            <div className="row card py-3 shadow rounded">
                                <div className="col">
                                    <h4 className="mb-0">Mounts</h4>
                                </div>
                            </div>
                            <div className="row card py-3 shadow rounded">
                                <div className="col">
                                    <h4 className="mb-0">Minions</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}