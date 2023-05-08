import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export default function SingleAchievement(props) {
    const { ownedAchievements } = useContext(DataContext)

    return (
        <div className="row justify-content-center">
            <a id="ach-single" href={`https://ffxivcollect.com/achievements/${props.ach.id}`} target="_blank"  className="card col-10 text-center py-2 mb-3 shadow-lg rounded">
                <div className="row justify-content-evenly align-items-center">
                    <div className="col-4 text-start ps-3">
                        <p className="mb-0"><img id='avatar' src={ props.ach.icon } alt='' height='40' width='40' className='me-3'/>{ props.ach.name }</p>
                    </div>
                    <div className="col-4 text-start">
                        <p className="mb-0">{ props.ach.description }</p>
                    </div>
                    <div className="col-1">
                        <p className="mb-0">{ props.ach.points }</p>
                    </div>
                    <div className="col-1">
                        {
                            (ownedAchievements.includes(props.ach.id)) ?
                            <p className="mb-0 fs-3">&#10004;</p> :
                            <p className="mb-0 fs-3"></p>
                        }
                    </div>
                    <div className="col-1">
                        <p className="mb-0">{ props.ach.owned }</p>
                    </div>
                    <div className="col-1">
                        <p className="mb-0">{ props.ach.patch }</p>
                    </div>
                </div>
            </a>
        </div>
    ) 
}