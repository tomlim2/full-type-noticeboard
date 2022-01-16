import express, { Request, Response, Application } from "express";
import data from "./data.json";

const posts = data[0];
const app: Application = express();

app.use(express.urlencoded({ extended: false }));

function getData() {
  return posts.data;
}

function setData(data: any): void {
  const newData = data;
  return newData;
}

function newPostNumber(): number {
  posts.currentPostNumber = posts.currentPostNumber + 1;
  return posts.currentPostNumber;
}

app.post("/api/post", (req: Request, res: Response): void => {
  const posts = getData();
  const { title, content } = req.body;
  const newPost: {
    __id: number;
    postNumber: number;
    title: string;
    content: string;
    writer: string;
    createdAt: string;
    editedAt: string;
  } = {
    __id: Math.floor(Math.random() * 9999),
    postNumber: newPostNumber(),
    title: title,
    content: content,
    writer: "오리",
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  };

  posts.push(newPost);
  res.status(200).json(newPost);
});

app.get("/api/post", (req: Request, res: Response): void => {
  res.status(200).json(getData());
});

app.get("/api/post/:id", (req: Request, res: Response): void => {
  const { id } = req.params;
  const posts = getData();
  const singlePost = posts.find((post) => post.__id === Number(id));
  res.status(200).json(singlePost);
});

app.delete("/api/post/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const posts = getData();
  const singlePost = posts.find((post) => post.__id === Number(id));

  if (!singlePost) {
    return res.status(404).json({
      success: false,
      msg: "no post with id",
    });
  }

  const newPosts = posts.filter((post) => post.__id !== Number(req.params.id));
  res.status(200).json({ success: true, data: newPosts });
});

// let posts: {
//   __id: Number;
//   postNumber: Number;
//   title: String;
//   content: String;
//   writer: String;
//   createdAt: Date;
//   editedAt: Date;
// }[] = [
//   {
//     __id: 123,
//     postNumber: 1,
//     title: "Available",
//     content: "dummy 1",
//     writer: "오리",
//     createdAt: new Date("2022-01-01"),
//     editedAt: new Date("2022-01-01"),
//   },
// ];

// app.get("/api/post", (req: Request, res: Response): void => {
//   res.status(200).send(posts);
// });

// app.post("/api/post", (req: Request, res: Response): void => {
//     console.log(req.body)
//   const { title, content } = req.body;
//   const newPostNumber: Number = Number(posts[posts.length - 1].__id) + 1;
//   const newPost: {
//     __id: Number;
//     postNumber: Number;
//     title: String;
//     content: String;
//     writer: String;
//     createdAt: Date;
//     editedAt: Date;
//   } = {
//     __id: Math.floor(Math.random() * 7777),
//     postNumber: newPostNumber,
//     title: title,
//     content: content,
//     writer: "오리",
//     createdAt: new Date(),
//     editedAt: new Date(),
//   };

//   posts.push(newPost);
//   res.status(200).json(newPost);
// });

// app.get("/api/post/:id", (req: Request, res: Response): void => {
//   const { id } = req.params;
//   const singlePost = posts.find((post) => post.__id === Number(id));
//   res.status(200).send(singlePost);
// });

// app.patch("/api/post/:id", async(req: Request, res: Response) => {
//   const { id } = req.params;
//   const { title, content } = req.body;
//   const post = await posts.find((post) => post.__id === Number(id));

//   if(post){
//     const newPost: {
//         __id: Number;
//         postNumber: Number;
//         title: String;
//         content: String;
//         writer: String;
//         createdAt: Date;
//         editedAt: Date;
//       } = {
//         __id: Number(id),
//         postNumber: post.postNumber,
//         title: title,
//         content: content,
//         writer: post.writer,
//         createdAt: post.createdAt,
//         editedAt: new Date(),
//       };

//       const newPosts = posts.map((post) => {
//         if (post.__id === Number(id)) {
//           newPost;
//         }
//         return post;
//       });

//       res.status(200).send(newPosts);
//   }

// });

// app.delete("/api/post/:postNumber", (req: Request, res: Response): void => {
//   res.status(200).send(posts);
// });

const port = 5000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
