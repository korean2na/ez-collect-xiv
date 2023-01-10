import { useState, useEffect, createContext, useContext} from "react";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, deleteDoc, query, orderBy} from '@firebase/firestore'
import { AuthContext } from "./AuthProvider";

export const DataContext = createContext()

export const DataProvider = function (props) {
    const db = getFirestore()
    const [chars, setChars] = useState([])
    const [selectedChar, setSelectedChar] = useState({})
    
    const { user } = useContext(AuthContext)

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

    useEffect(() => {
        async function getChars() {
            const q = query(collection(db, 'users', `${user.uid} `, 'characters'), orderBy('charName', 'asc'))
            const querySnapshot = await getDocs(q)
            const charDocs = []
    
            querySnapshot.forEach((doc) => {
                // const userData = await getDoc(doc.ref.parent.parent)
                // const username = userData.data().username
    
                charDocs.push({
                    id: doc.id,
                    ...doc.data()
                })
    
                setChars(charDocs)
            })
        }

        async function getSelectedChar() {
            const q = query(collection(db, 'users', `${user.uid} `, 'characters'), orderBy('charName', 'asc'))
            const querySnapshot = await getDocs(q)
            const charDocs = []
    
            querySnapshot.forEach((doc) => {
                // const userData = await getDoc(doc.ref.parent.parent)
                // const username = userData.data().username
    
                charDocs.push({
                    id: doc.id,
                    ...doc.data()
                })
    
                setChars(charDocs)
            })
        }

        getChars()
    }, [user])

    const getCharInfo = async function(LID) {
        try{
            const charResponse = await fetch(`://ffxivcollect.com/api/characters/${LID}?latest=true&ids=true`)
            const charData = await charResponse.json()

            return {
                ...charData
            }
        }

        catch (err) {
            console.log('ERROR! ERROR! ERROR!')
            console.log(err)
        }
    }
    
    

    async function addCity(cityName) {
        const newCity = {
            cityName: cityName
        }

        const userDoc = await setDoc(doc(db, 'users', `${user.uid} `), {
            username: user.username
        })

        const cityDoc = await addDoc(collection(db, 'users', `${user.uid} `, 'cities'), newCity)

        newCity.id = cityDoc.id

        setCities([newCity, ...cities])
    }
    
    async function removeCity(id) {
        await deleteDoc(doc(db, 'users', `${user.uid} `, 'cities', `${id}`))

        const q = query(collection(db, 'users', `${user.uid} `, 'cities'), orderBy('cityName', 'asc'))
        const querySnapshot = await getDocs(q)
        const cityDocs = []

        querySnapshot.forEach((doc) => {
            cityDocs.push({
                id: doc.id,
                uid: user.uid,
                ...doc.data()
            })

            setCities(cityDocs)
        })
    }

    const value = {
        chars,
        currChar,
        toTitleCase,
        getCharInfo,
        addCity,
        removeCity
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}