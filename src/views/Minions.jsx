import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataProvider";
import SingleMinion from "../components/SingleMinion";

export default function Minions() {
    const { selectedCharInfo, getChars, getMinions, minionsList } = useContext(DataContext)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        if (selectedCharInfo == null) {
            getChars()
        }

        getMinions()

    }, [])

    return (
        <div id="Minions">
            <div className="row justify-content-center">
                <h1 className="col-6 text-center text-light pb-3"><strong>Minions</strong></h1>
                {
                    (minionsList[0] == null) ?
                    <p className='text-center text-white'>Loading...</p> :
                    <>
                        <div className="card col-10 text-center py-2 mb-3 shadow-lg rounded">
                            <div className="row justify-content-evenly align-items-center">
                                <div className="col-4 text-start ps-5">
                                    <p className="mb-0"><strong>Name</strong></p>
                                </div>
                                <div className="col-4 text-start">
                                    <p className="mb-0 ms-4"><strong>Source(s)</strong></p>
                                </div>
                                <div className="col-1">
                                    <p className="mb-0"><strong>Owned</strong></p>
                                </div>
                                <div className="col-1">
                                    <p className="mb-0"><strong>Own%</strong></p>
                                </div>
                                <div className="col-1">
                                    <p className="mb-0"><strong>Patch</strong></p>
                                </div>
                            </div>
                        </div>
                        { minionsList.map(minion => <SingleMinion key={minion.id} minion={minion}/>) }
                    </>
                }
            </div>
        </div>
    )
}