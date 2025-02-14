import React from 'react'
import { Card, Row, Col,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Carder = ({ ads }) => {
    const displayName = ads.wallName || "No Name";
    const availableFrom = new Date(ads.availableFrom);
    const availableTo = new Date(ads.availableTo);
    const duration = Math.ceil((availableTo - availableFrom) / (1000 * 60 * 60 * 24));
  return (
    <Card className='my-3 p-3 rounded'>
      <Row>
        <Col md={5}>
          <Link to={`/ads`}>
            <Card.Img src= {ads.imageUrl}  variant='top' 
              style={{ height: '150px', objectFit: 'cover' }}  />
          </Link>
        </Col>
        <Col md={7}>
          <Card.Body>
            <Link to={`/ads`} style={{ textDecoration: 'none' }}>
              <Card.Title as='div' className='ads-title'>
                <strong>{displayName}</strong>
              </Card.Title>
            </Link>
            <Card.Text>{ads.location}</Card.Text>
            <Card.Text>Duration: {duration} days</Card.Text>
            <Card.Text as='h3'>₹{ads.monthlyPrice}</Card.Text>
           
          </Card.Body>
        </Col>
        <Button variant='primary' className='w-100 mt-3' as={Link} to={`/ads`} style={{ backgroundColor: 'black' }}>
              View Details
            </Button>
      </Row>
    </Card>
  )
}

export default Carder