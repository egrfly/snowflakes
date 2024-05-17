import { useState } from "react"
import Button from "../components/Button"
import LinkButton from "../components/LinkButton"
import Snowflake from "../components/Snowflake"
import SnowflakeTemplate from "../components/SnowflakeTemplate"
import { snowflakeTemplateTrianglePoints } from "../data/initialData"
import SplitScreen from "../layouts/SplitScreen"
import Point from "../models/Point"

const Workbench = () => {
  const [points, setPoints] = useState<Point[]>(snowflakeTemplateTrianglePoints)

  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")

  const submitSnowflake = async () => {
    setMessage("")
    setLoading(true)
    fetch(`${import.meta.env.VITE_BACKEND_URL}/snowflakes`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ points: JSON.stringify(points) }),
    })
      .then((response) => response.json())
      .then((snowflake) => {
        setSuccess(true)
        setMessage(`Your snowflake #${snowflake.id} is now live!`)
      })
      .catch(() => setMessage("Could not submit your snowflake at this time."))
      .finally(() => setLoading(false))
  }

  return (
    <SplitScreen
      firstPart={
        <>
          <h1 className="text-2xl font-bold tracking-tight lg:text-4xl text-center">Design your snowflake</h1>
          <p className="mt-4 mb-8 text-center">Each cut has to begin and end at an edge of the snowflake.</p>
          <SnowflakeTemplate points={points} setPoints={setPoints} submitted={success} />
          <div className="mt-8 flex justify-center items-center gap-x-6">
            {success ? (
              <LinkButton variant="slate" to="/gallery">
                Gallery
              </LinkButton>
            ) : (
              <>
                <Button onClick={submitSnowflake} disabled={loading}>
                  Submit
                </Button>
                <LinkButton variant="transparent" to="/">
                  Abandon
                </LinkButton>
              </>
            )}
          </div>
          <p className="text-center mt-4">{message || <>&nbsp;</>}</p>
        </>
      }
      secondPart={
        <div className="flex justify-center items-center w-full h-full">
          <Snowflake size="large" points={points} />
        </div>
      }
    />
  )
}

export default Workbench
