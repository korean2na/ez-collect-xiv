import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export default function SingleChar(props) {
    const { selectChar, getChars, loadCharInfo, removeChar } = useContext(DataContext)

    async function handleSelectChar(id) {
        await selectChar(id)
        await getChars()
        await loadCharInfo()
    }

    async function handleRemoveChar(id) {
        await removeChar(id)
        await getChars()
    }

    if (!props.singleChar) {
        return (
            <div className="row justify-content-center">
                <div className="card col-6 text-center gap-3 py-4 mb-5 shadow-lg rounded">
                    <h2><strong>Not Found</strong></h2>
                </div>
            </div>
        )
    } else if (props.singleChar.hidden == true) {
        return null
    } else {
        return (
            <div className="row justify-content-center">
                <div className="card col-6 text-center py-4 mb-5 shadow-lg rounded">
                    <hr className="mx-2 mt-0"/>
                    <div className="row align-items-center">
                        <div className="col-8 text-start">
                            <h4 className="mb-0 ps-3"><img id='avatar' src={ props.singleChar.avatarUrl } alt='' height='75' width='75' className='me-3'/> <strong>{ props.singleChar.charName }</strong></h4>
                        </div>
                        <div className="col-4 text-end ps-0 pe-4">
                            <p className="text-black text-opacity-50 mb-0">Lodestone ID:</p>
                            <p className="mb-0">{ props.singleChar.lodestoneId }</p>
                            <br />
                            <p className="text-black text-opacity-50 mb-0">Server:</p>
                            <p className="mb-0">{ props.singleChar.server }</p>
                        </div>
                    </div>
                    <hr className="mx-2"/>
                    <div className="row">
                        <div className="col-6">
                            <div className="row justify-content-start mx-4">
                                <button onClick={() => handleSelectChar(props.singleChar.id)} className="col-5 btn btn-primary">Select</button>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row justify-content-end mx-4">
                                <button onClick={() => handleRemoveChar(props.singleChar.id)} className="col-5 btn btn-danger">Remove</button>
                            </div>
                        </div>             
                    </div>
                </div>
            </div>
        ) 
    }
}