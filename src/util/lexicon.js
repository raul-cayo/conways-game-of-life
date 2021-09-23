const lexicon = [
    {
      name: 'glider',
      grid: [
        [0, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ]
    },
    {
      name: "Kok's galaxy",
      grid: [
        [1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1],
      ]
    },
    {
      name: 'diamond ring',
      grid: [
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
        [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      ]
    },
    {
      name: 'diehard',
      grid: [
        [0, 0, 0, 0, 0, 0, 1, 0],
        [1, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 1, 1],
      ]
    }
  ];

function getRandomLexiconExample() {
    const randomIndex = Math.floor(Math.random() * lexicon.length);
    return lexicon[randomIndex];
}

function getLexiconByName(name) {
  let termFound;
  for (const term of lexicon) {
    if (term.name === name) {
      termFound = term;
      break;
    }
  }
  return termFound;
}

export {getRandomLexiconExample, getLexiconByName};