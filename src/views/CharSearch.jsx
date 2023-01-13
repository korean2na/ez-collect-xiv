import { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../contexts/AuthProvider";
// import { DataContext } from "../contexts/DataProvider";
import SingleResult from "../components/SingleResult";

export default function CharSearch() {
    // const { char, chars, getChars, loadCharInfo, addChar, hideChar } = useContext(DataContext)
    // const { user } = useContext(AuthContext)
    const [searchResults, setSearchResults] = useState(['init'])

    const alertBar = document.getElementById('liveAlertBar')

    const alert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
  
      alertBar.append(wrapper)
    }

    async function searchChar(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target)
        const serverName = formData.get('serverName')
        const charName = formData.get('charName')
        if (charName !== '') {
            try {
                const searchResponse = await fetch(`https://xivapi.com/character/search?name=${charName}&server=${serverName}`)
                const searchData = await searchResponse.json()

                setSearchResults(searchData.Results)
            } catch (err) {
                console.log('ERROR! ERROR! ERROR!')
                console.log(err)
            }
        } else {
            alert('Character Name cannot be empty. Please try again.','warning')
        }
    }

    return (
        <div id="CharSearch">
            <div id="liveAlertBar"></div>
            <h1 className="text-light text-center pb-3"><strong>Character Search</strong></h1>
            <div className="row justify-content-center">
                <div className="card col-6 p-4 mb-5 shadow-lg rounded">
                    <form onSubmit={searchChar}>
                        <label htmlFor="serverName" className="form-label">Home World</label>
                        <select name="serverName" className="form-select mb-3" aria-label="serverName">
                            <option value="">All Home Worlds</option>
                            <option value="Adamantoise">Adamantoise (Aether)</option>
                            <option value="Cactuar">Cactuar (Aether)</option>
                            <option value="Faerie">Faerie (Aether)</option>
                            <option value="Gilgamesh">Gilgamesh (Aether)</option>
                            <option value="Jenova">Jenova (Aether)</option>
                            <option value="Midgardsormr">Midgardsormr (Aether)</option>
                            <option value="Sargatanas">Sargatanas (Aether)</option>
                            <option value="Siren">Siren (Aether)</option>
                            <option value="Balmung">Balmung (Crystal)</option>
                            <option value="Brynhildr">Brynhildr (Crystal)</option>
                            <option value="Coeurl">Coeurl (Crystal)</option>
                            <option value="Diabolos">Diabolos (Crystal)</option>
                            <option value="Goblin">Goblin (Crystal)</option>
                            <option value="Malboro">Malboro (Crystal)</option>
                            <option value="Mateus">Mateus (Crystal)</option>
                            <option value="Zalera">Zalera (Crystal)</option>
                            <option value="Halicarnassus">Halicarnassus (Dynamis)</option>
                            <option value="Maduin">Maduin (Dynamis)</option>
                            <option value="Marilith">Marilith (Dynamis)</option>
                            <option value="Seraph">Seraph (Dynamis)</option>
                            <option value="Behemoth">Behemoth (Primal)</option>
                            <option value="Excalibur">Excalibur (Primal)</option>
                            <option value="Exodus">Exodus (Primal)</option>
                            <option value="Famfrit">Famfrit (Primal)</option>
                            <option value="Hyperion">Hyperion (Primal)</option>
                            <option value="Lamia">Lamia (Primal)</option>
                            <option value="Leviathan">Leviathan (Primal)</option>
                            <option value="Ultros">Ultros (Primal)</option>
                            <option value="Cerberus">Cerberus (Chaos)</option>
                            <option value="Louisoix">Louisoix (Chaos)</option>
                            <option value="Moogle">Moogle (Chaos)</option>
                            <option value="Omega">Omega (Chaos)</option>
                            <option value="Phantom">Phantom (Chaos)</option>
                            <option value="Ragnarok">Ragnarok (Chaos)</option>
                            <option value="Sagittarius">Sagittarius (Chaos)</option>
                            <option value="Spriggan">Spriggan (Chaos)</option>
                            <option value="Alpha">Alpha (Light)</option>
                            <option value="Lich">Lich (Light)</option>
                            <option value="Odin">Odin (Light)</option>
                            <option value="Phoenix">Phoenix (Light)</option>
                            <option value="Raiden">Raiden (Light)</option>
                            <option value="Shiva">Shiva (Light)</option>
                            <option value="Twintania">Twintania (Light)</option>
                            <option value="Zodiark">Zodiark (Light)</option>
                            <option value="Aegis">Aegis (Elemental)</option>
                            <option value="Atomos">Atomos (Elemental)</option>
                            <option value="Carbuncle">Carbuncle (Elemental)</option>
                            <option value="Garuda">Garuda (Elemental)</option>
                            <option value="Gungnir">Gungnir (Elemental)</option>
                            <option value="Kujata">Kujata (Elemental)</option>
                            <option value="Tonberry">Tonberry (Elemental)</option>
                            <option value="Typhon">Typhon (Elemental)</option>
                            <option value="Alexander">Alexander (Gaia)</option>
                            <option value="Bahamut">Bahamut (Gaia)</option>
                            <option value="Durandal">Durandal (Gaia)</option>
                            <option value="Fenrir">Fenrir (Gaia)</option>
                            <option value="Ifrit">Ifrit (Gaia)</option>
                            <option value="Ridill">Ridill (Gaia)</option>
                            <option value="Tiamat">Tiamat (Gaia)</option>
                            <option value="Ultima">Ultima (Gaia)</option>
                            <option value="Anima">Anima (Mana)</option>
                            <option value="Asura">Asura (Mana)</option>
                            <option value="Chocobo">Chocobo (Mana)</option>
                            <option value="Hades">Hades (Mana)</option>
                            <option value="Ixion">Ixion (Mana)</option>
                            <option value="Masamune">Masamune (Mana)</option>
                            <option value="Pandaemonium">Pandaemonium (Mana)</option>
                            <option value="Titan">Titan (Mana)</option>
                            <option value="Belias">Belias (Meteor)</option>
                            <option value="Mandragora">Mandragora (Meteor)</option>
                            <option value="Ramuh">Ramuh (Meteor)</option>
                            <option value="Shinryu">Shinryu (Meteor)</option>
                            <option value="Unicorn">Unicorn (Meteor)</option>
                            <option value="Valefor">Valefor (Meteor)</option>
                            <option value="Yojimbo">Yojimbo (Meteor)</option>
                            <option value="Zeromus">Zeromus (Meteor)</option>
                            <option value="Bismarck">Bismarck (Materia)</option>
                            <option value="Ravana">Ravana (Materia)</option>
                            <option value="Sephirot">Sephirot (Materia)</option>
                            <option value="Sophia">Sophia (Materia)</option>
                            <option value="Zurvan">Zurvan (Materia)</option>
                        </select>
                        <div className="mb-3">
                            <label htmlFor="charName" className="form-label">Character Name</label>
                            <input name="charName" type="text" className="form-control" placeholder="(Character Name cannot be empty)"/>
                        </div>
                        <div className="row justify-content-end">
                            <button type="submit" className="col-3 btn btn-primary fs-4 me-4"><strong>Search</strong></button>
                        </div>
                    </form>
                </div>

                {
                    (searchResults[0] == 'init') ?
                    <></> :
                    (searchResults.length == 0) ?
                    <>
                        <div className="row justify-content-center">
                            <div className="card col-6 text-center gap-3 py-4 mb-5 shadow-lg rounded">
                                <h2><strong>No Results Found</strong></h2>
                            </div>
                        </div>
                    </> :
                    searchResults.map(result => <SingleResult key={result['ID']} result={result}/>)
                }
            </div>
        </div>
    )
}