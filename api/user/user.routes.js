import express from 'express'
// import {requireAuth, requireAdmin} from '../../middlewares/requireAuth.middleware.js'
import { getUser, getUsers } from '../../middlewares/requireAuth.middleware'
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers)
router.get('/:id', getUser)

module.exports = router