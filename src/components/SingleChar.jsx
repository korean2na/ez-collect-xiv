import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"
import CreateAlert from './CreateAlert';

export default function SingleChar(props) {
    const { selectChar, getChars, loadCharInfo, hideChar, unhideChar, removeChar } = useContext(DataContext)

    async function handleSelectChar(id) {
        window.scrollTo(0, 0)
        await selectChar(id)
        await getChars()
        CreateAlert('Characted selected successfully.', 'success')
    }

    async function handleHideChar(id) {
        window.scrollTo(0, 0)
        await hideChar(id)
        await getChars()
        CreateAlert('Characted hidden successfully.', 'secondary')
    }

    async function handleUnhideChar(id) {
        window.scrollTo(0, 0)
        await unhideChar(id)
        await getChars()
        CreateAlert('Characted unhidden successfully.', 'success')
    }

    async function handleRemoveChar(id) {
        window.scrollTo(0, 0)
        await removeChar(id)
        await getChars()
        CreateAlert('Characted removed successfully.', 'secondary')
    }

    if (!props.singleChar) {
        return (
            <div className="row justify-content-center">
                <div className="card col-6 text-center gap-3 py-4 mb-5 shadow-lg rounded">
                    <h2><strong>Not Found</strong></h2>
                </div>
            </div>
        )
    } else if (props.singleChar.selected == true) {
        return null
    } else if (props.showHidden === 'yes' && props.singleChar.hidden == true) {
        return (
            <div className="row justify-content-center">
                <div id="liveAlertBar"></div>
                <div className="card col-6 text-center py-4 mb-5 shadow-lg rounded">
                    <hr className="mx-2 mt-0"/>
                    <div className="row align-items-center">
                        <div className="col-8 text-start">
                            <h4 className="mb-0 ms-5 ps-3"><img id='avatar' src={ props.singleChar.avatarUrl } alt='' height='75' width='75' className='me-4'/> <strong>{ props.singleChar.charName }</strong></h4>
                        </div>
                        <div className="col-3 text-end ps-0 pe-0">
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
                                <button onClick={() => handleUnhideChar(props.singleChar.id)} className="col-5 btn btn-info">Unhide</button>
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
    } else if (props.singleChar.hidden != true) {
        return (
            <div className="row justify-content-center">
                <div id="liveAlertBar"></div>
                <div className="card col-6 text-center py-4 mb-5 shadow-lg rounded">
                    <hr className="mx-2 mt-0"/>
                    <div className="row align-items-center">
                        <div className="col-8 text-start">
                            <h4 className="mb-0 ms-5 ps-3"><img id='avatar' src={ props.singleChar.avatarUrl } alt='' height='75' width='75' className='me-4'/> <strong>{ props.singleChar.charName }</strong></h4>
                        </div>
                        <div className="col-3 text-end ps-0 pe-0">
                            <p className="text-black text-opacity-50 mb-0">Lodestone ID:</p>
                            <p className="mb-0">{ props.singleChar.lodestoneId }</p>
                            <br />
                            <p className="text-black text-opacity-50 mb-0">Server:</p>
                            <p className="mb-0">{ props.singleChar.server }</p>
                        </div>
                    </div>
                    <hr className="mx-2"/>
                    <div className="row justify-content-evenly">
                        <div className="col-4">
                            <button onClick={() => handleSelectChar(props.singleChar.id)} className="col-11 btn btn-primary">Select</button>
                        </div>
                        <div className="col-4">
                            <button onClick={() => handleHideChar(props.singleChar.id)} className="col-11 btn btn-secondary">Hide</button>
                        </div>             
                        <div className="col-4">
                            <button onClick={() => handleRemoveChar(props.singleChar.id)} className="col-11 btn btn-danger">Remove</button>
                        </div>             
                    </div>
                </div>
            </div>
        ) 
    }
}