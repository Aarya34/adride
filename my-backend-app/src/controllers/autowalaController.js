import Autowala from '../models/Autowala.js';
import cloudinary from '../config/cloudinary.js';

export const createAutowalaAd = async (req, res) => {
  try {
    const { registrationNumber } = req.body;

    if (!registrationNumber || !req.file) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }
    
    console.log('Uploading image to Cloudinary...');
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'autowala',
      resource_type: 'image',
    });

    console.log('Cloudinary Upload Success:', result.secure_url);

    const autowalaAd = new Autowala({
      registrationNumber,
      imageUrl: result.secure_url,
      createdBy: req.user._id,
    });

    await autowalaAd.save();
    res.status(201).json({ success: true, message: 'Autowala Ad created successfully', autowalaAd });
  } catch (error) {
    console.error('Error in createAutowalaAd:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllAutowalaAds = async (req, res) => {
  try {
    const ads = await Autowala.find().populate('createdBy', 'name email');
    res.json({ success: true, ads });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

