import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { GitHubService } from "./githubService";
import { ErrorPayload } from "./burgerFormatter";

// Load Environment Variables (.env)
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Initialize GitHub Service
let gitHubService: GitHubService;
try {
  gitHubService = new GitHubService();
} catch (error: any) {
  console.error("Initialization Error:", error.message);
  process.exit(1);
}

// Endpoint to receive incoming code crashes
app.post("/webhook/crash", async (req: Request, res: Response): Promise<void> => {
  const { errorName, message, stack, environment, url, userId } = req.body;

  // Basic payload verification
  if (!errorName || !message || !stack || !environment || !url) {
    res.status(400).json({ 
      success: false, 
      message: "Missing ingredients. Required: errorName, message, stack, environment, url" 
    });
    return;
  }

  const payload: ErrorPayload = {
    errorName,
    message,
    stack,
    environment,
    url,
    userId,
    timestamp: new Date().toISOString()
  };

  try {
    console.log(`🍔 Cooking a new Debug Burger for [${environment}]...`);
    const issueUrl = await gitHubService.serveErrorBurger(payload);
    
    res.status(201).json({
      success: true,
      message: "Burger delivered successfully to GitHub Kitchen!",
      issueUrl: issueUrl
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "The kitchen caught fire while processing the burger.",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🍔 The Debug Burger server is grilling on port ${PORT}`);
});
