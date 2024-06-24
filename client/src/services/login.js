export async function signIn ({ email, password }) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/signin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }
    )
    const data = await res.json()

    return data
  } catch (error) {
    throw new Error('Error signing in')
  }
}

export async function signUp ({ name, email, password }) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      }
    )
    const data = await res.json()

    return data
  } catch (error) {
    throw new Error('Error signing up')
  }
}
