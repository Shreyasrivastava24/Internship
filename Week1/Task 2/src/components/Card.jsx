import { useState } from 'react'

export default function Card({ title, description, image, tags, onLike }) {
  const [liked, setLiked] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    if (onLike) onLike(title, !liked)
  }

  return (
    <div className={`card ${expanded ? 'card-expanded' : ''}`}>
      {image && <img className="card-image" src={image} alt={title} />}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">
          {expanded ? description : `${description?.slice(0, 100)}...`}
        </p>
        {description?.length > 100 && (
          <button className="card-toggle" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show Less' : 'Read More'}
          </button>
        )}
        {tags && tags.length > 0 && (
          <div className="card-tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}
        <button className={`card-like ${liked ? 'liked' : ''}`} onClick={handleLike}>
          {liked ? '❤️' : '🤍'} {liked ? 'Liked' : 'Like'}
        </button>
      </div>
    </div>
  )
}