import { useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import { DataContext } from "../contexts/DataProvider";
import SingleChar from "../components/SingleChar";

export default function CharProfile() {
	const { loading, char, chars, charInfo, getChars } = useContext(DataContext)

	function percent(count, total) {
		const result = count/total * 100
		return result.toFixed(1)
	}

	useEffect(() => {
		if (charInfo == null) {
			getChars()
		}
		
	}, [])

	return (
		<div id="CharProfile">
			{
				(loading == true) ?
				<p className='text-center text-white'>Loading...</p> :
				(charInfo.name == null) ?
				<>
                <div className="row justify-content-center">
                    <div id="liveAlertBar"></div>
                    <div className="card col-6 text-center py-4 mb-5 shadow-lg rounded">
                        <div className="row justify-content-center align-items-center">
                            <div className="col">
                                <p className='text-center mb-2'>Currently no visible or added characters.</p>
                                <p className='text-center mb-4'>Please unhide a character or add a character from Search.</p>
                                <Link to="/search" className="col-9 btn btn-primary">Go to Search</Link>
                            </div>
                        </div>
                    </div>
                </div>
                { chars.map(singleChar => <SingleChar key={singleChar.id} singleChar={singleChar} showHidden='yes'/>) }
                </> :
				<>
					<div className="row justify-content-center">
						<div className="card col-9 text-center pt-2 pb-4 mb-5 shadow-lg rounded">
							<h5 className="text-end text-black text-opacity-50 mx-5">Selected Character</h5><hr className="mx-2 mt-0" />
							<div className="row align-items-center">
								<div className="col-8 text-start">
									<h4 className="mb-0 ms-5 ps-3"><img id='avatar' src={char.avatarUrl} alt='' height='75' width='75' className='me-4' /> <strong>{char.charName}</strong></h4>
								</div>
								<div className="col-3 text-end ps-0 pe-0">
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
									<div className="row mb-5">
										<div id="portrait-box" className='ms-4 px-0 shadow'>
											<a href={charInfo.portrait} target="_blank" rel="noopener noreferrer"><img id="portrait" src={charInfo.portrait} alt='character portrait'/></a>
										</div>
									</div>
									<div className="row justify-content-center">
										{
											(charInfo.achievements.public == true) ?
												<>
													<Link id="achievements-card" to="/achievements" className="col-10 card py-3 me-4 shadow rounded">
														<h4 className="mb-0">Achievements</h4>
														<hr className="mx-2" />
														<p>{charInfo.achievements.count} of {charInfo.achievements.total} completed &nbsp; ({percent(charInfo.achievements.count, charInfo.achievements.total)}%)</p>
														<p>{charInfo.achievements.points} of {charInfo.achievements.points_total} points earned &nbsp; ({percent(charInfo.achievements.points, charInfo.achievements.points_total)}%)</p>
														<p>{charInfo.server} Rank: #{charInfo.rankings.achievements.server}</p>
														<p>{charInfo.data_center} Rank: #{charInfo.rankings.achievements.data_center}</p>
														<p>Global Rank: #{charInfo.rankings.achievements.global}</p>
													</Link>
												</> :
												<>
													<div to="/achievements" className="col-10 card py-3 me-4 shadow rounded">
														<h4 className="mb-0">Achievements</h4>
														<hr className="mx-2" />
														<p>Achievements for this character have been set to private by their owner.</p>
														<p>If you are the owner of this character, you can change that setting on the Lodestone site.</p>
														<a id="lodestone" href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/">Go to the Lodestone</a>
													</div>
												</>
										}
									</div>
								</div>
								<div className="col-6 ps-3 me-3">
									<Link id="mounts-card" to="/mounts" className="row card py-3 mb-4 shadow rounded">
										<div className="col">
											<h4 className="mb-0">Mounts</h4>
											<hr className="mx-2" />
											<p>{charInfo.mounts.count} of {charInfo.mounts.total} collected &nbsp; ({percent(charInfo.mounts.count, charInfo.mounts.total)}%)</p>
											{
												(charInfo.rankings.mounts.server != null) ?
													<>
														<p>{charInfo.server} Rank: #{charInfo.rankings.mounts.server}</p>
														<p>{charInfo.data_center} Rank: #{charInfo.rankings.mounts.data_center}</p>
														<p>Global Rank: #{charInfo.rankings.mounts.global}</p>
													</> :
													<></>
											}
										</div>
									</Link>
									<a href=""></a>
									<Link id="minions-card" to="/minions" className="row card py-3 mb-4 shadow rounded">
										<div className="col">
											<h4 className="mb-0">Minions</h4>
											<hr className="mx-2"/>
											<p>{charInfo.minions.count} of {charInfo.minions.total} collected &nbsp; ({percent(charInfo.minions.count, charInfo.minions.total)}%)</p>
											{
												(charInfo.rankings.minions.server != null) ?
													<>
														<p>{charInfo.server} Rank: #{charInfo.rankings.minions.server}</p>
														<p>{charInfo.data_center} Rank: #{charInfo.rankings.minions.data_center}</p>
														<p>Global Rank: #{charInfo.rankings.minions.global}</p>
													</> :
													<></>
											}	
										</div>
									</Link>
									<div className="row justify-content-center card ps-4 py-3 shadow rounded">
										<div className="row">
											<h4 className="mb-3">Relics</h4>
											<hr className="px-2"/>
										</div>
										<div className="row justify-content-evenly">
											<div className="col-4">
												<a id="relic-card" href="https://ffxivcollect.com/relics/weapons" target="_blank" className="card py-3 shadow rounded">
													<p className="mb-0"><strong>Relic Weapons</strong><hr className="mx-2"/>{charInfo.relics.weapons.count} of {charInfo.relics.weapons.total}<br/><br/>({percent(charInfo.relics.weapons.count, charInfo.relics.weapons.total)}%)</p>
												</a>
											</div>
											<div className="col-4">
												<a id="relic-card" href="https://ffxivcollect.com/relics/armor" target="_blank" className="card py-3 shadow rounded">
													<p className="mb-0"><strong>Relic Armor Pieces</strong><hr className="mx-2"/>{charInfo.relics.armor.count} of {charInfo.relics.armor.total}<br/><br/>({percent(charInfo.relics.armor.count, charInfo.relics.armor.total)}%)</p>
												</a>
											</div>
											<div className="col-4">
												<a id="relic-card" href="https://ffxivcollect.com/relics/tools" target="_blank" className="card py-3 shadow rounded">
													<p className="mb-0"><strong>Relic Tools</strong><hr className="mx-2"/>{charInfo.relics.tools.count} of {charInfo.relics.tools.total}<br/><br/>({percent(charInfo.relics.tools.count, charInfo.relics.tools.total)}%)</p>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			}
			
		</div>
	)
}