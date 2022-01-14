import express, { Request, Response, Application } from "express";
const app: Application = express();

const posts: { id: string; title: string; desc: string }[] = [
  { id: "0", title: "Available", desc: "dummy 1" },
  { id: "1", title: "Ready", desc: "dummy 2" },
  { id: "2", title: "Started", desc: "dummy 3" },
];

app.use(express.urlencoded({ extended: false }));

app.post("/api/post", (req: Request, res: Response): void => {
  console.log(req);
  posts.push(req.body);
  res.status(200).json(req.body);
});

app.get("/api/post", (req: Request, res: Response): void => {
  res.status(200).send(posts);
});

const port = 5000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
