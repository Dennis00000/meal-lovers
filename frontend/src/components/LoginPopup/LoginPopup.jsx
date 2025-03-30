import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'
import './LoginPopup.css'

const LoginPopup = ({ setShowLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      // Here you would make an API call to authenticate the user
      // For demo purposes, we'll just simulate a successful login
      localStorage.setItem('userAuth', JSON.stringify({
        name: 'John Doe',
        email: email
      }))
      setShowLogin(false)
      navigate('/')
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-popup-overlay">
      <div className="login-popup-container">
        <Card className="w-full max-w-md">
          <div className="close-btn" onClick={() => setShowLogin(false)}>×</div>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-y-4">
            <div className="grid grid-cols-2 gap-x-4">
              <Button size="sm" variant="outline" type="button">
                <Icons.gitHub className="mr-2 size-4" />
                GitHub
              </Button>
              <Button size="sm" variant="outline" type="button">
                <Icons.google className="mr-2 size-4" />
                Google
              </Button>
            </div>
            
            <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
              or
            </p>
            
            <form onSubmit={handleLogin}>
              {error && <p className="text-sm text-destructive">{error}</p>}
              
              <div className="space-y-2 mb-4">
                <Label>Email address</Label>
                <Input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="space-y-2 mb-4">
                <Label>Password</Label>
                <Input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              
              <Button className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter>
            <div className="grid w-full gap-y-4">
              <Button 
                variant="link" 
                size="sm" 
                className="mx-auto"
                onClick={() => {
                  setShowLogin(false)
                  navigate('/signup')
                }}
              >
                Don't have an account? Sign up
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default LoginPopup
