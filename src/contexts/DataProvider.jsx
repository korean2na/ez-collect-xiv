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

    const getCharInfo = async function(LID) {
        try{
            const charResponse = await fetch(`https://ffxivcollect.com/api/characters/${LID}?latest=true&ids=true`)
            const charData = await charResponse.json()

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

        catch (err) {
            console.log('ERROR! ERROR! ERROR!')
            console.log(err)
        }
    }
    
    const getChars = async function() {
        const q = query(collection(db, 'users', `${user.uid}`, 'characters'), orderBy('selected', 'desc'))
        const querySnap = await getDocs(q)
        const charsDocs = []

        querySnap.forEach((doc) => {
            // const userData = await getDoc(doc.ref.parent.parent)
            // const username = userData.data().username

            if (doc.data().selected) {
                const charDoc = {
                    id: doc.id,
                    ...doc.data()
                }
                setChar(charDoc)
            }

            charsDocs.push({
                id: doc.id,
                ...doc.data()
            })

            setChars(charsDocs)
        })
    }

    useEffect(() => {
        getChars()
        
    }, [user])

    const loadCharInfo = async function() {
        const charInfo = await getCharInfo(char.lodestoneId)
        console.log(charInfo)
        setCharInfo(charInfo)
    }

    useEffect(() => {
        loadCharInfo()

    }, [char])

    async function selectChar(id) {
        const charRef = doc(db, 'users', `${user.uid}`, 'characters', `${char.id}`)

        await updateDoc(charRef, {
            selected: false
        })

        const newCharRef = doc(db, 'users', `${user.uid}`, 'characters', `${id}`)

        await updateDoc(newCharRef, {
            selected: true
        })
    }

    async function addChar(name, server) {
        // const newCity = {
        //     cityName: cityName
        // }

        // const userDoc = await setDoc(doc(db, 'users', `${user.uid}`), {
        //     username: user.username
        // })

        // const cityDoc = await addDoc(collection(db, 'users', `${user.uid}`, 'cities'), newCity)

        // newCity.id = cityDoc.id

        // setCities([newCity, ...cities])
    }
    
    async function removeChar(id) {
        // await deleteDoc(doc(db, 'users', `${user.uid}`, 'cities', `${id}`))

        // const q = query(collection(db, 'users', `${user.uid}`, 'cities'), orderBy('cityName', 'asc'))
        // const querySnapshot = await getDocs(q)
        // const cityDocs = []

        // querySnapshot.forEach((doc) => {
        //     cityDocs.push({
        //         id: doc.id,
        //         uid: user.uid,
        //         ...doc.data()
        //     })

        //     setCities(cityDocs)
        // })
    }

    const value = {
        chars,
        char,
        charInfo,
        toTitleCase,
        getCharInfo,
        selectChar,
        addChar,
        removeChar
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}