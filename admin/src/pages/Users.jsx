import React, { useState, useEffect } from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip
} from '@mui/material'
import { FaTrash, FaEdit, FaUserPlus } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from '../config'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteDialog, setDeleteDialog] = useState({ open: false, userId: null })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get(`${API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      setUsers(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error)
      setError('Failed to load users')
      toast.error('Failed to load users')
      setLoading(false)
    }
  }

  const handleDeleteClick = (userId) => {
    setDeleteDialog({ open: true, userId })
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, userId: null })
  }

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      await axios.delete(`${API_URL}/api/users/${deleteDialog.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      setUsers(users.filter(user => user._id !== deleteDialog.userId))
      toast.success('User deleted successfully')
      setDeleteDialog({ open: false, userId: null })
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    }
  }

  const getRoleChip = (role) => {
    const roleColors = {
      admin: { bg: '#4C51BF', color: 'white' },
      user: { bg: '#38A169', color: 'white' },
      seller: { bg: '#DD6B20', color: 'white' },
      default: { bg: '#CBD5E0', color: '#2D3748' }
    }
    
    const style = roleColors[role] || roleColors.default
    
    return (
      <Chip 
        label={role.charAt(0).toUpperCase() + role.slice(1)} 
        sx={{ 
          bgcolor: style.bg, 
          color: style.color,
          fontWeight: 'medium'
        }} 
      />
    )
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center', mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          Loading users...
        </Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: '#FFF5F5', color: '#E53E3E' }}>
          <Typography variant="h6">{error}</Typography>
          <Button variant="outlined" color="primary" onClick={fetchUsers} sx={{ mt: 2 }}>
            Try Again
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
            Users
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your system users
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<FaUserPlus />}
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1,
            boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
            background: 'linear-gradient(to right, #4C51BF, #6366F1)',
            '&:hover': {
              background: 'linear-gradient(to right, #434190, #5A67D8)'
            }
          }}
        >
          Add User
        </Button>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F7FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleChip(user.role)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit User">
                          <IconButton 
                            color="primary"
                            size="small"
                            sx={{ 
                              bgcolor: 'rgba(66, 153, 225, 0.1)',
                              '&:hover': { bgcolor: 'rgba(66, 153, 225, 0.2)' }
                            }}
                          >
                            <FaEdit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete User">
                          <IconButton 
                            color="error"
                            size="small"
                            onClick={() => handleDeleteClick(user._id)}
                            sx={{ 
                              bgcolor: 'rgba(229, 62, 62, 0.1)',
                              '&:hover': { bgcolor: 'rgba(229, 62, 62, 0.2)' }
                            }}
                          >
                            <FaTrash />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">No users found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'medium' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleDeleteCancel} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            sx={{ 
              bgcolor: '#E53E3E',
              '&:hover': { bgcolor: '#C53030' }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
} 