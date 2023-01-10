import { Link } from "react-router-dom"
import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export default function SingleChar(props) {
    const { selectChar } = useContext(DataContext)

    function handleSelectChar(id) {
        selectChar(id)
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
            <div className="card col-9 text-center py-4 mb-5 shadow-lg rounded">
                <div className="row align-items-center">
                    <div className="col-6">
                        <h2><strong>{ props.singleChar.charName }</strong></h2>
                    </div>
                    <div className="col-6">
                        <p>Lodestone ID: &nbsp; { props.singleChar.lodestoneId }</p>
                        <p>Server: &nbsp;&nbsp; { props.singleChar.server }</p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-6">
                        { 
                            (props.singleChar.selected) ?
                            <><button className="col-4 btn btn-warning">(Selected)</button></> :
                            <><button onClick={() => handleSelectChar(props.singleChar.id)} className="col-4 btn btn-primary">Select</button></>
                        }
                        {/* <Link to={ `/weather/city/${props.city.cityName}` } className="col-6 btn btn-primary">Show Weather</Link> */}
                    </div>
                    <div className="col-6">
                        <button className="col-3 btn btn-danger">Remove</button>
                        {/* <button onClick={() => handleRemoveCity(props.city.id)} className="col-3 btn btn-danger">Remove</button> */}
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}