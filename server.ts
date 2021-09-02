import express from 'express';
import { PrismaClient } from '@prisma/client';

const port = process.env.PORT || 5000;
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use('/', express.static('client/build'));

app.get('/api/page', async (_, res) => {
  const [formations, players, squad] = await Promise.all([prisma.formation.findMany(), prisma.player.findMany(), prisma.squad.findFirst()]);
  res.json({
    formations,
    players,
    squad
  });
});

app.get('/api/formations', async (_, res) => {
  const formations = await prisma.formation.findMany();
  res.json(formations);
});

app.get('/api/players', async (_, res) => {
  const players = await prisma.player.findMany();
  res.json(players);
});

app.get('/api/squad', async (_, res) => {
  const squad = await prisma.squad.findFirst();
  res.json(squad);
});

app.post('/api/squad/:squadId', async (req, res) => {
  try {
    const update = await prisma.squad.update({
      where: { id: parseInt(req.params.squadId) },
      data: req.body,
    });

    res.status(200).json(update);
  } catch (e: any) {
    console.log(e);
    res.status(500).json(JSON.stringify(e));
  }
});

app.listen(port, () => {
  console.log( `server started at http://localhost:${ port }` );
});
