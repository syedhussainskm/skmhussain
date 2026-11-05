import { createFileRoute } from '@tanstack/react-router'
import { Footer, Header, Loader } from '../components/portfolio/Chrome'
import { VideoIntro } from '../components/portfolio/VideoIntro'
import {
  About,
  Contact,
  Education,
  Experience,
  Hero,
  Projects,
  Skills,
} from '../components/portfolio/Sections'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <Loader />
      <Header />
      <VideoIntro />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </>
  )
}
