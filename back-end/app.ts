import express, { Request, Response, Application } from "express";
import postsData from "./data/posts.json";
import usersData from "./data/users.json";

let users = usersData[0].data;
let postsDatabase = postsData[0];
let posts = postsDatabase.data;

const app: Application = express();

app.use(function (req: Request, res: Response, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

// users API

app.get("/api/user", (req: Request, res: Response): void => {
  res.status(200).json(users[0]);
});

// posts API

function newPostNumber(): number {
  postsDatabase.currentPostNumber = postsDatabase.currentPostNumber + 1;
  return postsDatabase.currentPostNumber;
}

app.get("/api/post", (req: Request, res: Response): void => {
  res.status(200).json(posts);
});

app.post("/api/post", (req: Request, res: Response): void => {
  const { title, content, author } = req.body;
  console.log(req.body);
  const newPost: {
    __id: number;
    postNumber: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    editedAt: string;
  } = {
    __id: Math.floor(Math.random() * 9999),
    postNumber: newPostNumber(),
    title: title,
    content: content,
    author: author,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  };

  posts.push(newPost);

  res.status(200).json(newPost);
});

app.get("/api/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await posts.find((post) => post.__id === Number(id));

  res.status(200).json(post);
});

app.delete("/api/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await posts.find((post) => post.__id === Number(id));

  if (!post) {
    return res.status(404).json({
      success: false,
      msg: "no post with id",
    });
  }

  const newPosts = posts.filter((post) => post.__id !== Number(req.params.id));
  posts = newPosts;
  res.status(200).json({ success: true, data: newPosts });
});

app.put("/api/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await posts.find((post) => post.__id === Number(id));

  if (post) {
    const newPost: {
      __id: number;
      postNumber: number;
      title: string;
      content: string;
      author: string;
      createdAt: string;
      editedAt: string;
    } = {
      __id: Number(id),
      postNumber: post.postNumber,
      title: title,
      content: content,
      author: post.author,
      createdAt: post.createdAt,
      editedAt: new Date().toISOString(),
    };

    posts = posts.map((post) => {
      if (post.__id === Number(id)) {
        return newPost;
      }
      return post;
    });

    res.status(200).send(newPost);
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
