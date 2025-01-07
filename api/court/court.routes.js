import express from 'express'
import { getCourts, getUser, deleteClubCourt, editClubCourt, deleteClubHours, getUserPermissions, getClubClasses, getClubUsers, editClubUser, getAboutClub, getClubPreferences, editClubPreferences, editAboutClub, getPunchCards, addClubClass, editPunchCard, addClubUser, deleteClubUser, saveClubUser, addPunchCard, getClubHours, addClubHours, getClubCourts, getPriceConstraints, addClubCourt, getSportCenterMembers, addPriceConstraint, editPriceConstraint, deletePriceConstraint } from './court.controller.js'
import { authUser } from '../../middleware.js'

export const courtRoutes = express.Router()

courtRoutes.get('/courts', getCourts)
courtRoutes.get('/clubcourts', getClubCourts)
courtRoutes.get('/aboutclub', getAboutClub)
courtRoutes.get('/clubpreferences', getClubPreferences)
courtRoutes.get('/priceconstraints', getPriceConstraints)
courtRoutes.post('/sportCenterMembers', authUser(["admin"]), getSportCenterMembers)
courtRoutes.post('/clubcourts/addClubCourt', authUser(["admin"]), addClubCourt)
courtRoutes.post('/clubcourts/editClubCourt', authUser(["admin"]), editClubCourt)
courtRoutes.post('/clubcourts/addPriceConstraint', authUser(["admin"]), addPriceConstraint)
courtRoutes.post('/clubcourts/editPriceConstraint', authUser(["admin"]), editPriceConstraint)
courtRoutes.delete('/clubcourts', authUser(["admin"]), deletePriceConstraint)
courtRoutes.delete('/clubcourts/court', authUser(["admin"]), deleteClubCourt)
courtRoutes.get('/punchcards', getPunchCards)
courtRoutes.get('/clubclasses', getClubClasses)
courtRoutes.get('/clubusers', getClubUsers)
courtRoutes.get('/userpermissions', getUserPermissions)
courtRoutes.post('/punchcards/addPunchCard', authUser(["admin"]), addPunchCard)
courtRoutes.post('/punchcards/editPunchCard', authUser(["admin"]), editPunchCard)
courtRoutes.post('/clubusers/addClubUser', authUser(["admin"]), addClubUser)
courtRoutes.post('/clubusers/addSubscriber', addClubUser)
courtRoutes.delete('/clubusers/deleteClubUser', authUser(["admin"]), deleteClubUser)
courtRoutes.post('/clubusers/saveClubUser', authUser(["admin"]), saveClubUser)
courtRoutes.post('/clubusers/editClubUser', authUser(["admin"]), editClubUser)
courtRoutes.post('/clubclasses/addClubClass', authUser(["admin"]), addClubClass)
courtRoutes.get('/clubhours', getClubHours)
courtRoutes.post('/clubhours/addClubHours', authUser(["admin"]), addClubHours)
courtRoutes.delete('/clubhours', authUser(["admin"]), deleteClubHours)
courtRoutes.post('/clubpreferences', authUser(["admin"]), editClubPreferences)
courtRoutes.post('/aboutclub', authUser(["admin"]), editAboutClub)
courtRoutes.post('/clubuser', authUser(["admin"]), getUser)


