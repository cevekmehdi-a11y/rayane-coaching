import { useCallback, useEffect, useState } from 'react'
import About from './components/About'
import Divider from './components/Divider'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Hero from './components/Hero'
import InstagramSection from './components/InstagramSection'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Pricing from './components/Pricing'
import PrivacyModal from './components/PrivacyModal'
import Results from './components/Results'
import Services from './components/Services'
import SignupForm from './components/SignupForm'
import Steps from './components/Steps'
import WhatsAppFloat from './components/WhatsAppFloat'
import { coach } from './config'
import { content } from './content'
import { useLang } from './lib/i18n'

export default function App() {
  const { t } = useLang()
  // Formule choisie depuis la section Tarifs → pré-cochée dans le formulaire
  const [planRequest, setPlanRequest] = useState(null)

  useEffect(() => {
    document.title = `${coach.brand} ${coach.brandSuffix} — ${t(content.meta.title)}`
  }, [t])

  const choosePlan = useCallback((planId) => {
    setPlanRequest({ planId, at: Date.now() })
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Steps />
        <Results />
        <Pricing onChoose={choosePlan} />
        <Divider from="bg-ink-950" to="bg-paper-100" />
        <SignupForm planRequest={planRequest} />
        <Divider from="bg-paper-100" to="bg-ink-950" flip />
        <Faq />
        <InstagramSection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <PrivacyModal />
    </>
  )
}
