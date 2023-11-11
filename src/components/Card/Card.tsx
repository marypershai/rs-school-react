import { useSearchParams } from 'react-router-dom';
import './Card.css';
import { useContext } from 'react';
import { CardContext } from '../../contexts/CardContext';

export function Card() {
  const { card } = useContext(CardContext);
  const [, setSearchParams] = useSearchParams();

  return (
    <div key={card.mal_id} className="card-container">
      <button
        className="close-button"
        onClick={() => {
          setSearchParams((searchParams) => {
            searchParams.delete('productId');
            return searchParams;
          });
        }}
      ></button>
      <h3>{card.title}</h3>
      <p>{card.duration}</p>
      <p>{card.synopsis}</p>
    </div>
  );
}
