function totalScoreTaverns(city) {
  let score = 0;

  const tavernSets = city["score"]["uniqueTaverns"];

  tavernSets.map(set => {
    switch (set.length) {
      case 4:
        score += 17;
        break;
      case 3:
        score += 9;
        break;
      case 2:
        score += 4;
        break;
      case 1:
        score += 1;
        break;
      default:
        break;
    }

    return false;
  });

  return score;
}

export default totalScoreTaverns;
