import { getDocuments, resetCollection, addDocument, deleteDocument, editDocument, db } from '../../services/db.service.js'
import { v4 as uuidv4 } from 'uuid'
export async function getUserReservations(req, res) {
  const result = await getDocuments(db, "tau_dudisela", "user_reservations", req.body)
  res.send(result)
}

export async function getReservationByDate(req, res) {
  const result = await getDocuments(db, "tau_dudisela", "court_reservations", req.body)
  res.send(result)
}

export async function getReservationByDayofweek(req, res) {
  const result = await getDocuments(db, "tau_dudisela", "club_events", req.body)
  res.send(result)
}

export async function isReservationExists(req, res) {
  const data = req.body
  const result = await getDocuments(db, "tau_dudisela", "court_reservations", data)
  let foundReservation = false;
  result && result.forEach(reservation => {
    if (req.body.courtNumber === reservation.courtNumber && req.body.startHour === reservation.startHour) {
      foundReservation = true;
    }
  });
  res.send({isExists: foundReservation})
}

export async function getCredit(req, res) {
  const data = req.body
  data['uid'] = req.query.docId
  const result = await getDocuments(db, "tau_dudisela", 'user_credit', data)
  if (!result) {
    res.send({user_credit: 0, punch_cards: []})
  }
  else {
    res.send(result)
  }
}

export async function getUsersCredit(req, res) {
  const data = req.body
  const result = await getDocuments(db, "tau_dudisela", 'user_credit')
  if (!result || !result.users_credit) {
    res.send({users_credit: []})
  }
  else {
    res.send(result)
  }
}

export async function getScheduleByWeekDay(req, res) {
  const result = await getDocuments(db, "tau_dudisela", 'schedule_by_weekday', req.query.weekday)
  if (!result || !result.reservations) {
    res.send({reservations: []})
  }
  else {
    res.send(result)
  }
}

export async function resetScheduleByWeekDay(req, res) {
  await resetCollection(db, "tau_dudisela", "schedule_by_weekday", req.query.weekday, (result) => {
    if (result) {
      res.end(JSON.stringify({ "result": 1 }))
    } else {
      res.end(JSON.stringify({ "result": 0 }))
    }
  })
}

export async function postScheduleByWeekDay(req, res) {
  const weekdayReservations = req.body
  for (let index = 0; index < weekdayReservations.length; index++) {
    const reservation = weekdayReservations[index];
    //
    await addDocument(db, "tau_dudisela", "schedule_by_weekday", "schedule_by_weekday", req.query.weekday, reservation, (result) => {
      if (result) {
        res.end(JSON.stringify({ "result": 1 }))
      }
    })
  }
  res.end(JSON.stringify({ "result": 0 }))
}

export async function addReservation(req, res) {
  const _uuid = uuidv4()
  const payload = req.body
  payload['id'] = _uuid

  addDocument(db, "tau_dudisela", "court_reservations" ,"court_reservations", payload, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0, 'id': payload['id'] }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function addReservationToUser(req, res) {
  const _uuid = uuidv4()
  const payload = req.body
  payload['id'] = _uuid

  addDocument(db, "tau_dudisela", "user_reservations" ,"user_reservations", payload, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0, 'id': payload['id'] }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function changeCredit(req, res) {
  const payload = {
    'user_credit': req.body.userCredit,
    'date': req.body.date,
    'mail': req.body.mail,
    'cardName': req.body.cardName,
    'uid': req.query.docId
  }
  editDocument(db, "tau_dudisela", "user_credit", "user_credit", payload, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function deleteReservation(req, res) {
  const data = req.body;
  const deleteUserReservation = new Promise((resolve, reject) => {
      data['uid'] = req.query.docId
      deleteDocument(db, "tau_dudisela", "user_reservations", "user_reservations", data, resolve)
  });
  const deleteCourtReservation = new Promise((resolve, reject) => {
    deleteDocument(db, "tau_dudisela", "court_reservations", "court_reservations", data, resolve)
  });
  Promise.all([deleteUserReservation, deleteCourtReservation]).then((result) => {
    if (!result[0] && !result[1]) {
      res.end(JSON.stringify({ "result": 0 }))
    } else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  });
}

export async function deleteEvent(req, res) {
  const data = req.body;
  const deleteClubEvent = new Promise((resolve, reject) => {
      deleteDocument(db, "tau_dudisela", "club_events", "club_events", data, resolve)
  });
  Promise.all([deleteClubEvent]).then((result) => {
    if (!result[0]) {
      res.end(JSON.stringify({ "result": 0 }))
    } else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  });
}

export async function addReservationByDate(req, res) {
  const _uuid = uuidv4()
  const payload = {
    'id': _uuid,
    'startHour': req.body.startHour,
    'endHour': req.body.endHour,
    'courtNumber': req.body.courtNumber,
    "date": req.body.date,
    'username': req.body.username
  }
  addDocument(db, "tau_dudisela", "reservations_by_date", "reservations_by_date", req.query.date, payload, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}
