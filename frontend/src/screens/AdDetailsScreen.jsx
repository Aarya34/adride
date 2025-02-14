import { useParams } from "react-router-dom";
import { useGetWallsByIdQuery } from "../slices/wallApiSlice";
import { Button,Col,Row} from "react-bootstrap"
import Loader from "../components/Loader";

const AdDetailsScreen = () => {
  const { id } = useParams();
  const { data: ads, error, isLoading } = useGetWallsByIdQuery(id);
  const ad = ads?.wallAd || {};

  const availableFrom = new Date(ad.availableFrom);
  const availableTo = new Date(ad.availableTo);
  const duration = Math.ceil((availableTo - availableFrom) / (1000 * 60 * 60 * 24));
  if (isLoading) return <Loader/>;
  if (error) return <p>Error loading ad details.</p>;

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white">
   <div className="flex justify-center">
        <div style={{ width: '50%' }}>
          <img
            src={ad.imageUrl}
            alt="Ad Banner"
            style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }}
            className="rounded-md mb-4"
          />
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">Brief Information:</h2>
      <p><strong>Name:</strong> {ad.wallName}</p>
      <p><strong>Address:</strong> {ad.location}</p>
      <p><strong>Duration:</strong> {duration} Days</p>
      {/* <p><strong>Type:</strong> {ad.type}</p> */}
      
      <h2 className="text-xl font-bold mt-4 mb-2">Description:</h2>
      <p>{ad.description}</p>
      {/* <p><strong>Target Audience:</strong> {ad.targetAudience}</p> */}
      {/* <p><strong>Expected Impressions:</strong> {ad.impressions}</p> */}
      <p><strong>Price:</strong> ₹{ad.monthlyPrice}</p>
      
      {/* <div className="flex justify-center"> */}
        <Row>
      <Col sm={12} md={6} lg={4} xl={4}>
      <Button variant='success' className='w-10 mt-3 ' style={{ backgroundColor: 'green' }}>
            Approve Ad
        </Button>
        <Button variant='danger' className='w-10 mt-3' style={{ backgroundColor: 'red' }}>
        Reject Ad
        </Button>
        </Col>
        </Row>
        </div>
    // </div>
  );
};

export default AdDetailsScreen;
