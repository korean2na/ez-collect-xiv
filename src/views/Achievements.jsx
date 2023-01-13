import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataProvider";
import SingleAchievement from "../components/SingleAchievement";

export default function Achievements() {
    const { charInfo, getChars, getAchievements, achievementsList } = useContext(DataContext)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        if (charInfo == null) {
            getChars()
        }

        getAchievements()

    }, [])

    return (
        <div id="Achievements">
            <div className="row justify-content-center">
                <h1 className="col-6 text-light text-center pb-3"><strong>Achievements</strong></h1>
                {
                    (achievementsList[0] == null) ?
                    <p className='text-center text-white'>Loading...</p> :
                    <>
                        <div className="card col-10 text-center py-2 mb-3 shadow-lg rounded">
                            <div className="row justify-content-evenly align-items-center">
                                <div className="col-4 text-start ps-5">
                                    <p className="mb-0"><strong>Name</strong></p>
                                </div>
                                <div className="col-4 text-start">
                                    <p className="mb-0 ms-4"><strong>Description</strong></p>
                                </div>
                                <div className="col-1">
                                    <p className="mb-0"><strong>Points</strong></p>
                                </div>
                                <div className="col-1">
                                    <p className="mb-0"><strong>Done</strong></p>
                                </div>
                                <div className="col-1">
                                    <p className="mb-0"><strong>Players<br/>Done%</strong></p>
                                </div>
                                <div className="col-1">
                                    <p className="mb-0"><strong>Patch</strong></p>
                                </div>
                            </div>
                        </div>
                        { achievementsList.map(ach => <SingleAchievement key={ach.id} ach={ach}/>) }
                    </>
                }
            </div>
        </div>
    )
}