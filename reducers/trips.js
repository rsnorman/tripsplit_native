let initialTripState = {
  trips: [],
  newTrip: { name: "Brandon's Bachelor Party", location: "UP", description: 'Sending B-Rabbit off in style!' },
  viewedTrip: null,
  isViewingNewTripForm: false,
  isCreatingTrip: false,
  isSavingTrip: false,
  isFetchingTrips: false,
  isViewingEditTripForm: false
};

const trips = (state = initialTripState, action) => {
  switch (action.type) {
    case 'START_FETCHING_TRIPS':
      return Object.assign({}, state, {
        isFetchingTrips: true
      })
    case 'TRIP_FETCH_SUCCESS':
      return Object.assign({}, state, {
        isFetchingTrips: false,
        trips: action.trips
      });
    case 'NEW_TRIP':
      return Object.assign({}, state, {
        isViewingNewTripForm: true
      });
    case 'SET_TRIP_ATTRIBUTE':
      let newTrip = Object.assign({}, state.newTrip);
      newTrip[action.name] = action.value;

      let editingTrip = Object.assign({}, state.editingTrip);
      editingTrip[action.name] = action.value;

      return Object.assign({}, state, {
        newTrip: newTrip,
        editingTrip: editingTrip
      });
    case 'START_CREATING_TRIP':
      return Object.assign({}, state, {
        isSavingTrip: true
      });
    case 'TRIP_CREATE_SUCCESS':
      return Object.assign({}, state, {
        trips: [action.trip, ...state.trips],
        isSavingTrip: false,
        isViewingNewTripForm: false,
        viewedTrip: action.trip
      });
    case 'CANCEL_NEW_TRIP':
      return Object.assign({}, state, {
        isViewingNewTripForm: false
      });
    case 'VIEW_TRIP':
      return Object.assign({}, state, {
        viewedTrip: action.trip
      });
    case 'EDIT_TRIP':
      return Object.assign({}, state, {
        editingTrip: action.trip,
        isViewingEditTripForm: true
      });
    case 'START_UPDATING_TRIP':
      return Object.assign({}, state, {
        isSavingTrip: true
      });
    case 'TRIP_UPDATE_SUCCESS':
      let updatedTripIndex = state.trips.findIndex((trip) => trip.id === action.trip.id);
      let tripsWithUpdated = JSON.parse(JSON.stringify(state.trips));
      tripsWithUpdated[updatedTripIndex] = action.trip;

      return Object.assign({}, state, {
        trips: tripsWithUpdated,
        viewedTrip: action.trip,
        isSavingTrip: false,
        isViewingEditTripForm: false
      });
    case 'CANCEL_EDIT_TRIP':
      return Object.assign({}, state, {
        isViewingEditTripForm: false
      });
    case 'START_DELETING_TRIP':
      return Object.assign({}, state, {
        isDeletingTrip: true
      });
    case 'TRIP_DELETE_SUCCESS':
      let deletedTripIndex = state.trips.findIndex((trip) => trip.id === action.trip.id);
      let tripsWithoutDeleted = JSON.parse(JSON.stringify(state.trips));
      tripsWithoutDeleted.splice(deletedTripIndex, 1)

      return Object.assign({}, state, {
        trips: tripsWithoutDeleted,
        isDeletingTrip: false,
        isViewingEditTripForm: false
      });
    default:
      return state;
  }
};

export default trips;
