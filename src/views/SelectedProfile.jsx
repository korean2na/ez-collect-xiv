import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataProvider";

export default function SelectedProfile() {
    const { chars, getChars, loadCharInfo, addChar, hideChar } = useContext(DataContext)

    return (
        <div id="SelectedProfile">
            
        </div>
    )
}