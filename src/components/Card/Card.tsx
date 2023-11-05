import { useSearchParams } from 'react-router-dom';
import './Card.css';

export function Card(props) {
  const { mal_id, duration, title, synopsis } = props.card;
  const [, setSearchParams] = useSearchParams();

  return (
    <div key={mal_id} className="card-container">
      <button
        className="close-button"
        onClick={() => {
          setSearchParams((searchParams) => {
            searchParams.delete('productId');
            return searchParams;
          });
        }}
      ></button>
      <h3>{title}</h3>
      <p>{duration}</p>
      <p>{synopsis}</p>
    </div>
  );
}
