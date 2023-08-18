import { Router, Request, Response } from "express";

const router: Router = Router();
interface TeamMember {
  name: string;
}
router.get("/", async (req: Request, res: Response) => {
  try {
    const teamMembers: TeamMember[] = [
      {
        name: "Evan",
      },
      {
        name: "Dominick",
      },
      {
        name: "John",
      },
      {
        name: "Fredy",
      },
      {
        name: "Fredrik",
      },
      {
        name: "Jeffrey",
      },
    ];
    res.status(200).json({ teamMembers: teamMembers });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

export { router as testRouter };
