import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from 'random'

const path = "./data.json";

// 1. Función para generar un número aleatorio entre un mínimo y un máximo (inclusive)
const getRandomCommitCount = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const totalCommits = getRandomCommitCount(0, 63);

const makeCommits = async (n) => {
    if (n === 1) return simpleGit().push()
    const x = random.int(0, 54);
    const y = random.int(0, 6);
    
    const date = moment().subtract(1, "y").add(1, 'd').add(x, 'w').add(y, 'd').format();

    const data = {
        date: date,
    };

    jsonfile.writeFile(path, data, () => {
        simpleGit().add([path]).commit(date, {'--date': date},
            makeCommits.bind(this, --n)).push()
    })
    console.log(`pushed on ${n}`)
};

makeCommits(100);