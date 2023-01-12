import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataProvider";

export default function SingleProfile() {
    const { chars, getChars, loadCharInfo, addChar, hideChar } = useContext(DataContext)

    return (
        <div id="SingleProfile">
            
        </div>
    )
}