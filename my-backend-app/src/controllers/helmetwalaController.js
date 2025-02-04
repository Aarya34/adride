import Helmetwala from '../models/Helmetwala.js';
import cloudinary from '../config/cloudinary.js';

export const createHelmetwalaAd = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Image is required' });
    }
    console.log('Uploading image to Cloudinary...');
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'helmetwala',
      resource_type: 'image',
    });

    console.log('Cloudinary Upload Success:', result.secure_url);

    const helmetwalaAd = new Helmetwala({
      imageUrl: result.secure_url,
      createdBy: req.user._id,
    });

    await helmetwalaAd.save();
    res.status(201).json({ success: true, message: 'Helmetwala Ad created successfully', helmetwalaAd });
  } catch (error) {
    console.error('Error in createHelmetwalaAd:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllHelmetwalaAds = async (req, res) => {
  try {
    const ads = await Helmetwala.find().populate('createdBy', 'name email');
    res.json({ success: true, ads });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
