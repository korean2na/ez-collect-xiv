import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataProvider";

export default function CharProfile() {
    const { char, charInfo } = useContext(DataContext)

    function percent(count, total) {
        const result = count/total * 100
        return result.toFixed(1)
    }

    return (
        <div id="CharProfile">
            <div className="row justify-content-center">
                <div className="card col-9 text-center pt-2 pb-4 mb-5 shadow-lg rounded">
                    <h5 className="text-end text-black text-opacity-50 mx-3">Selected Character</h5><hr className="mx-2 mt-0" />
                    <div className="row align-items-center">
                        <div className="col-8 text-start">
                            <h4 className="mb-0 ps-3"><img id='avatar' src={char.avatarUrl} alt='' height='75' width='75' className='me-3' /> <strong>{char.charName}</strong></h4>
                        </div>
                        <div className="col-4 text-end ps-0 pe-4">
                            <p className="text-black text-opacity-50 mb-0">Lodestone ID:</p>
                            <p className="mb-0">{char.lodestoneId}</p>
                            <br />
                            <p className="text-black text-opacity-50 mb-0">Server:</p>
                            <p className="mb-0">{char.server}</p>
                        </div>
                    </div>
                    <hr className="mx-2 pb-2" />
                    <div className="row justify-content-center">
                        <div className="col-4 px-0">
                            <div className="row mb-3">
                                <div id="portrait-box" className='ms-4 px-0'>
                                    <a href={ charInfo.portrait } target="_blank" rel="noopener noreferrer"><img id="portrait" src={ charInfo.portrait } alt='character portrait'/></a>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                {
                                    (charInfo.achievements.public == true) ?
                                    <>
                                        <div className="col-10 card py-3 me-4 shadow rounded">
                                            <h4 className="mb-0">Achievements</h4>
                                            <hr className="mx-2" />
                                            <p>{ charInfo.achievements.count } of { charInfo.achievements.total } completed &nbsp; ({ percent(charInfo.achievements.count,charInfo.achievements.total) }%)</p>
                                            <p>{ charInfo.achievements.points } of { charInfo.achievements.points_total } points earned &nbsp; ({ percent(charInfo.achievements.points,charInfo.achievements.points_total) }%)</p>
                                            <p>{ charInfo.server } Rank: #{ charInfo.rankings.achievements.server }</p>
                                            <p>{ charInfo.data_center } Rank: #{ charInfo.rankings.achievements.data_center }</p>
                                            <p>Global Rank: #{ charInfo.rankings.achievements.global }</p>
                                        </div>
                                    </> :
                                    <></>
                                }
                            </div>
                        </div>
                        <div className="col-6 ps-3 me-3">
                            <div className="row card py-3 mb-4 shadow rounded">
                                <div className="col">
                                    <h4 className="mb-0">Mounts</h4>
                                    <hr className="mx-2" />
                                    <p>{ charInfo.mounts.count } of { charInfo.mounts.total } collected &nbsp; ({ percent(charInfo.mounts.count,charInfo.mounts.total) }%)</p>
                                    {
                                        (charInfo.rankings.mounts.server != null) ?
                                        <>
                                            <p>{ charInfo.server } Rank: #{ charInfo.rankings.mounts.server }</p>
                                            <p>{ charInfo.data_center } Rank: #{ charInfo.rankings.mounts.data_center }</p>
                                            <p>Global Rank: #{ charInfo.rankings.mounts.global }</p>
                                        </> :
                                        <></>
                                    }
                                </div>
                            </div>
                            <div className="row card py-3 mb-4 shadow rounded">
                                <div className="col">
                                    <h4 className="mb-0">Minions</h4>
                                    <hr className="mx-2" />
                                    <p>{ charInfo.minions.count } of { charInfo.minions.total } collected &nbsp; ({ percent(charInfo.minions.count,charInfo.minions.total) }%)</p>
                                    {
                                        (charInfo.rankings.minions.server != null) ?
                                        <>
                                            <p>{ charInfo.server } Rank: #{ charInfo.rankings.minions.server }</p>
                                            <p>{ charInfo.data_center } Rank: #{ charInfo.rankings.minions.data_center }</p>
                                            <p>Global Rank: #{ charInfo.rankings.minions.global }</p>
                                        </> :
                                        <></>
                                    }
                                </div>
                            </div>
                            <div className="row card py-3 shadow rounded">
                                <div className="col">
                                    <h4 className="mb-0">Relics</h4>
                                    <hr className="mx-2" />
                                    <p>{ charInfo.relics.weapons.count } of { charInfo.relics.weapons.total } relic weapons collected &nbsp; ({ percent(charInfo.relics.weapons.count,charInfo.relics.weapons.total) }%)</p>
                                    <p>{ charInfo.relics.armor.count } of { charInfo.relics.armor.total } relic armor pieces collected &nbsp; ({ percent(charInfo.relics.armor.count,charInfo.relics.armor.total) }%)</p>
                                    <p>{ charInfo.relics.tools.count } of { charInfo.relics.tools.total } relic tools collected &nbsp; ({ percent(charInfo.relics.tools.count,charInfo.relics.tools.total) }%)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}