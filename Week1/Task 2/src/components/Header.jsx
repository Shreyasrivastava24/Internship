import { useState, useEffect, useRef } from 'react'

export default function Header({ logo, title, subtitle, navItems, activeItem, onNavClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  const handleNavClick = (item) => {
    setMenuOpen(false)
    if (onNavClick) onNavClick(item)
  }

  return (
    <header ref={headerRef} className={`header${scrolled ? ' header-scrolled' : ''}`}>
      <div className="header-inner">
        <div className="header-left">
          {logo && <span className="header-logo">{logo}</span>}
          <div className="header-text">
            <h1>{title}</h1>
            {subtitle && <p className="subtitle">{subtitle}</p>}
          </div>
        </div>

        <button
          className={`menu-toggle${menuOpen ? ' menu-toggle-open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`header-nav${menuOpen ? ' header-nav-open' : ''}`}>
          {navItems?.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className={item.label === activeItem ? 'nav-active' : ''}
              onClick={(e) => { e.preventDefault(); handleNavClick(item) }}
            >
              {item.icon && <span className="nav-icon">{item.icon}</span>}
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}