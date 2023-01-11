import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataProvider";
import SelectedChar from "../components/SelectedChar";
import SingleChar from "../components/SingleChar";

export default function CharSearch() {
    const { chars, getChars, loadCharInfo, addChar, hideChar } = useContext(DataContext)

    return (
        <div className="CharSearch">
            <h1 className="text-light text-center pb-3"><strong>Character Search</strong></h1>
            <div className="row justify-content-center">
                <div className="card col-6 p-4 shadow-lg rounded">
                    <form onSubmit="">
                        <label className="form-label">Home World</label>
                        <select className="form-select mb-3" aria-label="Default select example">
                            <option selected className="text-muted" value="">Home World (Data Center)</option>
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
                            <label className="form-label">Character Name</label>
                            <input type="text" className="form-control" placeholder=""/>
                        </div>
                        <div className="row justify-content-end">
                            <button type="submit" className="col-3 btn btn-primary fs-4 me-4"><strong>Search</strong></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}