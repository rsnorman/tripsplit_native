const trips = (state = { trips: [] }, action) => {
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
    default:
      return state;
  }
};

export default trips;
