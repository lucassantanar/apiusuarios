import express from 'express';
import cors from 'cors';
import accounstRouter from './routes/usuarios.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;
global.fileName = 'usuarios.json';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/account', accounstRouter);

var port = process.env.PORT || 3000;

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    console.log('Server em execução!');
  } catch (err) {
    const initialJson = {
      usuarios: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        console.log('Server em execução e arquivo criado!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
