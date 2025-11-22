import { useEffect, useState } from 'react';
import Flag from './Flag';
import './Game.css';

function Game() {
    // Function to reset score container
    const resetScore = () => {
      setCorrectCount(0);
      setIncorrectCount(0);
    };
  const [flags, setFlags] = useState({});
  const [options, setOptions] = useState([]);
  const [correctFlag, setCorrectFlag] = useState('');
  const [flagUrl, setFlagUrl] = useState('');
  const [message, setMessage] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrecetCount, setIncorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);

  useEffect(()=>{
    fetch('https://flagcdn.com/pt/codes.json')
    .then(response => response.json())
    .then(data => setFlags(data))
    .catch(error => console.log(error));
  },[]);

  useEffect(()=>{
    if (Object.keys(flags).length > 0){
      startNewRound();
    }
  },[flags]);

  const startNewRound = () =>{
    const flagCodes = Object.keys(flags);
    const selectedCodes = [];
    while (selectedCodes.length < 3){
      const randomIndex = Math.floor(Math.random() * flagCodes.length); 
      const randomCode = flagCodes[randomIndex];
      if (!selectedCodes.includes(randomCode))  selectedCodes.push(randomCode);
    }
    console.log(selectedCodes);
    const correctIndex = Math.floor(Math.random() * selectedCodes.length);
    const correctCode = selectedCodes[correctIndex];
    setCorrectFlag(flags[correctCode]);
    setFlagUrl('https://flagcdn.com/256x192/'+correctCode+'.png');
    setOptions(selectedCodes.map(code=>flags[code]));
    setMessage('');
    setAnswered(false);
  };

  const handleOptionClick = (selectedFlag) => {
    setAnswered(true);
    if (selectedFlag === correctFlag) {
      setMessage('Acertou!');
      setCorrectCount(correctCount + 1);
    } else {
      setMessage('Errou!');
      setIncorrectCount(incorrecetCount+1);
    }

    setTimeout(() => {
      startNewRound();
    }, 2000);
  }

  return (
    <div className='game-container'>
      <button className="reset-score-btn" onClick={resetScore} style={{marginBottom: '16px'}}>Resetar Pontuação</button>
      <h1 className="game-title">De onde é esta bandeira?</h1>
      <div className="score-container">
        <p className="score correct">Acertos: {correctCount}</p>
        <p className={message == 'Acertou!'? 'score correct':message == 'Errou!'?'score wrong': ''}>{message}</p>
        <p className="score wrong">Erros: {incorrecetCount}</p>
      </div>
      {flagUrl?<Flag flagUrl={flagUrl}/> : 'Carregando...'}
      <div className="options-container">
        {options.map((flag, index) => (
          <button onClick={()=> handleOptionClick(flag)} 
          className={answered && flag === correctFlag ?'option-button correct-option': 'option-button'}
          key={index}
          disabled={answered}
          >
            {index+1}) {flag} 
          </button>
        ))}
      </div>
    </div>
  )
}

export default Game