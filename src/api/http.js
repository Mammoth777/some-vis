import { useState, useEffect } from 'react'

export const useFetch = url => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [url])
  return {data, loading, error}
}
