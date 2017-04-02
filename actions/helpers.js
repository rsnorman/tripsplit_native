// @flow

export const applyAuthenticationHeaders = (fetchOptions, session) => {
  return {
    ...fetchOptions,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Token-Type": "Bearer",
      'Access-Token': session.accessToken,
      'Client': session.client,
      "Expiry": session.expiry,
      "uid": session.uid
    }
  }
}

export const parseResponse = (successStatus: number, errorMessage: string) => {
  return (response) => {
    if (response.status !== successStatus) {
      throw(errorMessage);
    }
    return response.json();
  }
}
