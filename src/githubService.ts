import { Octokit } from "@octokit/rest";
import { BurgerFormatter, ErrorPayload } from "./burgerFormatter";

export class GitHubService {
  private octokit: Octokit;
  private owner: string;
  private repo: string;

  constructor() {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
      throw new Error("Missing GitHub configuration in environment variables (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO).");
    }

    this.octokit = new Octokit({ auth: token });
    this.owner = owner;
    this.repo = repo;
  }

  public async serveErrorBurger(payload: ErrorPayload): Promise<string> {
    const title = BurgerFormatter.generateIssueTitle(payload);
    const body = BurgerFormatter.generateMarkdownBody(payload);

    try {
      const response = await this.octokit.issues.create({
        owner: this.owner,
        repo: this.repo,
        title,
        body,
        labels: ["bug", "the-debug-burger", payload.environment],
      });

      return response.data.html_url;
    } catch (error) {
      console.error("Failed to send burger order to GitHub Kitchen:", error);
      throw error;
    }
  }
}
