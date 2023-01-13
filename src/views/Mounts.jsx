import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataProvider";

export default function Mounts() {
    const { char, chars, charInfo, getChars } = useContext(DataContext)
    const [mountsList, setMountsList] = useState([])
    const [ownedMounts, setOwnedMounts] = useState([])

    async function getMounts() {
        try {
            const mountsResponse = await fetch('https://ffxivcollect.com/api/mounts')
            const mountsData = await mountsResponse.json()

            console.log(mountsData.results[50].name)
            setMountsList(mountsData.results)
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
                <h1 className="col-6 text-light ms-3 pb-3"><strong>Mounts</strong></h1>
                {
                    (mountsList[0] == null) ?
                    <p className='text-center text-white'>Loading...</p> :
                    <>
                    <p>{ mountsList[50].name }</p>
                    </>
                }

            </div>
        </div>
    )
}