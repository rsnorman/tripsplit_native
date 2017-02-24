let initialTripState = {
  trips: [],
  newTrip: { name: "Brandon's Bachelor Party", location: "UP", description: 'Sending B-Rabbit off in style!' },
  isViewingNewTripForm: false,
  isCreatingTrip: false,
  isFetchingTrips: false
}
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

      return Object.assign({}, state, {
        newTrip: newTrip
      });
    case 'START_CREATING_TRIP':
      return Object.assign({}, state, {
        isCreatingTrip: true
      });
    case 'TRIP_CREATE_SUCCESS':
      return Object.assign({}, state, {
        trips: [action.trip, ...state.trips],
        isCreatingTrip: false,
        isViewingNewTripForm: false
      });
    default:
      return state;
  }
};

export default trips;
