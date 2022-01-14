import express, { Request, Response, Application } from "express";
const app: Application = express();

const posts: { id: Number; title: string; desc: string }[] = [
  { id: 0, title: "Available", desc: "dummy 1" },
  { id: 1, title: "Ready", desc: "dummy 2" },
  { id: 2, title: "Started", desc: "dummy 3" },
];

app.use(express.urlencoded({ extended: false }));

app.get("/api/post", (req: Request, res: Response): void => {
  res.status(200).send(posts);
});

app.post("/api/post", (req: Request, res: Response): void => {
  const { title, desc } = req.body;
  const newPost: { id: Number; title: string; desc: string } = {
    id: Math.floor(Math.random() * 7777),
    title: title,
    desc: desc,
  };
  posts.push(newPost);
  res.status(200).json(newPost);
});

app.get("/api/post/:postId", (req: Request, res: Response): void => {
  const { postId } = req.params;
  const singlePost = posts.find((post) => post.id === Number(postId));
  res.status(200).send(singlePost);
});

app.patch("/api/post/:postId", (req: Request, res: Response): void => {
  res.status(200).send(posts);
});

app.delete("/api/post/:postId", (req: Request, res: Response): void => {
  res.status(200).send(posts);
});

const port = 5000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
