import { useState, useEffect, createContext, useContext} from "react";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, deleteDoc, query, orderBy, updateDoc, where } from '@firebase/firestore'
import { AuthContext } from "./AuthProvider";

export const DataContext = createContext()

export const DataProvider = function (props) {
    const db = getFirestore()
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [chars, setChars] = useState([])
    const [selectedChar, setSelectedChar] = useState({})
    const [selectedCharInfo, setSelectedCharInfo] = useState({})
    const [ownedAchievements, setOwnedAchievements] = useState([])
    const [ownedMounts, setOwnedMounts] = useState([])
    const [ownedMinions, setOwnedMinions] = useState([])
    const [achievementsList, setAchievementsList] = useState([])
    const [mountsList, setMountsList] = useState([])
    const [minionsList, setMinionsList] = useState([])

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

    const checkXIVAPI = async function(LID) {
        try {
            const checkResponse = await fetch(`https://xivapi.com/character/${LID}`)
            const xivapiData = await checkResponse.json()
            return {
                id: LID,
                name: xivapiData.Character.Name,
                server: xivapiData.Character.Server,
                avatar: xivapiData.Character.Avatar
            }

        } catch (err) {
            console.log('ERROR! ERROR! ERROR!')
            console.log(err)
        }
    }

    const checkFFXIVC = async function(LID) {
        try {
            const checkResponse = await fetch(`https://ffxivcollect.com/api/characters/${LID}/`)
            if (checkResponse.status === 200) {
                console.log('CHECK (1 call to ffxivc)')
                return true
            } else {
                console.log('CHECK (1 call to ffxivc)')
                return false
            }

        } catch (err) {
            console.log('ERROR! ERROR! ERROR!')
            console.log(err)
        }
    }

    async function updateCharName() {
        
    }

    const getCharInfo = async function(LID) {
        try{
            const charResponse = await fetch(`https://ffxivcollect.com/api/characters/${LID}?latest=true&ids=true/`)
            if (charResponse.status === 403) {
                return 'private'

            } else {
                const charData = await charResponse.json()
            
                console.log('CHAR loaded (1 call to ffxivc)')
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
            }
            
        } catch (err) {
            console.log('ERROR! ERROR! ERROR!')
            console.log(err)
        }
    }

    const xivapiNSA = async function(LID) {
        try{
            const charResponse = await fetch(`https://xivapi.com/character/${LID}`)
            const charData = await charResponse.json()

            return charData.Character.Avatar
        } catch (err) {
            console.log('ERROR! ERROR! ERROR!')
            console.log(err)
        }
    }
    
    const getChars = async function() {
        if (user.loggedIn === true) {
            const q = query(collection(db, 'users', `${user.uid}`, 'characters'))
            // const q = query(collection(db, 'users', `${user.uid}`, 'characters'), orderBy('selected', 'desc'))
            const querySnap = await getDocs(q)
            const charsDocs = []

            querySnap.forEach(async (doc) => {
                try{
                    const avatar = await xivapiNSA(doc.data().lodestoneId)
                    if (doc.data().selected) {
                        const charDoc = {
                            id: doc.id,
                            avatarUrl: avatar,
                            ...doc.data()
                        }
                        setSelectedChar(charDoc)
                    } else {
                        charsDocs.push({
                            id: doc.id,
                            avatarUrl: avatar,
                            ...doc.data()
                        })
                    }
                    
                    setChars(charsDocs)

                    console.log(`AVATAR loaded (1 call to xivapi)`)
                } catch (err) {
                    console.log('ERROR! ERROR! ERROR!')
                    console.log(err)
                }
            })

            setLoading(false)
        }
    }

    const loadCharInfo = async function() {
        setLoading(true)
        const charInfo = await getCharInfo(selectedChar.lodestoneId)
        setSelectedCharInfo(charInfo)
        setOwnedAchievements(charInfo.achievements.ids)
        setOwnedMounts(charInfo.mounts.ids)
        setOwnedMinions(charInfo.minions.ids)
        setLoading(false)
    }

    async function selectChar(id) {
        const charRef = doc(db, 'users', `${user.uid}`, 'characters', `${selectedChar.id}`)

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
        
        if (chars.length === 0) {
            newChar.selected = true
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

    async function getAchievements() {
        try {
            const achievementsResponse = await fetch('https://ffxivcollect.com/api/achievements')
            const achievementsData = await achievementsResponse.json()

            setAchievementsList(achievementsData.results)
        } catch (err) {
            console.log('ERROR! ERROR! ERROR!')
            console.log(err)
        }
    }

    async function getMounts() {
        try {
            const mountsResponse = await fetch('https://ffxivcollect.com/api/mounts')
            const mountsData = await mountsResponse.json()

            setMountsList(mountsData.results)
        } catch (err) {
            console.log('ERROR! ERROR! ERROR!')
            console.log(err)
        }
    }

    async function getMinions() {
        try {
            const minionsResponse = await fetch('https://ffxivcollect.com/api/minions')
            const minionsData = await minionsResponse.json()

            setMinionsList(minionsData.results)
        } catch (err) {
            console.log('ERROR! ERROR! ERROR!')
            console.log(err)
        }
    }

    useEffect(() => {
        if (user.loggedIn === true) {
            getChars()
        } else {
            setChars([])
            setSelectedChar({})
        }

    }, [user])

    useEffect(() => {
        if (user.loggedIn === true) {
            loadCharInfo()
        }
        
    }, [selectedChar])


    const value = {
        loading,
        setLoading,
        chars,
        setChars,
        selectedChar,
        setSelectedChar,
        selectedCharInfo,
        ownedAchievements,
        ownedMounts,
        ownedMinions,
        toTitleCase,
        getChars,
        checkXIVAPI,
        checkFFXIVC,
        getCharInfo,
        loadCharInfo,
        selectChar,
        hideChar,
        unhideChar,
        addChar,
        removeChar,
        getAchievements,
        getMounts,
        getMinions,
        achievementsList,
        mountsList,
        minionsList
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}