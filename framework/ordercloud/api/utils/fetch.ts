import vercelFetch from '@vercel/fetch'
import { FetcherError } from '@commerce/utils/errors'
import jwt from 'jsonwebtoken'

import { API_URL } from '../../constants'
import { OrdercloudConfig } from '../index'
import { getToken } from './auth'

// Get an instance to vercel fetch
const fetch = vercelFetch()

export async function fetchData<T>(
  opts: {
    path: string
    method: string
    fetchOptions?: Record<string, any>
    body?: Record<string, unknown>
  },
  retries = 0
): Promise<T> {
  // Destructure opts
  const { path, body, fetchOptions, method = 'GET' } = opts

  // Decode token
  const decoded = jwt.decode(global.token as string) as jwt.JwtPayload | null

  // If token is not present or its expired, get a new one and store it
  if (
    !global.token ||
    (typeof decoded?.exp === 'number' && decoded?.exp * 1000 < +new Date())
  ) {
    // Get a new one
    const token = await getToken()

    // Store it
    global.token = token
  }

  // Do the request with the correct headers
  const dataResponse = await fetch(`${API_URL}/v1${path}`, {
    ...fetchOptions,
    method,
    headers: {
      ...fetchOptions?.headers,
      'Content-Type': 'application/json',
      accept: 'application/json, text/plain, */*',
      authorization: `Bearer ${global.token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  // If something failed getting the data response
  if (!dataResponse.ok) {
    // If token is expired
    if (dataResponse.status === 401) {
      // Get a new one
      const token = await getToken()

      // Store it
      global.token = token
    }

    // And if retries left
    if (retries < 2) {
      // Refetch
      return fetchData(opts, retries + 1)
    }

    // Get the body of it
    const error = await dataResponse.json()

    // And return an error
    throw new FetcherError({
      errors: [{ message: error.error_description.Code }],
      status: error.error_description.HttpStatus,
    })
  }

  // Return data response
  return dataResponse.json() as Promise<T>
}

const serverFetcher: (
  getConfig: () => OrdercloudConfig
) => <T>(
  method: string,
  path: string,
  body?: Record<string, unknown>,
  fetchOptions?: Record<string, any>
) => Promise<T> =
  () =>
  async <T>(
    method: string,
    path: string,
    body?: Record<string, unknown>,
    fetchOptions?: Record<string, any>
  ) => {
    // Return the data and specify the expected type
    return fetchData<T>({
      fetchOptions,
      method,
      path,
      body,
    })
  }

export default serverFetcher
