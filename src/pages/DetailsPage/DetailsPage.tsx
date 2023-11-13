import React, {
  Component,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import './DetailsPage.css';
import { CardContext } from '../../contexts/CardContext';

export default function DetailsPage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  const [loading, isLoading] = useState(false);
  const { card, setCard } = useContext(CardContext);

  async function fetchItem(id: string) {
    const api = `https://api.jikan.moe/v4/anime/${id}`;
    const response = await fetch(api);
    const data = await response.json();
    return data;
  }

  const loadCard = useCallback(async () => {
    if (productId) {
      isLoading(true);
      const data = await fetchItem(productId);
      setCard(data.data);
      isLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadCard();
  }, [loadCard]);

  return (
    <div className="details-page-container">
      {loading ? <LoadingSpinner /> : card ? <Card /> : null}
    </div>
  );
}
