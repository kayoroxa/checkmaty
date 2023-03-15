import { useRouter } from 'next/router'
import { useState } from 'react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/user?email=${email}`)

      if (response.ok) {
        const user = await response.json()
        setUser(user)
        router.push('/')
      } else {
        throw new Error('Usuário não encontrado')
      }
    } catch (e) {
      setError(e.message)
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Carregando...' : 'Entrar'}
      </button>
      {error && <p>{error}</p>}
    </form>
  )
}
