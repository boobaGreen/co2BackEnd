const Group = require('../models/groupModel'); // Assuming groupModel.js is in the models folder

const checkAndCreateGroup = async (req, res, next) => {
  try {
    const { groupId, groupName, participantsCount } = req.body; // Access participantsCount

    if (!groupId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Group ID is required',
      });
    }

    // Search for the group by groupId
    let group = await Group.findOne({ groupId });

    if (!group) {
      // Create the group if it doesn't exist
      group = await Group.create({ groupId, groupName, participantsCount }); // Add participantsCount
    } else {
      // Update group data if it exists
      if (participantsCount !== undefined) {
        // Check if participantsCount is present
        group.participantsCount = participantsCount; // Update participantsCount
      }
      group.groupName = groupName; // Update groupName if provided
      await group.save();
    }

    req.group = group; // Add the group to the request for future use
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkAndCreateGroup;
