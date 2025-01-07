import { v4 as uuidv4 } from 'uuid'
import { getDocuments, getDocument, db, addDocument, deleteDocument, editDocument } from '../../services/db.service.js'

export async function getCourts(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'courts', 'courts')
  if (!result) {
    res.send({courts: []})
  } else {
    res.send(result)
  }
}

export async function getSportCenterMembers(req, res) {
    const result = await getDocuments(db, 'tau_dudisela', "sport_center_members", 'sport_center_members')
    if (!result || !result.courts) {
      res.send({sport_center_members: []})
    } else {
      res.send(result)
    }
}

export async function getClubCourts(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'club_courts', "club_courts")
  if (!result) {
    res.send({club_courts: []})
  } else {
    res.send(result)
  }
}

export async function getAboutClub(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'about_club', "about_club")
  if (!result) {
    res.send({about_club: {}})
  } else {
    res.send(result)
  }
}


export async function getClubPreferences(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'club_preferences', "club_preferences")
  if (!result) {
    res.send({club_preferences: {}})
  } else {
    res.send(result)
  }
}

export async function getPriceConstraints(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'price_constraints', 'price_constraints')
  if (!result) {
    res.send({price_constraints: []})
  } else {
    res.send(result)
  }
}

export async function addClubCourt(req, res) {
  const _uuid = uuidv4()
  const payload = {"name": req.body.name, "type": req.body.type}
  payload['id'] = _uuid
  addDocument(db, "tau_dudisela", 'club_courts', 'club_courts', payload, (result) => {
      if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function editClubCourt(req, res) {
  const payload = req.body
  editDocument(db, "tau_dudisela", 'club_courts', 'club_courts', payload, (result) => {
      if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function addPunchCard(req, res) {
  const _uuid = uuidv4()
  const payload = req.body
  payload['id'] = _uuid
  addDocument(db, "tau_dudisela", 'punch_cards', 'punch_cards', req.body, (result) => {
      if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function addClubUser(req, res) {
  const _uuid = uuidv4()
  const payload = req.body
  payload['id'] = _uuid
  addDocument(db, "tau_dudisela", 'club_users', 'club_users', req.body, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function deleteClubUser(req, res) {
  deleteDocument(db, "tau_dudisela", 'club_users', 'club_users', req.body, (result) => {
      if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function saveClubUser(req, res) {
  addDocument(db, "tau_dudisela", 'club_users', 'club_users', req.body, (result) => {
      if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function editClubUser(req, res) {
  editDocument(db, "tau_dudisela", 'club_users', 'club_users', req.body, (result) => {
      if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function editPunchCard(req, res) {
  const payload = req.body
  editDocument(db, "tau_dudisela", 'punch_cards', 'punch_cards', req.body, (result) => {
      if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}


export async function addClubClass(req, res) {
  const payload = req.body
  if (!payload.id) {
    const _uuid = uuidv4()
    payload['id'] = _uuid
    addDocument(db, "tau_dudisela", 'club_classes', 'club_classes', req.body, (result) => {
        if (!result) {
        res.end(JSON.stringify({ "result": 0 }))
      }
      else {
        res.end(JSON.stringify({ "result": 1 }))
      }
    })
  } else {
    editDocument(db, "tau_dudisela", 'club_classes', 'club_classes', req.body, (result) => {
      if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
  }
}
export async function addClubHours(req, res) {
  const _uuid = uuidv4()
  const payload = req.body
  payload['id'] = _uuid
  addDocument(db, "tau_dudisela", 'club_hours', 'club_hours', req.body, (result) => {
      if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function addPriceConstraint(req, res) {
  const _uuid = uuidv4()
  const payload = req.body
  payload['id'] = _uuid

  addDocument(db, "tau_dudisela", "price_constraints", "price_constraints", payload, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function editPriceConstraint(req, res) {
  editDocument(db, "tau_dudisela", "price_constraints", "price_constraints", req.body, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function editClubPreferences(req, res) {
  editDocument(db, "tau_dudisela", "club_preferences", "club_preferences", req.body, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function editAboutClub(req, res) {
  editDocument(db, "tau_dudisela", "about_club", "about_club", req.body, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function deletePriceConstraint(req, res) {
  deleteDocument(db, "tau_dudisela", "price_constraints", "price_constraints", req.body, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function deleteClubCourt(req, res) {
  deleteDocument(db, "tau_dudisela", "club_courts", "club_courts", req.body, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function deleteClubHours(req, res) {
  deleteDocument(db, "tau_dudisela", "club_hours", "club_hours", req.body, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function getPunchCards(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'punch_cards', 'punch_cards')
  if (!result) {
    res.send({punch_cards: []})
  } else {
    res.send(result)
  }
}

export async function getClubClasses(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'club_classes', 'club_classes')
  if (!result) {
    res.send({punch_cards: []})
  } else {
    res.send(result)
  }
}

export async function getClubUsers(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'club_users', 'club_users')
  if (!result) {
    res.send({club_users: []})
  } else {
    res.send(result)
  }
}

export async function getUserPermissions(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'user_permissions', 'user_permissions')
  if (!result) {
    res.send({user_permissions: []})
  } else {
    res.send(result)
  }
}

export async function getClubHours(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'club_hours', 'club_hours')
  if (!result) {
    res.send({club_hours: []})
  } else {
    res.send(result)
  }
}

export async function getUser(req, res) {
  const result = await getDocument(db, 'tau_dudisela', 'club_users', req.body)
  if (!result) {
    res.send({club_user: ""})
  } else {
    res.send(result)
  }
}
