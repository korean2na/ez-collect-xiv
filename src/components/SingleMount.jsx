import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export default function SingleChar(props) {


    return (
        <div className="row justify-content-center">
            <div className="card col-10 text-center py-2 mb-3 shadow-lg rounded">
                <div className="row justify-content-evenly">
                    <div className="col-4 text-start ps-5">
                        <p className="mb-0"><strong>Name</strong></p>
                    </div>
                    <div className="col-4 text-start">
                        <p className="mb-0"><strong>Source</strong></p>
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
        </div>
    ) 
}