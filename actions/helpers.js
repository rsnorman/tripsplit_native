// @flow

export const applyAuthenticationHeaders = (fetchOptions, session, contentType = 'application/json') => {
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': contentType,
      "Token-Type": "Bearer",
      'Access-Token': session.accessToken,
      'Client': session.client,
      "Expiry": session.expiry,
      "uid": session.uid
    },
    ...fetchOptions
  }
}

export const parseResponse = (successStatus: number, errorMessage: string) => {
  return (response) => {
    if (response.status !== successStatus) {
      if (response.status === 401) {
        throw('Unauthorized');
      } else {
        throw(errorMessage);
      }
    }
    return response.json();
  }
}
