import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore/lite'
import  getFirebaseConfig from '../.key.service.js'
import { initializeApp } from 'firebase/app'
const firebaseConfig = getFirebaseConfig()
const initializedFirebase = initializeApp(firebaseConfig)
export const db = getFirestore(initializedFirebase)


export async function getDocuments(db, docName, colName, data) {
    try {
        const docRef = doc(db, docName, colName)
        const docSnap = await getDoc(docRef)
        let _val
        switch (colName) {
            case "user_reservations":
                _val = docSnap.data() ? docSnap.data() : {}
                if (_val[data.uid]) {
                    return ({"reservations": _val[data.uid]})
                } else {
                    return {reservations: []}
                }
                break;
            case "court_reservations":
                _val = docSnap.data() ? docSnap.data() : {}
                if (_val[data.date]) {
                    const reservations = _val[data.date]
                    return reservations
                } else {
                    return []
                }
                break;
            case "club_events":
                _val = docSnap.data() ? docSnap.data() : {}
                if (_val[data.dayofweek]) {
                    const reservations = _val[data.dayofweek]
                    return reservations
                } else {
                    return []
                }
                break;
            case "club_users":
                _val = docSnap.data()
                return _val["club_users"]
                break;
            case "user_credit":
                _val = docSnap.data() ? docSnap.data() : {}
                if (!data) {
                    return {"users_credit": _val}
                } else if (_val[data.uid]) {
                        return (_val[data.uid])
                } else {
                    return {"user_credit": 0}
                }
                break;
            case "club_hours":
                _val = docSnap.data()
                return _val['club_hours']
                break
            default:
                break;
        }
        return docSnap.data()
    } catch(error) {
        console.log(error)
        return;
    }
}

export async function getDocument(db, docName, colName, data) {
    try {
        const docRef = doc(db, docName, colName)
        const docSnap = await getDoc(docRef)
        let _val, index
        switch (colName) {
            case "club_users":
                _val = docSnap.data().club_users
                index = _val.findIndex(user => user.email === data.email )
                return _val[index]
                break;
            default:
                break;
        }
        return docSnap.data()
    } catch (error) {
        console.log(error)
        return;
    }
}

const isArray = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

export async function resetCollection(db, docName, docId, fn) {
    try {
        const docRef = doc(db, docName, docId)
        await setDoc(docRef, { "reservations": [] })
        .then((result) => {
            fn(result)
        })
        .catch((error) => {
            const errorCode = error.code
            fn(errorCode)
        })
    } catch (error) {
        console.error(error)
    }
}
// TODO: not only addCocument, but also getDocument, getDocuments, deleteDocument, and editDocument should be generic
export async function addDocument(db, docName, docId, colName, data, fn) {
    try {
        const docRef = doc(db, docName, docId)
        const docSnap = await getDoc(docRef)

        let _val, docs = {}
        switch (colName) {
            case "user_reservations":
                _val = docSnap.data() ? docSnap.data() : {}
                if (!_val[data.uid]) {
                    _val[data.uid] = []
                }
                const uid = data.uid
                delete data.uid
                _val[uid].push(data)
                docs = _val
                break;
            case "court_reservations":
                _val = docSnap.data() ? docSnap.data() : {}
                if (!_val[data.date]) {
                    _val[data.date] = []
                }
                _val[data.date].push(data)
                docs = _val
                break;
            case "user_reservations":
                break;
            case "reservations_by_date": //TODO - remove
            case "schedule_by_weekday": //TODO - remove
                break;
            case "events":
            _val = docSnap.data() ? docSnap.data().events : []
            if (!_val) {
                _val = []
            }
            if (isArray(data)) {
                _val.push(...data)
            } else {
                _val.push(data)
            }
            docs["events"] = _val
            break;
            case "price_constraints":
                _val = docSnap.data() ? docSnap.data().price_constraints : []
                if (!_val) {
                    _val = []
                }
                if (isArray(data)) {
                    _val.push(...data)
                } else {
                    _val.push(data)
                }
                docs["price_constraints"] = _val
                break;
            case "club_courts":
                _val = docSnap.data() ? docSnap.data().club_courts : []
                if (!_val) {
                    _val = []
                }
                if (isArray(data)) {
                    _val.push(...data)
                } else {
                    _val.push(data)
                }
                docs["club_courts"] = _val
                break;
            case "punch_cards":
                _val = docSnap.data() ? docSnap.data().punch_cards : []
                if (!_val) {
                    _val = []
                }
                if (isArray(data)) {
                    _val.push(...data)
                } else {
                    _val.push(data)
                }
                docs["punch_cards"] = _val
                break;
            case "club_hours":
                _val = docSnap.data() ? docSnap.data().club_hours : []
                if (!_val) {
                    _val = []
                }
                if (isArray(data)) {
                    _val.push(...data)
                } else {
                    _val.push(data)
                }
                docs["club_hours"] = _val
                break;
            case "club_classes":
                _val = docSnap.data() ? docSnap.data().club_classes : []
                if (!_val) {
                    _val = []
                }
                if (isArray(data)) {
                    _val.push(...data)
                } else {
                    _val.push(data)
                }
                docs["club_classes"] = _val
                break;
            case "club_events":
                _val = docSnap.data()
                if (!_val[data.dayOfWeek]) {
                    _val[data.dayOfWeek] = []
                }
                _val[data.dayOfWeek].push(data)
                docs = _val
                break;
            case "club_users":
                _val =docSnap.data().club_users
                _val.push(data)
                docs["club_users"] = _val
                break;
            case "class_participants":
                _val =docSnap.data().class_participants
                _val.push(data.name)
                docs["class_participants"] = _val
            break;
                default:
                break;
        }
        if (Object.keys(docs).length >0) {
            setDoc(docRef, docs).then((result) => {
                fn(result)
            }).catch((error) => {
                const errorCode = error.code
                fn(errorCode)
            })
        }
    } catch (error) {
        console.error(error)
        return;
    }
}

export async function editDocument(db, docName, docId, colName, data, fn) {
    try {
        const docRef = doc(db, docName, docId)
        const docSnap = await getDoc(docRef)
        let _val, docs={}
        let index
        switch (colName) {
            case "user_credit":
                _val = docSnap.data() ? docSnap.data() : {}
                if (!_val[data.uid]) {
                    _val[data.uid] = {"user_credit": 0, "mail": data.mail, "date": data.date, "punch_cards": []}
                }
                if (data.cardName) {
                    if (!_val[data.uid]["punch_cards"][data.cardName]) {
                        _val[data.uid]["punch_cards"][data.cardName] = data.user_credit
                    } else {
                        _val[data.uid]["punch_cards"][data.cardName] += data.user_credit
                    }
                } else {
                    _val[data.uid]["user_credit"] += data.user_credit
                }
                docs = _val
                break;
            case "price_constraints":
                _val = docSnap.data() ? docSnap.data().price_constraints : 0
                index = _val.findIndex(constraint => constraint.id === data.id )
                _val[index] = data
                docs["price_constraints"] = _val
                break;
            case "club_preferences":
                _val = docSnap.data() ? docSnap.data().club_preferences : 0
                _val = data
                docs["club_preferences"] = _val
                break;
            case "about_club":
                _val = docSnap.data() ? docSnap.data().about_club : 0
                _val = data
                docs["about_club"] = _val
                break;
            case "club_events":
                _val = docSnap.data()
                index = _val[data.dayOfWeek].findIndex(event => event.id === data.id )
                _val[data.dayOfWeek][index] = data
                docs = _val
                break;
            case "club_courts":
                _val = docSnap.data()
                index = _val["club_courts"].findIndex(court => court.id === data.id )
                _val["club_courts"][index] = data
                docs = _val
                break;
            case "punch_cards":
                _val = docSnap.data()
                index = _val["punch_cards"].findIndex(card => card.id === data.id )
                _val["punch_cards"][index] = data
                docs = _val
                break;
            case "club_classes":
                _val = docSnap.data()
                index = _val["club_classes"].findIndex(course => course.id === data.id )
                _val["club_classes"][index] = data
                docs = _val
                break;
            case "club_users":
                _val = docSnap.data()
                index = _val["club_users"].findIndex(user => user.id === data.id )
                _val["club_users"][index] = data
                docs = _val
                break;
            default:
                break;
        }
        setDoc(docRef, docs).then((result) => {
            fn(result)
        }).catch((error) => {
            const errorCode = error.code
            fn(errorCode)
        })
    } catch (error) {
        fn(error)
        return;
    }

}

export async function deleteDocument(db, docName, docId, colName, data, fn) {
    try {
        const docRef = doc(db, docName, docId)
        const docSnap = await getDoc(docRef)
        let _val, docs
        let index

        switch (colName) {
            case "user_reservations":
                docs = docSnap.data()
                _val = docs[data['uid']]
                index = _val.findIndex(reservation => reservation.id === data.id )
                _val.splice(index, 1)
                docs[data['uid']] = _val
                break;
            case "court_reservations":
                docs = docSnap.data()
                _val = docs[data['date']]
                index = _val.findIndex(reservation => reservation.id === data.refResId )
                _val.splice(index, 1)
                docs[data['date']] = _val
                break;
            case "price_constraints":
                docs = docSnap.data()
                _val = docSnap.data() ? docSnap.data().price_constraints : []
                index = _val.findIndex(constraint => constraint.id === data.id )
                _val.splice(index, 1)
                docs["price_constraints"] = _val
                break;
            case "club_courts":
                docs = docSnap.data()
                _val = docs.club_courts
                index = _val.findIndex(court => court.id === data.id )
                _val.splice(index, 1)
                docs["club_courts"] = _val
                break;
            case "club_hours":
                docs = docSnap.data()
                _val = docSnap.data() ? docSnap.data().club_hours : []
                index = _val.findIndex(club_hour => club_hour.id === data.id )
                _val.splice(index, 1)
                docs["club_hours"] = _val
                break;
            case "club_events":
                docs = docSnap.data()
                _val = docSnap.data()[data.dayOfWeek]
                index = _val.findIndex(event => event.id === data.id )
                _val.splice(index, 1)
                docs[data.dayOfWeek] = _val
                break;
            case "club_users":
                docs = docSnap.data()
                _val =docSnap.data().club_users
                index = _val.findIndex(club_user => club_user.id === data.id )
                _val.splice(index, 1)
                docs["club_users"] = _val
                break;
            default:
                break;
        }
        setDoc(docRef, docs).then((result) => {
            fn(result)
        }).catch((error) => {
            const errorCode = error.code
            fn(errorCode)
        })
    } catch (error) {
        console.error(error)
        return;
    }
}
