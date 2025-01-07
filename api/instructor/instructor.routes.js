import express from 'express'
import { getInstructors, getParticipants, addParticipant } from './instructor.controller.js'
import { authUser } from '../../middleware.js'

export const instructorRoutes = express.Router()

instructorRoutes.get('/instructors', getInstructors)
instructorRoutes.get('/participants', getParticipants)
instructorRoutes.post('/addparticipant', addParticipant)

