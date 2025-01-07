import express from 'express'
import { getReservationByDate, deleteEvent, getReservationByDayofweek, getUserReservations, addReservationToUser, isReservationExists, addReservation, getCredit, getUsersCredit, changeCredit, deleteReservation, addReservationByDate } from './reservation.controller.js'
import { authUser } from '../../middleware.js'

export const reservationRoutes = express.Router()

reservationRoutes.post('/reservation/exists', authUser(["subscriber"]), isReservationExists)
reservationRoutes.get('/usercredit', getCredit)
reservationRoutes.get('/userscredit', getUsersCredit)
reservationRoutes.post('/usercredit', authUser(["subscriber"]), changeCredit)
reservationRoutes.post('/reservations/date', authUser(["subscriber"]), addReservationByDate)
reservationRoutes.delete('/reservations', authUser(["subscriber"]), deleteReservation)
reservationRoutes.delete('/reservations/event', authUser(["admin"]), deleteEvent)
reservationRoutes.post('/addReservation', authUser(["subscriber"]), addReservation)
reservationRoutes.post('/addReservation/user', authUser(["subscriber"]), addReservationToUser)
reservationRoutes.post('/userreservations/user', authUser(["subscriber"]), getUserReservations)
reservationRoutes.post('/userreservations/date', authUser(["subscriber"]), getReservationByDate)
reservationRoutes.post('/userreservations/dayofweek', authUser(["subscriber"]), getReservationByDayofweek)
