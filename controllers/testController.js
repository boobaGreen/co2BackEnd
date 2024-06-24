exports.test = (req, res, next) => {
  // Create a report object
  const report = {
    message: 'notte notte',
    timestamp: Date.now(), // Get current timestamp
    // You can add more details to the report object as needed
  };

  // SEND RESPONSE

  res.status(200).json({
    status: 'success',
    data: report, // Include the report object in data
    requestedAt: req.requestTime,
  });
};
