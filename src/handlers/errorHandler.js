
function errorHandler(error, req, res, next) {
    console.error(error);
  
    let statusCode = 500;
  
    if (error.name === 'ValidationError') {
      statusCode = 400; // Bad Request for validation errors
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      statusCode = 409; // Conflict for unique constraint violations
    }
  
    res.status(statusCode).json({ error: error.message });
  }
  
  module.exports = errorHandler;
  