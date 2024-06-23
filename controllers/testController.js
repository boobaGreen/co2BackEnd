exports.test = (req, res, next) => {
  // Create a report object
  const report = {
    message: 'Test successful! ex git 2',
    timestamp: Date.now(), // Get current timestamp
    // You can add more details to the report object as needed
  };

  // SEND RESPONSE
  console.log('test ok! ex git 2');
  res.status(200).json({
    status: 'success',
    data: report, // Include the report object in data
    requestedAt: req.requestTime,
  });
};
