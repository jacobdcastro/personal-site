export const shuffleArray = (_arr: string[]) => {
  let arr = _arr;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

export const skills = [
  // 'SEO',
  // 'HTML5',
  // 'CSS3',
  'JavaScript',
  'TypeScript',
  'React',
  'Express.js',
  'MongoDB',
  'MySQL',
  'GraphQL',
  'Node.js',
  // 'Redux',
  // 'XState',
  'Web3',
  // 'Ethereum',
  'Solidity',
  // 'Solana'
];
