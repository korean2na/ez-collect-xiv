import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataProvider";
import { SingleMount } from "../components/SingleMount";

export default function Mounts() {
    const { char, chars, charInfo, getChars } = useContext(DataContext)
    const [mountsList, setMountsList] = useState([])
    const [ownedMounts, setOwnedMounts] = useState([])

    async function getMounts() {
        try {
            const mountsResponse = await fetch('https://ffxivcollect.com/api/mounts')
            const mountsData = await mountsResponse.json()

            setMountsList(mountsData.results)
            setOwnedMounts(charInfo.mounts.ids)
        } catch (err) {
            console.log('ERROR! ERROR! ERROR!')
            console.log(err)
        }
    }

    useEffect(() => {
        if (charInfo == null) {
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
                        {/* <SingleMount /> */}
                        <div className="row justify-content-center">
                            <div className="card col-10 text-center py-2 mb-3 shadow-lg rounded">
                                <div className="row justify-content-evenly align-items-center">
                                    <div className="col-4 text-start ps-0">
                                        <p className="mb-0"><img id='avatar' src={ mountsList[0].icon } alt='' height='40' width='40' className='me-3'/>{ mountsList[0].name }</p>
                                    </div>
                                    <div className="col-4 text-start me-4">
                                        <p className="mb-0">{ mountsList[0].sources[0].text }</p>
                                    </div>
                                    <div className="col-1">
                                        <p className="mb-0 fs-3">&#10004;</p>
                                    </div>
                                    <div className="col-1">
                                        <p className="mb-0">{ mountsList[0].owned }</p>
                                    </div>
                                    <div className="col-1">
                                        <p className="mb-0">{ mountsList[0].patch }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}