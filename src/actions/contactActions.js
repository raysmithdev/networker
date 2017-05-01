import DATABASE_URL from '../../config';

//open a contact just created
export const SET_NEW_CONTACT = 'SET_NEW_CONTACT';
export const setNewContact = (newDateNext, newFirstName, newLastName, newImportant, newCompany, newJobTitle, newEmail, newPhone, newMeetDate, newMeetNotes) => ({
  type: SET_NEW_CONTACT,
  newDateNext,
  newFirstName,
  newLastName,
  newImportant,
  newCompany,
  newJobTitle,
  newEmail,
  newPhone,
  newMeetDate,
  newMeetNotes
});

//open one contact with full past
export const SET_ONE_CONTACT = 'SET_ONE_CONTACT';
export const setOneContact = (id, newDateNext, newFirstName, newLastName, newImportant, newCompany, newJobTitle, newEmail, newPhone, newMeetDate, newMeetNotes, newPastArray) => ({
  type: SET_ONE_CONTACT,
  id,
  newDateNext,
  newFirstName,
  newLastName,
  newImportant,
  newCompany,
  newJobTitle,
  newEmail,
  newPhone,
  newMeetDate,
  newMeetNotes,
  newPastArray
});

export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const updateContact = (newFirstName, newLastName, newImportant, newCompany, newJobTitle, newEmail, newPhone, newMeetDate, newMeetNotes) => ({
  type: UPDATE_CONTACT,
  newFirstName,
  newLastName,
  newImportant,
  newCompany,
  newJobTitle,
  newEmail,
  newPhone,
  newMeetDate,
  newMeetNotes
});

export const UPDATE_DATE_NEXT = 'UPDATE_DATE_NEXT';
export const updateDateNext = (newDateNext) => ({
  type: UPDATE_DATE_NEXT,
  newDateNext
});

export const UPDATE_CONTACT_PAST = 'UPDATE_CONTACT_PAST';
export const updateContactPast = (updatedContact) =>  ({
  type: UPDATE_CONTACT_PAST,
  updatedContact
})

export const UPDATE_HEART = 'UPDATE_HEART';
export const updateHeart = (updatedHeart) => ({
  type: UPDATE_HEART,
  updatedHeart
})


export function fetchWholeContact(id, user) {
  return dispatch => {
    const urlWhole = ('http://localhost:8080/' + user + '/one_contact/' + id)
    fetch(urlWhole)
    .then(response => response.json())
    .then(data => {
      let id = data._id;
      let newDateNext = data.serNextContact;
      let newFirstName = data.serFirst;
      let newLastName = data.serLast;
      let newImportant = data.serImportant;
      let newCompany = data.serCompany;
      let newJobTitle = data.serJobTitle;
      let newEmail = data.serEmail;
      let newPhone = data.serPhone;
      let newMeetDate = data.serMeetDate;
      let newMeetNotes = data.serNote;
      let newPastArray = data.serPast;
      dispatch(setOneContact(id,
        newDateNext,
        newFirstName,
        newLastName,
        newImportant,
        newCompany,
        newJobTitle,
        newEmail,
        newPhone,
        newMeetDate,
        newMeetNotes, newPastArray))})
    .catch(ex => console.log(ex))
  }
}

export function sendNewContact(user, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput) {
  return dispatch => {
    const user = user;
    console.log(user);
    const url = 'http://localhost:8080/' + user + '/new_contact';
    let serNextContact = dateNextInput;
    let serFirst = firstInput;
    let serLast = lastInput;
    let serImportant = importantInput;
    let serCompany = companyInput;
    let serJobTitle = jobTitleInput;
    let serPhone = phoneInput;
    let serEmail = emailInput;
    let serMeetDate = meetDateInput;
    let serNote = notesInput;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user,
        serNextContact,
        serFirst,
        serLast,
        serImportant,
        serCompany,
        serJobTitle,
        serPhone,
        serEmail,
        serMeetDate,
        serNote
      })
    })
    .then(response => response.json())
    .then(location.assign('http://localhost:3000/' + user + '/contacts'))
  }
};

export function fetchUpdate(user, editId, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput) {
  return dispatch => {
    const user = user;
    let _id = editId;
    const url = 'http://localhost:8080/' + user + '/edit_contact/' + _id;
    let serFirst = firstInput;
    let serLast = lastInput;
    let serImportant = importantInput;
    let serCompany = companyInput;
    let serJobTitle = jobTitleInput;
    let serPhone = phoneInput;
    let serEmail = emailInput;
    let serMeetDate = meetDateInput;
    let serNote = notesInput;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        serFirst,
        serLast,
        serImportant,
        serCompany,
        serJobTitle,
        serPhone,
        serEmail,
        serMeetDate,
        serNote
      })
    })
    .then(response => console.log(response.json()))
    .then(location.assign('http://localhost:3000/' + this.params.user + '/one_contact/' + _id))
  }
};

export const SET_ALL_CONTACTS = 'SET_ALL_CONTACTS';
export const setAllContacts = (allContacts) => ({
  type: SET_ALL_CONTACTS,
  allContacts
});

export function fetchAllContacts(user) {
  return dispatch => {
    const url = 'http://localhost:8080/' + user + '/contacts';
    let sortedArray = [];
    fetch(url, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(data => {
        sortedArray = data.sort(function(a, b) {return Date.parse(a.serNextContact) - Date.parse(b.serNextContact)});
        console.log(sortedArray);
        dispatch(setAllContacts(sortedArray))
    })
    .catch(ex => console.log(ex))
  }
};

export function fetchDeleteContact(userEdit, editId) {
  let _id = editId;
  const user = userEdit;
  return dispatch => {
    const urlDel = 'http://localhost:8080/' + user + '/one_contact/' + _id;
    fetch(urlDel, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id
      })
    })
    .then(response => response.json())
    .then(location.assign('http://localhost:3000/' + user + '/contacts'))
    .catch(ex => console.log(ex))
  }
};

export function fetchDateUpdate(userUpdate, contactId, date) {
  let user = userUpdate;
  let serNextContact = date;
  let _id = contactId;
  return dispatch => {
    const urlDate = 'http://localhost:8080/' + user + '/one_contact/' + _id;
    fetch(urlDate, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        serNextContact
      })
    })
    .then(response => response.json())
    .then(json => dispatch(updateDateNext(json)))
    .then(location.reload())
    .catch(ex => console.log(ex))
  }
};

export function fetchHeartUpdate(userHeart, contactId, isInputChecked) {
  const user = userHeart;
  let serImportant = isInputChecked;
  console.log(serImportant);
  let _id = contactId;
  return dispatch => {
    const urlHeart = 'http://localhost:8080/' + user + '/one_contact/' + _id;
    fetch(urlHeart, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        serImportant
      })
    })
    .then(response => response.json())
    .then(json => dispatch(updateHeart(json)))
    .then(location.reload())
    .catch(ex => console.log(ex))
  }
};

export function sendNewPast(user, contactId, pastid, dateInput, typeInput, contactNotesInput) {
  return dispatch => {
    let user = user;
    let id = contactId;
    console.log(user, id);
    let pastId = pastid;
    const pastUrl = 'http://localhost:8080/' + user + '/newPast/' + id;
    let serDateContact = dateInput;
    let serTypeContact = typeInput;
    let serNotesContact = contactNotesInput;
    fetch(pastUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user,
        id,
        pastId,
        serDateContact,
        serTypeContact,
        serNotesContact
      })
    })
    .then(response => response.json())
    .then(json => dispatch(updateContactPast(json)))
  }
}
