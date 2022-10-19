import express from 'express';
import { routes } from './routes';
import cors from 'cors'
import { env } from 'process';

const app = express();

app.use(cors());
app.use(express.json()); // Vai verificar antes da requisição se tem algum body em JSON
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log("http server running man!");
});