import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';

function Home() {
  const deck = [
    { id: 1, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 2, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 3, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 4, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 5, name: 'cactus', image: '/cactus.svg' },
    { id: 6, name: 'cactus', image: '/cactus.svg' },
    { id: 7, name: 'dog', image: '/dog.svg' },
    { id: 8, name: 'dog', image: '/dog.svg' },
    { id: 9, name: 'laptop', image: '/laptop.svg' },
    { id: 10, name: 'laptop', image: '/laptop.svg' },
    { id: 11, name: 'octopus', image: '/octopus.svg' },
    { id: 12, name: 'octopus', image: '/octopus.svg' },
    { id: 13, name: 'strawberry', image: '/strawberry.svg' },
    { id: 14, name: 'strawberry', image: '/strawberry.svg' },
    { id: 15, name: 'sunglasses', image: '/sunglasses.svg' },
    { id: 16, name: 'sunglasses', image: '/sunglasses.svg' },
  ];

  const [randomDeck, setRandomDeck] = useState([])
  const [selected, setSelected] = useState([]);
  const [cardIdSelected, setCardIdSelected] = useState([])
  const [lastClickTime, setLastClickTime] = useState(0);
  const [gameText, setGameText] = useState('Memory Game 🧠')
  const [nbClick, setNbClick] = useState(0)
  const [iq, setIq] = useState(60)
  const [logoIq, setLogoIq] = useState('👍')

  const modifyScoreIq = (type, number) => {
    type === 'add' ? setIq(iq + number) : setIq(iq - number)

    if (iq < -230) {
      setLogoIq('💩');
    } else if (iq >= -230 && iq < -110) {
      setLogoIq('☠️');
    } else if (iq >= -110 && iq < -20) {
      setLogoIq('💣');
    } else if (iq >= -20 && iq < 60) {
      setLogoIq('👍');
    } else if (iq >= 60 && iq < 110) {
      setLogoIq('💪');
    } else if (iq >= 110 && iq < 230) {
      setLogoIq('🔥');
    } else if (iq >= 230) {
      setLogoIq('🚀');
    }
  }

  const setInitial = () => {

    setSelected([])
    setNbClick(0)
    setIq(60)
    setLogoIq('👍')
  }

  const selectCard = (id) => {

    const currentTime = new Date().getTime();

    if (currentTime - lastClickTime >= 500) {
      // Clique accepté
      setLastClickTime(currentTime)
      setNbClick(nbClick + 1)

      if (selected.includes(id) === false) {
        setCardIdSelected([...cardIdSelected, id])
        setSelected([...selected, id]);
      }

    } else {
      // Clique pas accepté

      setGameText('Calm down !')
      setLastClickTime(currentTime)

      setTimeout(() => {
        setGameText('Memory Game 🧠')
      }, "1000");
    }

  };

  if (cardIdSelected.length === 2) {

    let card1 = cardIdSelected[0]
    let card2 = cardIdSelected[1]
    setCardIdSelected([])

    const nameOfSelectedCards = cardIdSelected.map(idCard => {
      return randomDeck.find(card => card.id === idCard).name
    })

    if (nameOfSelectedCards[0] === nameOfSelectedCards[1]) {
      console.log(selected.length);
      modifyScoreIq('add', 60)

      if (selected.length === 16) {
        const myTimeout = setTimeout(() => {
          setInitial();
        }, "2000");

        if (selected.length === 0) {
          clearTimeout(myTimeout);
        }
      }
    } else {
      modifyScoreIq('remove', 40)
      const myTimeout = setTimeout(() => {
        console.log("Delayed for 1 second.");
        setSelected(selected.filter(element => element !== card1 && element !== card2))
      }, "450");

      if (selected.length === 0) {
        clearTimeout(myTimeout);
      }
    }
  }

  useEffect(() => {
    const randomDeck = []
    const allNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    for (let i = 0; i < 16; i++) {
      let randomNumber = Math.floor(Math.random() * allNumber.length);
      randomDeck.push(deck[allNumber[randomNumber]])
      let indexOfNumberGet = allNumber.indexOf(allNumber[randomNumber])
      allNumber.splice(indexOfNumberGet, 1)
    }

    setRandomDeck(randomDeck)
  }, [])

  const cardsToDisplay = randomDeck.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        name={card.name}
        image={card.image}
        selectCard={selectCard}
        selected={selected.includes(card.id)}
      />
    );
  });

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          {gameText}
        </h1>
        <div className={styles.scoreDiv}>
          <span>Click : {nbClick} </span><span>IQ : {iq} {logoIq}</span>
        </div>
        <div className={styles.headerDivider} />
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>
          {cardsToDisplay}
        </div>
      </div>
    </div>
  );
}

export default Home;
