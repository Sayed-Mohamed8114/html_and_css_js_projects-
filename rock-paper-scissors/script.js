const score = JSON.parse(localStorage.getItem('score'))||{
    wins : 0,
    losses : 0,
    ties : 0
}

function computerPlay(){
    const computerturn = Math.random();
    if (computerturn < 1/3 ){
        return 'rock'
    }
    else if (computerturn >= 1/3 && computerturn < 2/3){
        return 'paper'
    }
    else if (computerturn >= 2/3 && computerturn < 1){
        return 'scissors'
    }
}


function compare(yourturn,computerturn){
    let message = '';
    if (yourturn === computerturn){
        score.ties++;
        message+=`Tie..`;
    }
    else if ( (yourturn === 'rock' && computerturn === 'scissors' ) || (yourturn === 'paper' && computerturn === 'rock' ) || (yourturn === 'scissors' && computerturn === 'paper')){
        score.wins++;
        message+=`You win..`;
    }

    else if ( (yourturn === 'scissors' && computerturn === 'rock' ) || (yourturn === 'rock' && computerturn === 'paper' ) || (yourturn === 'paper' && computerturn === 'scissors')){
        score.losses++;
        message+=`Computer wins..`;
    } 

    localStorage.setItem('score',JSON.stringify(score));
    document.getElementById('result').innerHTML=`
    <p style="text-align:center; font-size:24px; font-weight:bold;">${message}</p>
    <div style="
               display: flex; 
               align-items: center; 
               justify-content: center; 
               gap: 2rem; 
               margin-top: 1rem;
               flex-direction: row;
   ">
      <div style="text-align: center; flex-direction:row;">
        <h3 style="font-size: 24px;">You</h3>
          <img src="images/${yourturn}-emoji.png" alt="${yourturn}" width="50px">
       </div>
      <div style="text-align: center;">
         <h3 style="font-size: 24px;">Computer</h3>
           <img src="images/${computerturn}-emoji.png" alt="${computerturn}" width="50px">
       </div>
    </div>
  `;


    document.getElementById('score').textContent=`Score → Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    return message;
}

function play(yourplay){
    const computerturn=computerPlay();
    compare(yourplay,computerturn);
}

function resetscore(){
    score.wins=0;
    score.losses=0;
    score.ties=0;
    localStorage.setItem('score',JSON.stringify(score));

    document.getElementById('result').textContent='score had been reset.';
    document.getElementById('score').textContent='wins : 0 , losses : 0 , ties : 0';

}
