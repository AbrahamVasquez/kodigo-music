import { useState } from "react"

export const useFetch = () => {

  const [tracks, setTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [keyword, setKeyword] = useState("trending")

  const getTracks = async() => {
    setIsLoading(true)

    try {
      const tracksData = await fetch(`htttps://v1.nocodeapi.com/sskat503/spotify/RdAwxVJOvSnXrbUH/search?q=${keyword}&type=track`);
      let resp = await tracksData.json()

      if (!tracksData.ok) {
        throw new Error("Failed to fetch music data");
      }
      
      setTracks(resp.tracks.items);
    } catch (error) {
      console.error('Something went wrong, try again', error)
    } finally {
      setIsLoading(false)
    }
  };

  return { tracks, isLoading, keyword, setKeyword, getTracks };

}
