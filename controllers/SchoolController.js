const School = require('../models/School');

// Controller for handling school-related operations
class SchoolController {
  // Add a new school
  static async addSchool(req, res) {
    try {
      const { name, address, latitude, longitude } = req.body;
      
      // Validate input data
      if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required fields: name, address, latitude, and longitude are required' 
        });
      }
      
      // Validate data types
      if (typeof name !== 'string' || typeof address !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: 'Name and address must be strings' 
        });
      }
      
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      
      if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Latitude and longitude must be valid numbers' 
        });
      }
      
      // Valid latitude range: -90 to 90
      if (lat < -90 || lat > 90) {
        return res.status(400).json({ 
          success: false, 
          message: 'Latitude must be between -90 and 90' 
        });
      }
      
      // Valid longitude range: -180 to 180
      if (lng < -180 || lng > 180) {
        return res.status(400).json({ 
          success: false, 
          message: 'Longitude must be between -180 and 180' 
        });
      }
      
      // Add school to database
      const school = await School.addSchool(name, address, lat, lng);
      
      res.status(201).json({
        success: true,
        message: 'School added successfully',
        data: school
      });
    } catch (error) {
      console.error('Error in addSchool controller:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error', 
        error: error.message 
      });
    }
  }

  // List all schools sorted by proximity to user location
  static async listSchools(req, res) {
    try {
      let { latitude, longitude } = req.query;
      
      // Validate location parameters
      if (!latitude || !longitude) {
        return res.status(400).json({ 
          success: false, 
          message: 'Latitude and longitude parameters are required' 
        });
      }
      
      const userLat = parseFloat(latitude);
      const userLng = parseFloat(longitude);
      
      if (isNaN(userLat) || isNaN(userLng)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Latitude and longitude must be valid numbers' 
        });
      }
      
      // Valid latitude range: -90 to 90
      if (userLat < -90 || userLat > 90) {
        return res.status(400).json({ 
          success: false, 
          message: 'Latitude must be between -90 and 90' 
        });
      }
      
      // Valid longitude range: -180 to 180
      if (userLng < -180 || userLng > 180) {
        return res.status(400).json({ 
          success: false, 
          message: 'Longitude must be between -180 and 180' 
        });
      }
      
      // Get all schools
      const schools = await School.getAllSchools();
      
      // Calculate distance for each school and add it as a property
      const schoolsWithDistance = schools.map(school => {
        const distance = School.calculateDistance(
          userLat, 
          userLng, 
          school.latitude, 
          school.longitude
        );
        
        return {
          ...school,
          distance: parseFloat(distance.toFixed(2)) // Round to 2 decimal places
        };
      });
      
      // Sort schools by distance (closest first)
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);
      
      res.status(200).json({
        success: true,
        message: 'Schools retrieved successfully',
        count: schoolsWithDistance.length,
        data: schoolsWithDistance
      });
    } catch (error) {
      console.error('Error in listSchools controller:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error', 
        error: error.message 
      });
    }
  }
}

module.exports = SchoolController;