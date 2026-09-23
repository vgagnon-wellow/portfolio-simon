import React, { useEffect, useMemo, useState } from 'react'
import { ArrowDown, Download, Mail, Phone, ExternalLink, Menu, X } from 'lucide-react'
import { content } from './locales/content'
import { cocktailImages, experiences, galleryImages, skills } from './data/profile'

const asset = (folder, name) => `/${folder}/${name}`

function SafeImage({ src, alt, className='' }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className={`media-placeholder ${className}`}><span>[MÉDIA À FOURNIR]</span></div>
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />
}

function App(){
  const [lang, setLang] = useState('fr')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = content[lang]
  const featured = useMemo(() => experiences.filter(x=>x.featured), [])
  const earlier = useMemo(() => experiences.filter(x=>!x.featured), [])

  useEffect(()=>{
    document.documentElement.lang = lang
    document.title = lang === 'fr' ? 'Simon Tremblay | Mixologue · Barman · Serveur' : 'Simon Tremblay | Mixologist · Bartender · Server'
  },[lang])

  const navItems = [
    ['home', t.nav.home], ['about', t.nav.about], ['experience', t.nav.experience], ['skills', t.nav.skills], ['cocktails', t.nav.cocktails], ['rush', t.nav.rush], ['gallery', t.nav.gallery], ['resume', t.nav.resume], ['contact', t.nav.contact]
  ]

  return <div className="site-shell">
    <header className="topbar">
      <a href="#home" className="brand">ST</a>
      <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label={lang==='fr'?'Navigation principale':'Main navigation'}>
        {navItems.map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)}>{label}</a>)}
      </nav>
      <div className="top-actions">
        <button className="lang" onClick={()=>setLang(lang==='fr'?'en':'fr')} aria-label={lang==='fr'?'Changer la langue':'Change language'}>{lang==='fr'?'EN':'FR'}</button>
        <button className="menu" aria-label={lang==='fr'?'Ouvrir le menu':'Open menu'} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
      </div>
    </header>

    <main>
      <section id="home" className="hero section-dark">
        <SafeImage src={asset('images','hero-simon.jpg')} alt={lang==='fr'?'Simon Tremblay versant un ingrédient dans un shaker derrière le bar':'Simon Tremblay pouring an ingredient into a shaker behind the bar'} className="hero-img" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">St-Charles-Borromée, Québec</p>
          <h1>{t.hero.title}</h1>
          <p className="hero-role">{t.hero.subtitle}</p>
          <p className="hero-line">{t.hero.line}</p>
          <div className="cta-row">
            <a className="btn primary" href="#cocktails">{t.hero.ctaWork}<ArrowDown size={18}/></a>
            <a className="btn ghost" href="#resume">{t.hero.ctaCv}</a>
          </div>
        </div>
      </section>

      <section id="about" className="section split">
        <div><p className="kicker">01</p><h2>{t.aboutTitle}</h2></div>
        <div><p className="lead">{t.about}</p><p className="muted">{lang==='fr'?'DJ à son compte · Production dans les festivals de musique électronique':'Self-employed DJ · Production in electronic music festivals'}</p></div>
      </section>

      <section id="experience" className="section experience">
        <div className="section-heading"><p className="kicker">02</p><h2>{t.expTitle}</h2></div>
        <div className="timeline">
          {featured.map((e,i)=><article className="exp-row" key={e.place}><div className="index">0{i+1}</div><div><h3>{e.place}</h3><p>{e.role[lang]}</p></div><time>{e.dates[lang]}</time></article>)}
        </div>
        <div className="earlier"><h3>{t.oldExperience}</h3>{earlier.map(e=><div className="compact-row" key={e.place}><span>{e.place}</span><span>{e.role[lang]}</span><time>{e.dates[lang]}</time></div>)}</div>
      </section>

      <section id="cocktails" className="section">
        <div className="section-heading"><p className="kicker">03</p><h2>{t.cocktailsTitle}</h2><p className="muted">{t.cocktailsNote}</p></div>
        <div className="masonry">
          {cocktailImages.map((img)=><SafeImage key={img.file} src={asset('images',img.file)} alt={lang==='fr'?img.altFr:img.altEn} className="cocktail-img" />)}
        </div>
      </section>

      <section id="skills" className="section split skills-section">
        <div><p className="kicker">04</p><h2>{t.skillsTitle}</h2></div>
        <div className="skills-grid">{skills[lang].map(s=><span key={s}>{s}</span>)}</div>
      </section>

      <section id="rush" className="section rush section-dark">
        <div className="section-heading"><p className="kicker">05</p><h2>{t.rushTitle}</h2><p>{t.rushSub}</p></div>
        <div className="video-wrap">
          <video controls playsInline preload="metadata" poster={asset('images','rush-hour-poster.jpg')}>
            <source src={asset('videos','rush-hour.mp4')} type="video/mp4" />
          </video>
        </div>
        <div className="event-note"><strong>Festival Invasion Cocktails 2024</strong><span>{lang==='fr'?'Barman · Cocktail signature choisi pour représenter Cognac Larsen':'Bartender · Signature cocktail selected to represent Cognac Larsen'}</span></div>
      </section>

      <section id="gallery" className="section">
        <div className="section-heading"><p className="kicker">06</p><h2>{t.galleryTitle}</h2></div>
        <div className="gallery-grid">{galleryImages.map((img)=><SafeImage key={img.file} src={asset('images',img.file)} alt={lang==='fr'?img.altFr:img.altEn} className="gallery-img" />)}</div>
      </section>

      <section id="resume" className="section resume split">
        <div><p className="kicker">07</p><h2>{t.resumeTitle}</h2></div>
        <div><p className="lead">{t.resumeText}</p><div className="cta-row"><a className="btn primary" href="/cv/simon-tremblay-cv.pdf" target="_blank" rel="noreferrer">{t.viewCv}<ExternalLink size={18}/></a><a className="btn ghost" href="/cv/simon-tremblay-cv.pdf" download>{t.downloadCv}<Download size={18}/></a></div></div>
      </section>

      <section id="contact" className="section contact section-dark">
        <p className="kicker">08</p><h2>{t.contactTitle}</h2>
        <div className="contact-grid"><div><h3>Simon Tremblay</h3><p>St-Charles-Borromée, Québec</p></div><div className="contact-links"><a href="mailto:simontremblay400@gmail.com"><Mail size={20}/>simontremblay400@gmail.com</a><a href="tel:+14189335679"><Phone size={20}/>(418) 933-5679</a></div></div>
      </section>
    </main>
  </div>
}

export default App
