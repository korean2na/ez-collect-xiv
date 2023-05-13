import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataProvider";
import SingleMount from "../components/SingleMount";

export default function Mounts() {
    const { selectedCharInfo, getChars, getMounts, mountsList } = useContext(DataContext)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (selectedCharInfo == null) {
            getChars()
        }

        getMounts()

    }, [])

    return (
        <div id="Mounts">
            <div className="row justify-content-center">
                <h1 className="col-6 text-center text-light pb-3"><strong>Mounts</strong></h1>
                {
                    (mountsList[0] == null) ?
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
                        { mountsList.map(mount => <SingleMount key={mount.id} mount={mount}/>) }
                    </>
                }
            </div>
        </div>
    )
}