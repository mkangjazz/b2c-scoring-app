function totalScoreOffices(city){
    var score = 0;
    var count = city.score.numOffices;
  
    function addIncompleteGroupScore(group){
        switch (group){
            case 0:
                break;
            case 1:
                score = score + 1;
                break;
            case 2:
                score = score + 3;
                break;
            case 3:
                score = score + 6;
                break;
            case 4:
                score = score + 10;
                break;
            case 5:
                score = score + 15;
                break;
            case 6:
                score = score + 21;
                break;
            default:
                break;
        }
    }

    if(count > 6){
        score = 21 * Math.floor(count / 6);
        addIncompleteGroupScore(count % 6);
    } else {
        addIncompleteGroupScore(count);
    }

    score = Number(score + city.score.officesNextToTaverns);

    return score;
}

export default totalScoreOffices;