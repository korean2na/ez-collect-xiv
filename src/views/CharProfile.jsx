import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { DataContext } from "../contexts/DataProvider";

export default function CharProfile() {
	const { loading, setLoading, getCharInfo, checkXIVAPI } = useContext(DataContext)
    const { singleLID } = useParams()
	const [charPublic, setCharPublic] = useState(true)
	const [charInst, setCharInst] = useState({})

	function percent(count, total) {
		const result = count/total * 100
		return result.toFixed(1)
	}

	const handleLoadCharInst = async function(LID) {
		setLoading(true)

		const reqResponse = await getCharInfo(LID)
		if (reqResponse === 'private') {
			setCharPublic(false)
			setCharInst(await checkXIVAPI(LID))
		} else {
			setCharInst(reqResponse)
		}

		setLoading(false)
	}

	useEffect(() => {
		handleLoadCharInst(singleLID)
		
	}, [])


	return (
		<div id="CharProfile">
			<div className="row justify-content-center">
				{
					(loading === true) ?
						<p className='text-center text-white'>Loading...</p> :
					(charPublic === false) ?
					<>
						<div className="card col-6 text-center py-4 mb-5 mt-3 shadow-lg rounded">
							<hr className="mx-2 mt-0"/>
							<div className="row align-items-center">
								<div className="col-8 text-start">
									<h4 className="mb-0 ms-5 ps-3"><img id='avatar' src={ charInst.avatar } alt='' height='75' width='75' className='me-4'/> <strong>{ charInst.name }</strong></h4>
								</div>
								<div className="col-3 text-end ps-0 pe-0">
									<p className="text-black text-opacity-50 mb-0">Lodestone ID:</p>
									<p className="mb-0">{ charInst.id }</p>
									<br />
									<p className="text-black text-opacity-50 mb-0">Server:</p>
									<p className="mb-0">{ charInst.server }</p>
								</div>
							</div>
							<hr className="mx-2 mb-4"/>
							<p>This character's information is currently set to private by their owner.</p>
						</div>
					</> :
					<>
						<div className="row justify-content-center">
							<div className="card col-9 text-center py-4 mb-5 shadow-lg rounded">
								<hr className="mx-2 mt-0"/>
								<div className="row align-items-center">
									<div className="col-8 text-start">
										<h4 className="mb-0 ms-5 ps-3"><img id='avatar' src={charInst.avatar} alt='' height='75' width='75' className='me-4'/> <strong>{charInst.name}</strong></h4>
									</div>
									<div className="col-3 text-end ps-0 pe-0">
										<p className="text-black text-opacity-50 mb-0">Lodestone ID:</p>
										<p className="mb-0">{charInst.id}</p>
										<br />
										<p className="text-black text-opacity-50 mb-0">Server:</p>
										<p className="mb-0">{charInst.server}</p>
									</div>
								</div>
								<hr className="mx-2 pb-2"/>
								<div className="row justify-content-center gap-5">
									<div className="col-4 px-0">
										<div className="row mb-5">
											<div id="portrait-box" className='ms-4 px-0 shadow'>
												<a href={charInst.portrait} target="_blank" rel="noreferrer"><img id="portrait" src={charInst.portrait} alt='character portrait'/></a>
											</div>
										</div>
										<div className="row justify-content-center pt-5">
											{
												(charInst.achievements.public === true) ?
												<>
													<a id="achievements-card" href="https://ffxivcollect.com/achievements/search" target="_blank" rel="noreferrer" className="col-10 card py-3 me-4 shadow rounded">
														<h4 className="mb-0">Achievements</h4>
														<hr className="mx-2"/>
														<p>{charInst.achievements.count} of {charInst.achievements.total} completed &nbsp; ({percent(charInst.achievements.count, charInst.achievements.total)}%)</p>
														<p>{charInst.achievements.points} of {charInst.achievements.points_total} points earned &nbsp; ({percent(charInst.achievements.points, charInst.achievements.points_total)}%)</p>
														<p>{charInst.server} Rank: #{charInst.rankings.achievements.server}</p>
														<p>{charInst.data_center} Rank: #{charInst.rankings.achievements.data_center}</p>
														<p>Global Rank: #{charInst.rankings.achievements.global}</p>
													</a>
												</> :
												<>
													<div to="/achievements" className="col-10 card py-3 me-4 shadow rounded">
														<h4 className="mb-0">Achievements</h4>
														<hr className="mx-2"/>
														<p>Achievements for this character have been set to private by their owner.</p>
														<p>If you are the owner of this character, you can change the setting on the Lodestone site.</p>
														<a id="lodestone" href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/" target="_blank" rel="noreferrer">Go to the Lodestone</a>
													</div>
												</>
											}
										</div>
									</div>
									<div className="col-4 ps-3 me-3">
										<a id="mounts-card" href="https://ffxivcollect.com/mounts" target="_blank" rel="noreferrer" className="row card py-3 mb-4 shadow rounded">
											<div className="col">
												<h4 className="mb-0">Mounts</h4>
												<hr className="mx-2"/>
												<p>{charInst.mounts.count} of {charInst.mounts.total} collected &nbsp; ({percent(charInst.mounts.count, charInst.mounts.total)}%)</p>
												{
													(charInst.rankings.mounts.server != null) ?
													<>
														<p>{charInst.server} Rank: #{charInst.rankings.mounts.server}</p>
														<p>{charInst.data_center} Rank: #{charInst.rankings.mounts.data_center}</p>
														<p>Global Rank: #{charInst.rankings.mounts.global}</p>
													</> :
													<></>
												}
											</div>
										</a>
										<a id="minions-card" href="https://ffxivcollect.com/minions" target="_blank" rel="noreferrer" className="row card py-3 mb-4 shadow rounded">
											<div className="col">
												<h4 className="mb-0">Minions</h4>
												<hr className="mx-2"/>
												<p>{charInst.minions.count} of {charInst.minions.total} collected &nbsp; ({percent(charInst.minions.count, charInst.minions.total)}%)</p>
												{
													(charInst.rankings.minions.server != null) ?
													<>
														<p>{charInst.server} Rank: #{charInst.rankings.minions.server}</p>
														<p>{charInst.data_center} Rank: #{charInst.rankings.minions.data_center}</p>
														<p>Global Rank: #{charInst.rankings.minions.global}</p>
													</> :
													<></>
												}	
											</div>
										</a>
										<div className="row  card px-4 py-3 shadow rounded">
											<div className="justify-content-center">
												<div className="row">
													<h4 className="mb-3 px-0">Relics</h4>
													<hr className="px-2"/>
												</div>
												{
													(charInst.achievements.public === true) ?
													<>
														<div className="row mb-3">
															<a id="relic-card" href="https://ffxivcollect.com/relics/weapons" target="_blank" rel="noreferrer" className="card p-3 shadow rounded">
																<p className="mb-0">Relic Weapons: &nbsp; {charInst.relics.weapons.count} of {charInst.relics.weapons.total} &nbsp; ({percent(charInst.relics.weapons.count, charInst.relics.weapons.total)}%)</p>
															</a>
														</div>
														<div className="row mb-3">
															<a id="relic-card" href="https://ffxivcollect.com/relics/armor" target="_blank" rel="noreferrer" className="card p-3 shadow rounded">
																<p className="mb-0">Relic Armor Pieces: &nbsp; {charInst.relics.armor.count} of {charInst.relics.armor.total} &nbsp; ({percent(charInst.relics.armor.count, charInst.relics.armor.total)}%)</p>
															</a>
														</div>
														<div className="row justify-content-center mb-3">
															<a id="relic-card" href="https://ffxivcollect.com/relics/tools" target="_blank" rel="noreferrer" className="card p-3 shadow rounded">
																<p className="mb-0">Relic Tools: &nbsp; {charInst.relics.tools.count} of {charInst.relics.tools.total} &nbsp; ({percent(charInst.relics.tools.count, charInst.relics.tools.total)}%)</p>
															</a>
														</div>
													</> :
													<>
														<p>Relics for this character have been set to private by their owner.</p>
														<p>If you are the owner of this character, you can change the setting on the Lodestone site.</p>
														<a id="lodestone" href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/" target="_blank" rel="noreferrer">Go to the Lodestone</a>
													</>
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				}
			</div>
		</div>
	)
}