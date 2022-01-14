import express, { Request, Response, Application } from "express";
const app: Application = express();

const posts: { id: number; title: string; desc: string }[] = [
  { id: 0, title: "Available", desc: "dummy 1" },
  { id: 1, title: "Ready", desc: "dummy 2" },
  { id: 2, title: "Started", desc: "dummy 3" },
];

app.post("/api/post", (req: Request, res: Response): void => {
  posts.push(req.body);
  console.log(req.body)
  res.send(req.body);
});

app.get("/api/post", (req: Request, res: Response): void => {
  res.send(posts);
});

const port = 5000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
