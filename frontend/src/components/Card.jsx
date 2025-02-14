import React from 'react'
import { Card, Row, Col,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Carder = ({ ads }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Row>
        <Col md={5}>
          <Link to={`/ads/${ads._id}`}>
            <Card.Img src='https://res.cloudinary.com/djgcnoox4/image/upload/v1738664780/ads/jgjwccwf5truhnxs1qnx.png'  variant='top' 
              style={{ height: '150px', objectFit: 'cover' }}  />
          </Link>
        </Col>
        <Col md={7}>
          <Card.Body>
            <Link to={`/ads/${ads._id}`} style={{ textDecoration: 'none' }}>
              <Card.Title as='div' className='ads-title'>
                <strong>{ads.name}</strong>
              </Card.Title>
            </Link>
            <Card.Text>{ads.location}</Card.Text>
            <Card.Text>Duration: {ads.duration} days</Card.Text>
            <Card.Text as='h3'>₹{ads.price}</Card.Text>
           
          </Card.Body>
        </Col>
        <Button variant='primary' className='w-100 mt-3' as={Link} to={`/ads/${ads._id}`} style={{ backgroundColor: 'black' }}>
              View Details
            </Button>
      </Row>
    </Card>
  )
}

export default Carder