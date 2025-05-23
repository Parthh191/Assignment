const { pool } = require('../config/db');

class School {
  // Add a new school to the database
  static async addSchool(name, address, latitude, longitude) {
    try {
      const [result] = await pool.query(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [name, address, latitude, longitude]
      );
      return { id: result.insertId, name, address, latitude, longitude };
    } catch (error) {
      console.error('Error adding school:', error);
      throw error;
    }
  }

  // Get all schools from the database
  static async getAllSchools() {
    try {
      const [rows] = await pool.query('SELECT * FROM schools');
      return rows;
    } catch (error) {
      console.error('Error fetching schools:', error);
      throw error;
    }
  }

  // Calculate distance between two coordinates using Haversine formula
  static calculateDistance(lat1, lon1, lat2, lon2) {
    // Earth's radius in kilometers
    const R = 6371; 
    
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in kilometers
    
    return distance;
  }

  // Convert degrees to radians
  static deg2rad(deg) {
    return deg * (Math.PI/180);
  }
}

module.exports = School;