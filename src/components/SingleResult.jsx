import { Link } from 'react-router-dom'
import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export default function SingleResult(props) {
    const { char, chars, selectChar, getChars, loadCharInfo, hideChar, unhideChar, addChar, removeChar } = useContext(DataContext)

    const filtered = chars.filter(n => n.lodestoneId == props.result['ID'])

    function addedCheck(LID) {
        if (char.lodestoneId == LID) {
            return 'SELECTED'
        } else if (filtered.length > 0) {
            if (filtered[0].hidden == true) {
                return 'HIDDEN'
            }
            return 'ADDED'
        }

        return 'FREE'
    }

    const status = addedCheck(props.result['ID'])

    async function handleSelectChar(id) {
        await selectChar(id)
        await getChars()
        await loadCharInfo()
    }

    async function handleHideChar(id) {
        await hideChar(id)
        await getChars()
    }

    async function handleUnhideChar(id) {
        await unhideChar(id)
        await getChars()
    }

    async function handleAddChar(LID, charName, server) {
        await addChar(LID, charName, server)
    }

    async function handleRemoveChar(id) {
        await removeChar(id)
        await getChars()
    }
  
    return (
        <div className="row justify-content-center">
            <div className="card col-6 text-center py-4 mb-5 shadow-lg rounded">
                {
                    (status === 'SELECTED') ?
                    <>
                        <h5 className="text-end text-black text-opacity-50 mx-3">Currently Selected Character</h5>
                    </> :
                    <></>
                }
                <hr className="mx-2 mt-0"/>
                <div className="row align-items-center">
                    <div className="col-8 text-start">
                        <h4 className="mb-0 ps-3"><img id='avatar' src={ props.result.Avatar } alt='' height='75' width='75' className='me-3'/> <strong>{ props.result.Name }</strong></h4>
                    </div>
                    <div className="col-4 text-end ps-0 pe-4">
                        <p className="text-black text-opacity-50 mb-0">Lodestone ID:</p>
                        <p className="mb-0">{ props.result['ID'] }</p>
                        <br />
                        <p className="text-black text-opacity-50 mb-0">Server:</p>
                        <p className="mb-0">{ props.result.Server }</p>
                    </div>
                </div>
                <hr className="mx-2"/>
                {
                    (status === 'SELECTED') ?
                        <>
                            <div className="row justify-content-center">
                                <div className="col-10">
                                    <Link to={ '/profile' } className="col-12 btn btn-success">View Profile</Link>
                                </div>
                            </div>
                        </> :
                    (status === 'ADDED') ?
                        <>
                            <div className="row justify-content-evenly">
                                <div className="col-4">
                                    <button onClick={() => handleSelectChar(filtered[0].id)} className="col-11 btn btn-primary">Select</button>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => handleHideChar(filtered[0].id)} className="col-11 btn btn-secondary">Hide</button>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => handleRemoveChar(filtered[0].id)} className="col-11 btn btn-danger">Remove</button>
                                </div>
                            </div>
                        </> :
                    (status === 'HIDDEN') ?
                        <>
                            <div className="row">
                                <div className="col-6">
                                    <div className="row justify-content-start mx-4">
                                        <button onClick={() => handleUnhideChar(filtered[0].id)} className="col-5 btn btn-warning">Unhide</button>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row justify-content-end mx-4">
                                        <button onClick={() => handleRemoveChar(filtered[0].id)} className="col-5 btn btn-danger">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </> :
                    <>
                        <div className="row justify-content-center">
                            <div className="col-8">
                                <button onClick={() => handleAddChar(props.result['ID'], props.result.Name, props.result.Server)} className="col-6 btn btn-success">Add</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    ) 
    
}