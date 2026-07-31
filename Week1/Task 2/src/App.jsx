import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Card from './components/Card'
import Button from './components/Button'
import Form from './components/Form'

const navItems = [
  { label: 'Home', link: '#home', icon: '🏠' },
  { label: 'About', link: '#about', icon: 'ℹ️' },
  { label: 'Services', link: '#services', icon: '⚙️' },
  { label: 'Contact', link: '#contact', icon: '📧' },
]

const footerLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Support', href: '#' },
]

const cards = [
  {
    title: 'React Basics',
    description: 'Learn the fundamentals of React including JSX, components, props, and state management. This comprehensive guide covers everything you need to start building modern web applications with confidence.',
    tags: ['React', 'Beginner', 'JSX'],
  },
  {
    title: 'State Management',
    description: 'Deep dive into useState, useReducer, and Context API. Master how to manage application state effectively and understand when to use each approach for optimal performance.',
    tags: ['State', 'Hooks', 'Advanced'],
  },
  {
    title: 'Component Design',
    description: 'Best practices for building reusable, composable React components. Learn patterns like compound components, render props, and custom hooks to write cleaner code.',
    tags: ['Design', 'Patterns', 'Reusability'],
  },
]

const formFields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Your message here...', required: true },
]

export default function App() {
  const [activeNav, setActiveNav] = useState('Home')
  const [likedCards, setLikedCards] = useState([])

  const handleCardLike = (title, liked) => {
    setLikedCards(prev =>
      liked ? [...prev, title] : prev.filter(t => t !== title)
    )
  }

  const handleNavClick = (item) => setActiveNav(item.label)

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data)
  }

  const handleButtonClick = (e, count) => {
    console.log(`Button clicked ${count} times`)
  }

  return (
    <div className="app">
      <Header
        logo="⚛️"
        title="React Components Practice"
        subtitle="Building reusable UI with props & state"
        navItems={navItems}
        activeItem={activeNav}
        onNavClick={handleNavClick}
      />

      <main className="main">
        <section className="section">
          <h2>Card Components</h2>
          <p className="section-desc">
            Cards with expandable text and like toggle (state). Liked: {likedCards.length > 0 ? likedCards.join(', ') : 'None'}
          </p>
          <div className="card-grid">
            {cards.map((card, index) => (
              <Card key={index} {...card} onLike={handleCardLike} />
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Button Variants</h2>
          <p className="section-desc">Each button tracks its own click count via state</p>
          <div className="button-row">
            <Button variant="primary" size="sm" onClick={handleButtonClick}>Small</Button>
            <Button variant="secondary" size="md" onClick={handleButtonClick}>Medium</Button>
            <Button variant="success" size="lg" onClick={handleButtonClick}>Large</Button>
            <Button variant="danger" size="md" onClick={handleButtonClick}>Delete</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section className="section">
          <h2>Form Component</h2>
          <p className="section-desc">Dynamic form built from config with validation (state)</p>
          <Form fields={formFields} onSubmit={handleFormSubmit} submitLabel="Send Message" />
        </section>
      </main>

      <Footer
        brand="React Practice"
        links={footerLinks}
      />
    </div>
  )
}