import { useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import { DataContext } from "../contexts/DataProvider";
import SingleChar from "../components/SingleChar";
import { AuthContext } from "../contexts/AuthProvider";

export default function SelectedCharProfile() {
	const { user } = useContext(AuthContext)
	const { loading, selectedChar, chars, selectedCharInfo, getChars, loadCharInfo } = useContext(DataContext)

	function percent(count, total) {
		const result = count/total * 100
		return result.toFixed(1)
	}

	useEffect(() => {
		if (selectedCharInfo == null) {
			getChars()
		}
		
	}, [])

	return (
		<div id="SelectedCharProfile">
			{
				(loading == true) ?
				<p className='text-center text-white'>Loading...</p> :
				(user.loggedIn = false) ?
				<>
				<p>Not logged in</p>
				</> :
				(selectedCharInfo.name == null) ?
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
							<div className="row align-items-center justify-content-between pt-1 pb-3">
								<div className="col-6 ps-5">
									<div className="row justify-content-start">
										<button id="logoutBtn" onClick={ loadCharInfo }  className="btn btn-primary col-5"><strong>Refresh Character</strong></button>
									</div>
								</div>
								<div className="col-6">
									<h5 className="text-end text-black text-opacity-50 pe-4 mb-0">Selected Character</h5>
								</div>
							</div>
							<hr className="mx-2 mt-0"/>
							<div className="row align-items-center">
								<div className="col-8 text-start">
									<h4 className="mb-0 ms-5 ps-3"><img id='avatar' src={selectedChar.avatarUrl} alt='' height='75' width='75' className='me-4'/> <strong>{selectedChar.charName}</strong></h4>
								</div>
								<div className="col-3 text-end ps-0 pe-0">
									<p className="text-black text-opacity-50 mb-0">Lodestone ID:</p>
									<p className="mb-0">{selectedChar.lodestoneId}</p>
									<br />
									<p className="text-black text-opacity-50 mb-0">Server:</p>
									<p className="mb-0">{selectedChar.server}</p>
								</div>
							</div>
							<hr className="mx-2 pb-2"/>
							<div className="row justify-content-center gap-5">
								<div className="col-4 px-0">
									<div className="row mb-5">
										<div id="portrait-box" className='ms-4 px-0 shadow'>
											<a href={selectedCharInfo.portrait} target="_blank" rel="noopener noreferrer"><img id="portrait" src={selectedCharInfo.portrait} alt='character portrait'/></a>
										</div>
									</div>
									<div className="row justify-content-center pt-5">
										{
											(selectedCharInfo.achievements.public == true) ?
												<>
													<Link id="achievements-card" to="/achievements" className="col-10 card py-3 me-4 shadow rounded">
														<h4 className="mb-0">Achievements</h4>
														<hr className="mx-2"/>
														<p>{selectedCharInfo.achievements.count} of {selectedCharInfo.achievements.total} completed &nbsp; ({percent(selectedCharInfo.achievements.count, selectedCharInfo.achievements.total)}%)</p>
														<p>{selectedCharInfo.achievements.points} of {selectedCharInfo.achievements.points_total} points earned &nbsp; ({percent(selectedCharInfo.achievements.points, selectedCharInfo.achievements.points_total)}%)</p>
														<p>{selectedCharInfo.server} Rank: #{selectedCharInfo.rankings.achievements.server}</p>
														<p>{selectedCharInfo.data_center} Rank: #{selectedCharInfo.rankings.achievements.data_center}</p>
														<p>Global Rank: #{selectedCharInfo.rankings.achievements.global}</p>
													</Link>
												</> :
												<>
													<div to="/achievements" className="col-10 card py-3 me-4 shadow rounded">
														<h4 className="mb-0">Achievements</h4>
														<hr className="mx-2"/>
														<p>Achievements for this character have been set to private by their owner.</p>
														<p>If you are the owner of this character, you can change the setting on the Lodestone site.</p>
														<a id="lodestone" href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/">Go to the Lodestone</a>
													</div>
												</>
										}
									</div>
								</div>
								<div className="col-4 ps-3 me-3">
									<Link id="mounts-card" to="/mounts" className="row card py-3 mb-4 shadow rounded">
										<div className="col">
											<h4 className="mb-0">Mounts</h4>
											<hr className="mx-2"/>
											<p>{selectedCharInfo.mounts.count} of {selectedCharInfo.mounts.total} collected &nbsp; ({percent(selectedCharInfo.mounts.count, selectedCharInfo.mounts.total)}%)</p>
											{
												(selectedCharInfo.rankings.mounts.server != null) ?
													<>
														<p>{selectedCharInfo.server} Rank: #{selectedCharInfo.rankings.mounts.server}</p>
														<p>{selectedCharInfo.data_center} Rank: #{selectedCharInfo.rankings.mounts.data_center}</p>
														<p>Global Rank: #{selectedCharInfo.rankings.mounts.global}</p>
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
											<p>{selectedCharInfo.minions.count} of {selectedCharInfo.minions.total} collected &nbsp; ({percent(selectedCharInfo.minions.count, selectedCharInfo.minions.total)}%)</p>
											{
												(selectedCharInfo.rankings.minions.server != null) ?
													<>
														<p>{selectedCharInfo.server} Rank: #{selectedCharInfo.rankings.minions.server}</p>
														<p>{selectedCharInfo.data_center} Rank: #{selectedCharInfo.rankings.minions.data_center}</p>
														<p>Global Rank: #{selectedCharInfo.rankings.minions.global}</p>
													</> :
													<></>
											}	
										</div>
									</Link>
									<div className="row  card px-4 py-3 shadow rounded">
										<div className="justify-content-center">
											<div className="row">
												<h4 className="mb-3 px-0">Relics</h4>
												<hr className="px-2"/>
											</div>
											{
												(selectedCharInfo.achievements.public == true) ?
												<>
													<div className="row mb-3">
														<a id="relic-card" href="https://ffxivcollect.com/relics/weapons" target="_blank" className="card p-3 shadow rounded">
															<p className="mb-0">Relic Weapons: &nbsp; {selectedCharInfo.relics.weapons.count} of {selectedCharInfo.relics.weapons.total} &nbsp; ({percent(selectedCharInfo.relics.weapons.count, selectedCharInfo.relics.weapons.total)}%)</p>
														</a>
													</div>
													<div className="row mb-3">
														<a id="relic-card" href="https://ffxivcollect.com/relics/armor" target="_blank" className="card p-3 shadow rounded">
															<p className="mb-0">Relic Armor Pieces: &nbsp; {selectedCharInfo.relics.armor.count} of {selectedCharInfo.relics.armor.total} &nbsp; ({percent(selectedCharInfo.relics.armor.count, selectedCharInfo.relics.armor.total)}%)</p>
														</a>
													</div>
													<div className="row justify-content-center mb-3">
														<a id="relic-card" href="https://ffxivcollect.com/relics/tools" target="_blank" className="card p-3 shadow rounded">
															<p className="mb-0">Relic Tools: &nbsp; {selectedCharInfo.relics.tools.count} of {selectedCharInfo.relics.tools.total} &nbsp; ({percent(selectedCharInfo.relics.tools.count, selectedCharInfo.relics.tools.total)}%)</p>
														</a>
													</div>
												</> :
												<>
													<p>Relics for this character have been set to private by their owner.</p>
													<p>If you are the owner of this character, you can change the setting on the Lodestone site.</p>
													<a id="lodestone" href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/">Go to the Lodestone</a>
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
	)
}