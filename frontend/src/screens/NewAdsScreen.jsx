import React from 'react';
import Carder from '../components/Card';
import { Row, Col } from 'react-bootstrap';

const ads = [
    {
        id: 1,
        name: "Nayana Ganguly",
        location: "7th Block, Jayanagar",
        duration: 25,
        price: 13500,
        image: "https://via.placeholder.com/150"
    },
    {
        id: 2,
        name: "Ishana Banerjee",
        location: "7th Block, Koramangala",
        duration: 20,
        price: 5500,
        image: "https://via.placeholder.com/150"
    },
    {
        id: 3,
        name: "Mahendra Rao",
        location: "24th Main, JP Nagar",
        duration: 15,
        price: 9500,
        image: "https://via.placeholder.com/150"
    }
];

const NewAdsScreen = () => {
    return (
        <>
          <h1 className='text-center' style={{ color: 'black' }}>Latest Products</h1>
          <h3 className='text-center'>Review and manage ads submittted for approval</h3>
          <Row>
            {ads.map(ad => (
              <Col key={ad.id} sm={12} md={6} lg={4} xl={4} className="d-flex justify-content-center">
                <Carder ads={ad} />
              </Col>
            ))}
          </Row>
         
          
        </>
      )
};

export default NewAdsScreen;