import { useState, useEffect } from 'react'
import Die from './components/Die'
import Confetti from 'react-confetti'

function App() {
	const generateRandomDice = () => {
		const diceArr = []
		for(let i = 0; i < 10; i++){
			diceArr.push({
				value: Math.ceil(Math.random() * 6),
				isFrozen: false
			})
		}
		return diceArr
	}

	const [dice, setDice] = useState(generateRandomDice())
	const [tenzies, setTenzies] = useState(false)
	const [rollCount, setRollCount] = useState(0)

	const [highScore, setHighScore] = useState(() => {
		return parseInt(localStorage.getItem("tenziesBestScore")) || Number.MAX_VALUE
	})

	useEffect(() => {
		const allFrozen = dice.every(die => die.isFrozen)
		const allSame = dice.every(die => dice[0].value === die.value)
		
		
		
		if(allFrozen && allSame){
			setTenzies(() => {
				if(rollCount < highScore){
					setHighScore(rollCount)
					localStorage.setItem('tenziesBestScore', rollCount)
				}
				return true
			})
		}
	}, [dice, highScore, rollCount])


	const toggleFrozen = (id) => {
		setDice(prevDice => {
			return prevDice.map((die, idx) => {
				return id === idx ? { ...die, isFrozen: !die.isFrozen } : die
			})
		})
	}

	const rollDice = () => {
		setDice(prevDice => (
			prevDice.map(die => {
				if(die.isFrozen){
					return die
				}
				else{
					return {...die, value: Math.ceil(Math.random() * 6)}
				}
			})
		))
		setRollCount(prev => prev + 1)
	}

	const resetGame = () => {
		setDice(generateRandomDice())
		setTenzies(false)
		setRollCount(0)
	}

	const diceElements = dice.map((die, idx) => (
		<Die value={die.value} isFrozen={die.isFrozen} id={idx} key={idx} toggleFrozen={toggleFrozen} />
	))

  	return (
		<main className="main">
			{ tenzies && <Confetti width={window.innerWidth} /> }
			<h1>Tenzies</h1>
			<small>Times rolled: {rollCount}</small>
			<small>Best score: {highScore}</small>
			<p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
			<div className="dice-container">
				{diceElements}
			</div>
			<button className="roll-dice" onClick={ tenzies ? resetGame : rollDice } >{ tenzies ? 'Reset' : 'Roll' }</button>
	  	</main>
  	)
}

export default App;
