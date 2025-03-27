import Job from "../models/JobModel.js";

export const getAllJobs = async (req, res) => {
  try {

     // Handle CORS preflight request
     res.setHeader("Access-Control-Allow-Origin", "https://m-catena-app-frontend.vercel.app");
     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
 
     if (req.method === "OPTIONS") {
       return res.status(200).end(); // Handle preflight request
     }
    const jobs = await Job.find()

    

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

