import { Link } from 'react-router-dom'
import { useEffect, useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export default function SelectedChar() {
    const { char } = useContext(DataContext)

    return (
        <div className="row justify-content-center">
            <div className="card col-6 text-center pt-2 pb-4 mb-5 shadow-lg rounded">
                <h5 className="text-end text-black text-opacity-50 mx-5">Selected Character</h5><hr className="mx-2 mt-0"/>
                <div className="row align-items-center">
                    <div className="col-8 text-start">
                        <h4 className="mb-0 ms-5 ps-3"><img id='avatar' src={ char.avatarUrl } alt='' height='75' width='75' className='me-4'/> <strong>{ char.charName }</strong></h4>
                    </div>
                    <div className="col-3 text-end ps-0 pe-0">
                        <p className="text-black text-opacity-50 mb-0">Lodestone ID:</p>
                        <p className="mb-0">{ char.lodestoneId }</p>
                        <br />
                        <p className="text-black text-opacity-50 mb-0">Server:</p>
                        <p className="mb-0">{ char.server }</p>
                    </div>
                </div>
                <hr className="mx-2"/>
                <div className="row justify-content-center">
                    <div className="col-10">
                        <Link to='/selected-char' className="col-12 btn btn-warning">View Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}