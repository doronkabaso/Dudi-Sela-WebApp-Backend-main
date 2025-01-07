import { getDocuments, db, addDocument } from '../../services/db.service.js'

export async function getInstructors(req, res) {
  const result = await getDocuments(db, "tau_dudisela", 'tennis_instructors', 'tennis_instructors')
  if (!result) {
    res.send({tennis_instructors: []})
  } else {
    res.send(result)
  }
}

export async function getParticipants(req, res) {
  const result = await getDocuments(db, "tau_dudisela", 'class_participants', 'class_participants')
  if (!result) {
    res.send({class_participants: []})
  } else {
    res.send(result)
  }
}

export async function addParticipant(req, res) {
  const payload = req.body
  addDocument(db, "tau_dudisela", 'class_participants', 'class_participants', payload, (result) => {
      if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}