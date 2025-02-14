import React from 'react';
import Carder from '../components/Card';
import { Row, Col } from 'react-bootstrap';
import {useGetWallsQuery} from '../slices/wallApiSlice';
import {useGetAutosQuery} from '../slices/autoApiSlice';
import {useGetHelmetsQuery} from '../slices/helmetApiSlice';
import Loader from '../components/Loader';
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
    const { data: walls, error: wallEr,isLoading: wallLoad } = useGetWallsQuery();
    const { data: autos, error: autoEr,isLoading: autoLoad } = useGetAutosQuery();
    const { data: helmets, error: helmetEr,isLoading: helmetLoad } = useGetHelmetsQuery();
    const wallAds = walls?.wallAds || [];
    console.log(walls);

    return (
        <>
          <h1 className='text-center' style={{ color: 'black' }}>Latest Products</h1>
          <h3 className='text-center'>Review and manage ads submittted for approval</h3>
          <h3> WallAds</h3>
          <Row>
            {wallLoad && <Loader />}
            {wallEr && <h1>Something went wrong...</h1>}
            {wallAds && wallAds.map(wall => (
              <Col key={wall._id} sm={12} md={6} lg={4} xl={4}>
                <Carder ads={wall} />
              </Col>
            ))}
          </Row>
            {/* <h3> Autos</h3>
            <Row>
            {autoLoad && <h1>Loading...</h1>}
            {autoEr && <h1>Something went wrong...</h1>}
            {autos && autos.map(auto => (
              <Col key={auto._id} sm={12} md={6} lg={4} xl={3}>
                <Carder auto={auto} />
              </Col>
            ))}
            </Row>
            <h3> Helmets</h3>
            <Row>
            {helmetLoad && <h1>Loading...</h1>}
            {helmetEr && <h1>Something went wrong...</h1>}
            {helmets && helmets.map(helmet => (
              <Col key={helmet._id} sm={12} md={6} lg={4} xl={3}>
                <Carder helmet={helmet} />
              </Col>
            ))}
            </Row>
          */}
          
        </>
      )
};

export default NewAdsScreen;