import { FetcherError } from '@commerce/utils/errors'

import { API_URL } from '../../constants'

export async function getToken() {
  // If not, get a new one and store it
  const authResponse = await fetch(`${API_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: `client_id=${process.env.NEXT_PUBLIC_ORDERCLOUD_CLIENT_ID}&grant_type=client_credentials&client_secret=${process.env.NEXT_PUBLIC_ORDERCLOUD_CLIENT_SECRET}`,
  })

  // If something failed getting the auth response
  if (!authResponse.ok) {
    // Get the body of it
    const error = await authResponse.json()

    // And return an error
    throw new FetcherError({
      errors: [{ message: error.error_description.Code }],
      status: error.error_description.HttpStatus,
    })
  }

  // Return the token
  return authResponse.json().then((response) => response.access_token)
}
