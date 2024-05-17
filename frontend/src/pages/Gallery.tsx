import { useState, useEffect } from "react"
import SnowflakeData from "../models/SnowflakeData"
import Snowflake from "../components/Snowflake"

const Gallery = () => {
  const [pageNumber] = useState<number>(1)
  const [snowflakes, setSnowflakes] = useState<SnowflakeData[]>()

  const [, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")

  const getSnowflakes = async (pageNumber: number) => {
    setMessage("")
    setLoading(true)
    fetch(`${import.meta.env.VITE_BACKEND_URL}/snowflakes?pageNumber=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => setSnowflakes(data.snowflakes))
      .catch(() => setMessage("Could not load snowflakes at this time."))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getSnowflakes(pageNumber)
  }, [pageNumber])

  return (
    <div className="flex justify-center items-center h-full bg-gradient-to-b from-slate-900 to-slate-700">
      {snowflakes && (
        <div className="flex flex-wrap gap-10 mw-1/2">
          {snowflakes.map((snowflake) => (
            <Snowflake key={snowflake.id} size="small" points={JSON.parse(snowflake.points)} />
          ))}
        </div>
      )}
      {message && <p className="text-center">{message}</p>}
    </div>
  )
}

export default Gallery
