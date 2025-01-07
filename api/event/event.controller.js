import { v4 as uuidv4 } from 'uuid'
import { addDocument, db, getDocuments, editDocument } from '../../services/db.service.js'

export async function getClubEvents(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'club_events', 'club_events')
  if (!result) {
    res.send({club_events: []})
  } else {
    res.send(result)
  }
}

export async function addClubEvent(req, res) {
  const _uuid = uuidv4()
  const payload = req.body
  payload['id'] = _uuid
  addDocument(db, "tau_dudisela", 'club_events', 'club_events', payload, (result) => {
      if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function editClubEvent(req, res) {
  const payload = req.body
  editDocument(db, "tau_dudisela", 'club_events', 'club_events', payload, (result) => {
      if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}
