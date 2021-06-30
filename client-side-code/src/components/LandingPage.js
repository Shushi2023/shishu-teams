import { useState, useEffect } from 'react'
import { Navigation } from './navigation'
import { Header } from './header'
import { Features } from './features'
import { About } from './about'
import JsonData from '../data/data.json'
import SmoothScroll from 'smooth-scroll'

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
})

const LandingPage = () => {
  const [landingPageData, setLandingPageData] = useState({})
  useEffect(() => {
    setLandingPageData(JsonData)
  }, [])

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
    </div>
  )
}

export default LandingPage;