import { Formation, Player, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const formations: Formation[] = [
  {
    id: 1,
    name: '4-4-2',
    config: JSON.stringify([4,4,2])
  },
  {
    id: 2,
    name: '5-2-3',
    config: JSON.stringify([5,2,3])
  },
  {
    id: 3,
    name: '4-2-3-1',
    config: JSON.stringify([4,2,3,1])
  },
  {
    id: 4,
    name: '4-3-3',
    config: JSON.stringify([4,3,3])
  },
  {
    id: 5,
    name: '4-5-1',
    config: JSON.stringify([4,5,1])
  },
  {
    id: 6,
    name: '3-4-3',
    config: JSON.stringify([3,4,3])
  },
  {
    id: 7,
    name: '2-3-5 (Pep Special)',
    config: JSON.stringify([2,3,5])
  },
  {
    id: 8,
    name: '4–4–1–1',
    config: JSON.stringify([4,4,1,1])
  },
]

const players: Player[] = [
  {
    id: 1,
    position: 'GK',
    number: 1,
    firstName: 'Jordan',
    lastName: 'Pickford',
    injured: false,
    suspended: false
  },
  {
    id: 2,
    position: 'CB',
    number: 2,
    firstName: 'Kyle',
    lastName: 'Walker',
    injured: false,
    suspended: false
  },
  {
    id: 3,
    position: 'LWB',
    number: 3,
    firstName: 'Luke',
    lastName: 'Shaw',
    injured: false,
    suspended: false
  },
  {
    id: 4,
    position: 'CM',
    number: 4,
    firstName: 'Declan',
    lastName: 'Rice',
    injured: false,
    suspended: false
  },
  {
    id: 5,
    position: 'CB',
    number: 5,
    firstName: 'John',
    lastName: 'Stones',
    injured: false,
    suspended: false
  },
  {
    id: 6,
    position: 'CB',
    number: 6,
    firstName: 'Harry',
    lastName: 'Maguire',
    injured: false,
    suspended: false
  },
  {
    id: 7,
    position: 'MF',
    number: 7,
    firstName: 'Jack',
    lastName: 'Grealish',
    injured: false,
    suspended: false
  },
  {
    id: 8,
    position: 'MF',
    number: 8,
    firstName: 'Jordan',
    lastName: 'Henderson',
    injured: false,
    suspended: false
  },
  {
    id: 9,
    position: 'CF',
    number: 9,
    firstName: 'Harry',
    lastName: 'Kane',
    injured: false,
    suspended: false
  },
  {
    id: 10,
    position: 'LW',
    number: 10,
    firstName: 'Raheem',
    lastName: 'Sterling',
    injured: false,
    suspended: false
  },
  {
    id: 11,
    position: 'FW',
    number: 11,
    firstName: 'Marcus',
    lastName: 'Rashford',
    injured: false,
    suspended: false
  },
  {
    id: 12,
    position: 'RWB',
    number: 12,
    firstName: 'Kieran',
    lastName: 'Trippier',
    injured: false,
    suspended: true
  },
  {
    id: 13,
    position: 'GK',
    number: 13,
    firstName: 'Aaron',
    lastName: 'Ramsdale',
    injured: false,
    suspended: true
  },
  {
    id: 14,
    position: 'CM',
    number: 14,
    firstName: 'Kalvin',
    lastName: 'Phillips',
    injured: false,
    suspended: false
  },
  {
    id: 15,
    position: 'CB',
    number: 15,
    firstName: 'Tyrone',
    lastName: 'Mings',
    injured: false,
    suspended: false
  },
  {
    id: 16,
    position: 'CB',
    number: 16,
    firstName: 'Conor',
    lastName: 'Coady',
    injured: false,
    suspended: false
  },
  {
    id: 17,
    position: 'MF',
    number: 17,
    firstName: 'Jadon',
    lastName: 'Sancho',
    injured: true,
    suspended: false
  },
  {
    id: 18,
    position: 'CF',
    number: 18,
    firstName: 'Dominic',
    lastName: 'Calvert-Lewin',
    injured: false,
    suspended: false
  },
  {
    id: 19,
    position: 'RW',
    number: 19,
    firstName: 'Mason',
    lastName: 'Mount',
    injured: false,
    suspended: false
  },
  {
    id: 20,
    position: 'LW',
    number: 20,
    firstName: 'Phil',
    lastName: 'Foden',
    injured: false,
    suspended: false
  },
  {
    id: 21,
    position: 'LB',
    number: 21,
    firstName: 'Ben',
    lastName: 'Chilwell',
    injured: false,
    suspended: false
  },
  {
    id: 22,
    position: 'CB',
    number: 22,
    firstName: 'Ben',
    lastName: 'White',
    injured: false,
    suspended: false
  },
  {
    id: 23,
    position: 'GK',
    number: 23,
    firstName: 'Sam',
    lastName: 'Johnstone',
    injured: false,
    suspended: false
  },
  {
    id: 24,
    position: 'RB',
    number: 24,
    firstName: 'Reece',
    lastName: 'James',
    injured: false,
    suspended: false
  },
  {
    id: 25,
    position: 'MF',
    number: 25,
    firstName: 'Bukayo',
    lastName: 'Saka',
    injured: false,
    suspended: false
  },
  {
    id: 26,
    position: 'CM',
    number: 26,
    firstName: 'Jude',
    lastName: 'Bellingham',
    injured: false,
    suspended: false
  }
]

async function main() {
  for (const formation of formations) {
    await prisma.formation.create({
      data: formation
    })
  }

  for (const player of players) {
    await prisma.player.create({
      data: player
    })
  }

  await prisma.squad.create({
    data: {
      id: 1,
      formationId: 2,
      config: JSON.stringify([1,12,2,5,6,3,14,4,19,9,10,25,8,7,11,17])
    }
  })
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
})