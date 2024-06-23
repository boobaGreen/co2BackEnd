exports.test = (req, res, next) => {
  // Create a report object
  const report = {
    message: 'Test successful! env',
    timestamp: Date.now(), // Get current timestamp
    // You can add more details to the report object as needed
  };

  // SEND RESPONSE
  console.log('test ok! env ');
  res.status(200).json({
    status: 'success',
    data: report, // Include the report object in data
    requestedAt: req.requestTime,
  });
};
