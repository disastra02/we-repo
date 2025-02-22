import { Elysia } from "elysia";
import { Routes } from "./routes";
import cors from "@elysiajs/cors";

const app = new Elysia();
app.get('/', () => 'Server ElysiaJS berjalan.');
app.group('/api/v1', (app) => app.use(Routes)); // api v1 untuk windows explorer

app.use(cors()) // Untuk handle cors
app.listen(5000); // Bejalan di port 5000

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
