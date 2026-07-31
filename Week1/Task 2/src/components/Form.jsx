import { useState } from 'react'

export default function Form({ fields, onSubmit, submitLabel }) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  )
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    fields.forEach(field => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`
      }
      if (field.type === 'email' && formData[field.name] && !/\S+@\S+\.\S+/.test(formData[field.name])) {
        newErrors[field.name] = 'Invalid email address'
      }
    })
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSubmitted(true)
    if (onSubmit) onSubmit(formData)
  }

  const handleReset = () => {
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}))
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="form-success">
        <h3>Submitted Successfully!</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        <button onClick={handleReset}>Submit Another</button>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name}>{field.label}{field.required && ' *'}</label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder || ''}
            />
          ) : (
            <input
              id={field.name}
              type={field.type || 'text'}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder || ''}
            />
          )}
          {errors[field.name] && <span className="form-error">{errors[field.name]}</span>}
        </div>
      ))}
      <button type="submit" className="btn btn-primary btn-lg">
        {submitLabel || 'Submit'}
      </button>
    </form>
  )
}