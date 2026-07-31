import { useState } from 'react'

export default function Footer({ brand, links, copyright }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>{brand}</h3>
          <p>{copyright || `© ${new Date().getFullYear()} ${brand}. All rights reserved.`}</p>
        </div>
        {links && links.length > 0 && (
          <>
            <button className="footer-toggle" onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Hide Links' : 'Show Links'}
            </button>
            <div className={`footer-links ${expanded ? 'visible' : ''}`}>
              {links.map((link, index) => (
                <a key={index} href={link.href}>{link.label}</a>
              ))}
            </div>
          </>
        )}
      </div>
    </footer>
  )
}