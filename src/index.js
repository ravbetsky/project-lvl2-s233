import fs from 'fs';

const genDiff = (pathToBefore, pathToAfter) => {
  const before = JSON.parse(fs.readFileSync(pathToBefore, 'utf8'));
  const after = JSON.parse(fs.readFileSync(pathToAfter, 'utf8'));
  return 5;
};

export default genDiff;