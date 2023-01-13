import { useState, useEffect, createContext, useContext} from "react";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, deleteDoc, query, orderBy, updateDoc } from '@firebase/firestore'
import { AuthContext } from "./AuthProvider";

export const DataContext = createContext()

export const DataProvider = function (props) {
    const db = getFirestore()
    const { user } = useContext(AuthContext)
    const [chars, setChars] = useState([])
    const [char, setChar] = useState({})
    const [charInfo, setCharInfo] = useState({})

    const searchErrorTemplate = `
        <div class="card col-4 py-3 gap-1 shadow-lg rounded">
            <h2><strong>Oops!</strong></h2>
            <p>Looks like there was an error, please try again with a different search query.</p>
        </div>
    `
    
    function toTitleCase(str) {
        return str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }

    const checkFFXIVC = async function(LID) {
        try {
            const checkResponse = await fetch(`https://ffxivcollect.com/api/characters/${LID}/`)
            if (checkResponse.status === 200) {
                console.log('CHECK (1 call to xivapi)')
                return true
            } else {
                console.log('CHECK (1 call to xivapi)')
                return false
            }

        } catch (err) {
            console.log('ERROR! ERROR! ERROR!')
            console.log(err)
        }
    }

    const getCharInfo = async function(LID) {
        if (user.loggedIn == true) {
            try{
                const charResponse = await fetch(`https://ffxivcollect.com/api/characters/${LID}?latest=true&ids=true/`)
                const charData = await charResponse.json()
                
                console.log('CHAR loaded (1 call to ffxivc')
                return {
                    id: charData.id,
                    name: charData.name,
                    server: charData.server,
                    dataCenter: charData.data_center,
                    portrait: charData.portrait,
                    avatar: charData.avatar,
                    lastParsed: charData.last_parsed,
                    achievements: charData.achievements,
                    mounts: charData.mounts,
                    minions: charData.minions,
                    rankings: charData.rankings,
                    relics: charData.relics
                }
            } catch (err) {
                console.log('ERROR! ERROR! ERROR!')
                console.log(err)
            }
        }
    }

    const getCharAvatar = async function(LID) {
        if (user.loggedIn == true) {
            try{
                const charResponse = await fetch(`https://xivapi.com/character/${LID}`)
                const charData = await charResponse.json()
    
                return charData.Character.Avatar
            } catch (err) {
                console.log('ERROR! ERROR! ERROR!')
                console.log(err)
            }
        }  
    }
    
    const getChars = async function() {
        if (user.loggedIn == true) {
            const q = query(collection(db, 'users', `${user.uid}`, 'characters'))
        // const q = query(collection(db, 'users', `${user.uid}`, 'characters'), orderBy('selected', 'desc'))
        const querySnap = await getDocs(q)
        const charsDocs = []

        querySnap.forEach(async (doc) => {
            try{
                const avatar = await getCharAvatar(doc.data().lodestoneId)
                if (doc.data().selected) {
                    const charDoc = {
                        id: doc.id,
                        avatarUrl: avatar,
                        ...doc.data()
                    }
                    setChar(charDoc)
                }
                charsDocs.push({
                    id: doc.id,
                    avatarUrl: avatar,
                    ...doc.data()
                })
                setChars(charsDocs)

                console.log(`AVATAR loaded (1 call to xivapi)`)
            } catch (err) {
                console.log('ERROR! ERROR! ERROR!')
                console.log(err)
            }
        })
        }
    }

    const loadCharInfo = async function() {
        if (user.loggedIn == true) {
            const charInfo = await getCharInfo(char.lodestoneId)
            setCharInfo(charInfo)
        }
    }

    async function selectChar(id) {
        const charRef = doc(db, 'users', `${user.uid}`, 'characters', `${char.id}`)

        await updateDoc(charRef, {
            selected: false
        })

        const newCharRef = doc(db, 'users', `${user.uid}`, 'characters', `${id}`)

        await updateDoc(newCharRef, {
            selected: true,
            hidden: false
        })
    }

    async function hideChar(id) {
        const charRef = doc(db, 'users', `${user.uid}`, 'characters', `${id}`)

        await updateDoc(charRef, {
            hidden: true
        })
    }

    async function unhideChar(id) {
        const charRef = doc(db, 'users', `${user.uid}`, 'characters', `${id}`)

        await updateDoc(charRef, {
            hidden: false
        })
    }

    async function addChar(LID, charName, server) {
        const newChar = {
            charName: charName,
            hidden: false,
            lodestoneId: LID,
            selected: false,
            server: server
        }

        await setDoc(doc(db, 'users', `${user.uid}`), {
            displayName: user.displayName
        })

        const charDoc = await addDoc(collection(db, 'users', `${user.uid}`, 'characters'), newChar)

        newChar.id = charDoc.id

        getChars()
    }
    
    async function removeChar(id) {
        await deleteDoc(doc(db, 'users', `${user.uid}`, 'characters', `${id}`))

        getChars()
    }

    useEffect(() => {
        loadCharInfo()

    }, [char])


    const value = {
        chars,
        char,
        charInfo,
        toTitleCase,
        getChars,
        checkFFXIVC,
        loadCharInfo,
        selectChar,
        hideChar,
        unhideChar,
        addChar,
        removeChar
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}