const Group = require('../models/groupModel'); // Assuming groupModel.js is in the models folder

const checkAndCreateGroup = async (req, res, next) => {
  try {
    const {
      groupId,
      groupName,
      participantsCount,
      adminNames,
      totalMessages,
      totalSizeKB,
      totalEmissionsOneByte,
      totalEmissionsSWD,
    } = req.body; // Access all relevant report data

    if (!groupId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Group ID is required',
      });
    }

    // Search for the group by groupId
    let group = await Group.findOne({ groupId });

    if (!group) {
      // Create the group if it doesn't exist (set counters and adminNames from report)
      group = await Group.create({
        groupId,
        groupName,
        participantsCount,
        adminNames,
        totalMessages,
        totalSizeKB,
        totalEmissionsOneByte,
        totalEmissionsSWD,
      });
    } else {
      // Update group data if it exists (update counters and adminNames)
      group.participantsCount = participantsCount; // Update participantsCount (always)
      group.groupName = groupName; // Update groupName if provided
      group.adminNames = adminNames; // Update adminNames (always)

      // Update counters (always)
      group.totalMessages = totalMessages || group.totalMessages || 0; // Set to 0 if not provided
      group.totalSizeKB = totalSizeKB || group.totalSizeKB || 0; // Set to 0 if not provided
      group.totalEmissionsOneByte =
        totalEmissionsOneByte || group.totalEmissionsOneByte || 0; // Set to 0 if not provided
      group.totalEmissionsSWD =
        totalEmissionsSWD || group.totalEmissionsSWD || 0; // Set to 0 if not provided

      await group.save();
    }

    req.group = group; // Add the group to the request for future use
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkAndCreateGroup;
