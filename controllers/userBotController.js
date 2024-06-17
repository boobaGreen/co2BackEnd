const { getUserGroups } = require('../utils/telegramService');
const AppError = require('../utils/appError');

exports.getDetailGroups = async (req, res, next) => {
  const { userId } = req.query; // assuming userId is passed as query parameter
  console.log('userId:', userId);
  if (!userId) {
    return next(new AppError('User ID is required', 400));
  }

  try {
    const groups = await getUserGroups(userId);

    res.status(200).json({
      status: 'success',
      data: {
        groups,
      },
    });
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return next(new AppError('Failed to fetch user groups', 500));
  }
};
