let date = new Date();
let today = String(date);

const initialState = {
  id: '',
  dateNext: '',
  firstName: '',
  lastName: '',
  import: false,
  company: '',
  jobTitle: '',
  email: '',
  phone: '',
  meetDate: today,
  meetNotes: '',
  login: false,
  allPast: []
}

const ContactState = (state=initialState, action) => {
  switch (action.type) {
  case 'SET_GOOGLE_LOGIN':
    return {
      ...state,
      login: action.boolean
    }


  case 'SET_NEW_CONTACT':
    return {
      ...state,
      dateNext: action.newDateNext,
      firstName: action.newFirstName,
      lastName: action.newLastName,
      import: action.newImportant,
      company: action.newCompany,
      jobTitle: action.newJobTitle,
      email: action.newEmail,
      phone: action.newPhone,
      meetDate: action.newDay,
      meetNotes: action.newMeetNotes
    };

    case 'SET_ONE_CONTACT':
    return {
      ...state,
      dateNext: action.newDateNext,
      firstName: action.newFirstName,
      lastName: action.newLastName,
      import: action.newImportant,
      company: action.newCompany,
      jobTitle: action.newJobTitle,
      email: action.newEmail,
      phone: action.newPhone,
      meetDate: action.newMeetDate,
      meetNotes: action.newMeetNotes,
      allPast: action.newPastArray
    };

    case 'UPDATE_CONTACT':
    return {
      ...state,
      firstName: action.newFirstName,
      lastName: action.newLastName,
      import: action.newImportant,
      company: action.newCompany,
      jobTitle: action.newJobTitle,
      email: action.newEmail,
      phone: action.newPhone,
      meetDate: action.newMeetDate,
      meetNotes: action.newMeetNotes
    };

    case 'UPDATE_DATE_NEXT':
    return {
      ...state,
      dateNext: action.newDateNext.serNextContact
    };

    case 'UPDATE_CONTACT_PAST':
    return {
      ...state,
      allPast: action.updatedContact.serPast
    }

    case 'UPDATE_HEART':
    return {
      ...state,
      import: !state.import
    }


    default:
    return state
  }
}

export default ContactState
