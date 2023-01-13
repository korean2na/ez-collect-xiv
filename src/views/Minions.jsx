import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataProvider";

export default function Minions() {

    return (
        <div id="Minions">
            <div className="row justify-content-center">
                <h1 className="col-6 text-light ms-3 pb-3"><strong>Minions</strong></h1>
            </div>
        </div>
    )
}