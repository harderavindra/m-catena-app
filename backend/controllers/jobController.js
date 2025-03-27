import Job from "../models/JobModel.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
    .populate('decisionHistory.updatedBy', 'firstName lastName email profilePic')
    .populate({ path: 'createdBy', select: 'firstName lastName profilePic role' })
      .populate('statusHistory.updatedBy', 'firstName lastName email profilePic')
      .populate('assignedTo','firstName email profilePic')

    const jobsWithSignedUrls = await Promise.all(jobs.map(async (job) => {
      let createdBy = null;

      // Find the "Created" status entry
      const createdStatus = job.decisionHistory.find(entry => entry.status === "Created");
      if (createdStatus?.updatedBy) {
        createdBy = {
          _id: createdStatus.updatedBy._id,
          email: createdStatus.updatedBy.email,
          firstName: createdStatus.updatedBy.firstName,
          profilePic: createdStatus.updatedBy.profilePic
        };
      }

      let attachmentSignedUrl = null;
      if (job.attachment) {
        try {
          const file = bucket.file(job.attachment);
          [attachmentSignedUrl] = await file.getSignedUrl({
            action: "read",
            expires: Date.now() + 10 * 60 * 1000, // 10 min expiry
          });
        } catch (err) {
          console.error(`Error generating signed URL for job ${job._id}:`, err);
        }
      }

      return {
        ...job.toObject(),
        createdBy,
        attachmentSignedUrl
      };
    }));

    res.status(200).json(jobsWithSignedUrls);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

