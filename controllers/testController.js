exports.test = (req, res, next) => {
  // Create a report object
  const report = {
    message: 'Test successful! env 23',
    timestamp: Date.now(), // Get current timestamp
    // You can add more details to the report object as needed
  };

  // SEND RESPONSE
  console.log('test ok! env 23');
  res.status(200).json({
    status: 'success',
    data: report, // Include the report object in data
    requestedAt: req.requestTime,
  });
};
