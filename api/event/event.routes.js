import express from 'express'
import { getClubEvents, addClubEvent, editClubEvent } from './event.controller.js'
import { authUser } from '../../middleware.js'

export const eventRoutes = express.Router()

eventRoutes.get('/clubevents', getClubEvents)
eventRoutes.post('/addClubEvent', authUser(["admin"]), addClubEvent)
eventRoutes.post('/editClubEvent', authUser(["admin"]), editClubEvent)
