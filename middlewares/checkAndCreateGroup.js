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
      emissionsOneByteMethod,
      emissionsSWDMethod,
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
      // Create the group if it doesn't exist (set counters from report)
      group = await Group.create({
        groupId,
        groupName,
        participantsCount,
        adminNames,
        totalMessages: totalMessages || 0, // Set to 0 if not provided
        totalSizeKB: totalSizeKB || 0, // Set to 0 if not provided
        totalEmissionsOneByte: emissionsOneByteMethod || 0, // Set to 0 if not provided
        totalEmissionsSWD: emissionsSWDMethod || 0, // Set to 0 if not provided
      });
    } else {
      // Update group data if it exists
      group.participantsCount = participantsCount; // Update participantsCount (always)
      group.groupName = groupName; // Update groupName if provided
      group.adminNames = adminNames; // Update adminNames (always)

      // Update counters (sum with existing values)
      group.totalMessages += totalMessages; // Add report value (or 0 if not provided)
      group.totalSizeKB += totalSizeKB; // Add report value (or 0 if not provided)
      group.totalEmissionsOneByte += emissionsOneByteMethod; // Add report value (or 0 if not provided)
      group.totalEmissionsSWD += emissionsSWDMethod; // Add report value (or 0 if not provided)
      group.lastReportTimestamp = Date.now(); // Update lastReportTimestamp
      await group.save();
    }

    req.group = group; // Add the group to the request for future use
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkAndCreateGroup;
