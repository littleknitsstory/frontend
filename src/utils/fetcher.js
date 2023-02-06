async function fetcher(endPoint, language) {
  const baseUrl = "http://dev.backend.littleknitsstory.com:26363"

  const res = await fetch(baseUrl + endPoint, {
    headers: {
      "Accept-Language": language
    }
  })

  if (!res.ok) {
    const message = `An error occurred: ${res.statusText}`
    throw new Error(message)
  }

  return res.json()

}

export default fetcher