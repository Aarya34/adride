import React, { useState } from 'react'
import { useGetUsersQuery } from '../slices/usersApiSlice'
import { Button, Col, Row, Table, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { FaTimes, FaCheck, FaEdit, FaTrash } from 'react-icons/fa'
import { useMakeActiveMutation, useMakeInactiveMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'

const ManageUsersScreen = () => {
  const { data, error, isLoading, refetch } = useGetUsersQuery()
  const users = data?.users || []

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredUsers = users.filter(user => {
    return (
      user.name?.toLowerCase().includes(search.toLowerCase()) &&
      (roleFilter ? user.role === roleFilter : true) &&
      (statusFilter ? user.status === statusFilter : true)
    )
  })

  const [makeActive, { isLoading: loadingActive }] = useMakeActiveMutation()
  const [makeInactive, { isLoading: loadingInactive }] = useMakeInactiveMutation()

  const makeActiveHandler = async (id) => {
    try {
      await makeActive({ Id: id })
      toast.success('User Activated')
      refetch()
    } catch (error) {
      toast.error('User Activation Failed')
    }
  }

  const makeInactiveHandler = async (id) => {
    try {
      await makeInactive({ Id: id })
      toast.success('User Inactivated')
      refetch()
    } catch (error) {
      toast.error('User Inactivation Failed')
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col className='text-center' style={{ marginBottom: '40px' }}>
          <h1 style={{ color: 'black' }}>Manage Users</h1>
          <h3>View, filter, and manage all user accounts registered on the platform.</h3>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col md={4}>
          <Form.Control
            type='text'
            placeholder='Search by name'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Control
            as='select'
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value=''>All Roles</option>
            <option value='wallOwner'>Wall Owner</option>
            <option value='admin'>Admin</option>
            <option value='owner'>Owner</option>
            <option value='advertiser'>Advertiser</option>
          </Form.Control>
        </Col>
        <Col md={4}>
          <Form.Control
            as='select'
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value=''>All Statuses</option>
            <option value='active'>Active</option>
            <option value='pending'>Pending</option>
            <option value='inactive'>Inactive</option>
          </Form.Control>
        </Col>
      </Row>
      {(loadingActive || loadingInactive) && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th style={{ marginLeft: '10px' }}>NAME</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'white' }}>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td
                  style={{
                    color:
                      user.status === 'active'
                        ? 'green'
                        : user.status === 'pending'
                        ? 'yellow'
                        : 'red',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  {user.status}
                </td>
                <td>
                  <Button
                    variant='light'
                    className='btn-sm'
                    onClick={() => makeActiveHandler(user._id)}
                  >
                    <FaCheck style={{ color: 'green' }} />
                  </Button>
                </td>
                <td>
                  <Button
                    variant='light'
                    className='btn-sm'
                    onClick={() => makeInactiveHandler(user._id)}
                  >
                    <FaTimes style={{ color: 'red' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ManageUsersScreen