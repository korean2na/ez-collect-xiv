import { Link } from "react-router-dom"
import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export default function SingleChar(props) {
    const { selectChar, getChars, loadCharInfo } = useContext(DataContext)

    async function handleSelectChar(id) {
        await selectChar(id)
        await getChars()
    }

    function handleRemoveChar(id) {
        
    }

    if (!props.singleChar) {
        return (
            <div className="row justify-content-center">
                <div className="card col-9 text-center gap-3 py-4 mb-5 shadow-lg rounded">
                    <h2><strong>Not Found</strong></h2>
                </div>
            </div>
        )
    }

    return (
        <div className="row justify-content-center">
            <div className="card col-8 text-center py-4 mb-5 shadow-lg rounded">
                {
                    (props.singleChar.selected) ?
                    <><h4 className="text-end mx-3">Selected Character</h4><hr className="mx-2 mt-0"/></> :
                    <></>
                }
                <div className="row align-items-center">
                    <div className="col-6">
                        <img src={ props.singleChar.avatarUrl } alt='character avatar'/> 
                        <h2><strong>{ props.singleChar.charName }</strong></h2>
                    </div>
                    <div className="col-6 text-end px-4">
                        <p className="mb-0">Lodestone ID: &nbsp; { props.singleChar.lodestoneId }</p>
                        <p className="mb-0">Server: &nbsp;&nbsp;&nbsp;&nbsp; { props.singleChar.server }</p>
                    </div>
                </div>
                <hr className="mx-2"/>
                <div className="row">
                    {
                        (props.singleChar.selected) ?
                        <>
                        
                        </> :
                        <>
                            <div className="col-6">
                                <button onClick={() => handleSelectChar(props.singleChar.id)} className="col-5 btn btn-primary">Select</button>
                                {/* <Link to={ `/weather/city/${props.city.cityName}` } className="col-6 btn btn-primary">Show Weather</Link> */}
                            </div>
                            <div className="col-6">
                                <div className="row justify-content-end mx-4">
                                    <button className="col-5 btn btn-danger">Remove</button>
                                </div>
                                {/* <button onClick={() => handleRemoveCity(props.city.id)} className="col-3 btn btn-danger">Remove</button> */}
                            </div>
                        </>
                    }                
                </div>
            </div>
        </div>
    )
}