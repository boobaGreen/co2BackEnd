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
      textTotalMessages,
      textTotalSize,
      textEmissionsOneByteMethod,
      textEmissionsSWDMethod,
      photoTotalMessages,
      photoTotalSize,
      photoEmissionsOneByteMethod,
      photoEmissionsSWDMethod,
      voiceTotalMessages,
      voiceTotalSize,
      voiceEmissionsOneByteMethod,
      voiceEmissionsSWDMethod,
      videoTotalMessages,
      videoTotalSize,
      videoEmissionsOneByteMethod,
      videoEmissionsSWDMethod,
      documentTotalMessages,
      documentTotalSize,
      documentEmissionsOneByteMethod,
      documentEmissionsSWDMethod,
      pollTotalMessages,
      pollTotalSize,
      pollEmissionsOneByteMethod,
      pollEmissionsSWDMethod,
      stickerTotalMessages,
      stickerTotalSize,
      stickerEmissionsOneByteMethod,
      stickerEmissionsSWDMethod,
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
        textTotalMessages: textTotalMessages || 0,
        textTotalSize: textTotalSize || 0,
        textEmissionsOneByteMethod: textEmissionsOneByteMethod || 0,
        textEmissionsSWDMethod: textEmissionsSWDMethod || 0,
        photoTotalMessages: photoTotalMessages || 0,
        photoTotalSize: photoTotalSize || 0,
        photoEmissionsOneByteMethod: photoEmissionsOneByteMethod || 0,
        photoEmissionsSWDMethod: photoEmissionsSWDMethod || 0,
        voiceTotalMessages: voiceTotalMessages || 0,
        voiceTotalSize: voiceTotalSize || 0,
        voiceEmissionsOneByteMethod: voiceEmissionsOneByteMethod || 0,
        voiceEmissionsSWDMethod: voiceEmissionsSWDMethod || 0,
        videoTotalMessages: videoTotalMessages || 0,
        videoTotalSize: videoTotalSize || 0,
        videoEmissionsOneByteMethod: videoEmissionsOneByteMethod || 0,
        videoEmissionsSWDMethod: videoEmissionsSWDMethod || 0,
        documentEmissionsOneByteMethod: documentEmissionsOneByteMethod || 0,
        documentEmissionsSWDMethod: documentEmissionsSWDMethod || 0,
        documentTotalMessages: documentTotalMessages || 0,
        documentTotalSize: documentTotalSize || 0,
        pollTotalMessages: pollTotalMessages || 0,
        pollTotalSize: pollTotalSize || 0,
        pollEmissionsOneByteMethod: pollEmissionsOneByteMethod || 0,
        pollEmissionsSWDMethod: pollEmissionsSWDMethod || 0,
        stickerEmissionsOneByteMethod: stickerEmissionsOneByteMethod || 0,
        stickerEmissionsSWDMethod: stickerEmissionsSWDMethod || 0,
        stickerTotalMessages: stickerTotalMessages || 0,
        stickerTotalSize: stickerTotalSize || 0,
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
      group.textTotalMessages += textTotalMessages;
      group.textTotalSize += textTotalSize;
      group.textEmissionsOneByteMethod += textEmissionsOneByteMethod;
      group.textEmissionsSWDMethod += textEmissionsSWDMethod;
      group.photoTotalMessages += photoTotalMessages;
      group.photoTotalSize += photoTotalSize;
      group.photoEmissionsOneByteMethod += photoEmissionsOneByteMethod;
      group.photoEmissionsSWDMethod += photoEmissionsSWDMethod;
      group.voiceTotalMessages += voiceTotalMessages;
      group.voiceTotalSize += voiceTotalSize;
      group.voiceEmissionsOneByteMethod += voiceEmissionsOneByteMethod;
      group.voiceEmissionsSWDMethod += voiceEmissionsSWDMethod;
      group.videoTotalMessages += videoTotalMessages;
      group.videoTotalSize += videoTotalSize;
      group.videoEmissionsOneByteMethod += videoEmissionsOneByteMethod;
      group.videoEmissionsSWDMethod += videoEmissionsSWDMethod;
      group.documentTotalMessages += documentTotalMessages;
      group.documentTotalSize += documentTotalSize;
      group.documentEmissionsOneByteMethod += documentEmissionsOneByteMethod;
      group.documentEmissionsSWDMethod += documentEmissionsSWDMethod;
      group.pollTotalMessages += pollTotalMessages;
      group.pollTotalSize += pollTotalSize;
      group.pollEmissionsOneByteMethod += pollEmissionsOneByteMethod;
      group.pollEmissionsSWDMethod += pollEmissionsSWDMethod;
      group.stickerTotalMessages += stickerTotalMessages;
      group.stickerTotalSize += stickerTotalSize;
      group.stickerEmissionsOneByteMethod += stickerEmissionsOneByteMethod;
      group.stickerEmissionsSWDMethod += stickerEmissionsSWDMethod;

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
