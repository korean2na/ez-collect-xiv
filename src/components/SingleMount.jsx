import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export default function SingleMount(props) {
    const { ownedMounts } = useContext(DataContext)

    const sources = props.mount.sources

    return (
        <div className="row justify-content-center">
            <a id="mount-single" href={`https://ffxivcollect.com/mounts/${props.mount.id}`} target="_blank"  className="card col-10 text-center py-2 mb-3 shadow-lg rounded">
                <div className="row justify-content-evenly align-items-center">
                    <div className="col-4 text-start ps-0">
                        <p className="mb-0"><img id='avatar' src={ props.mount.icon } alt='' height='40' width='40' className='me-3'/>{ props.mount.name }</p>
                    </div>
                    <div className="col-4 text-start me-4">
                        {sources.map(source => <p className="mb-0">{source.text}</p>)}
                    </div>
                    <div className="col-1">
                        {
                            (ownedMounts.includes(props.mount.id)) ?
                            <p className="mb-0 fs-3">&#10004;</p>:
                            <p className="mb-0 fs-3"></p>
                        }
                    </div>
                    <div className="col-1">
                        <p className="mb-0">{ props.mount.owned }</p>
                    </div>
                    <div className="col-1">
                        <p className="mb-0">{ props.mount.patch }</p>
                    </div>
                </div>
            </a>
        </div>
    ) 
}