/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { getPrivateTrades } from '../api/tradeData';
import { useAuth } from '../utils/context/authContext';

export default function TradeBadge() {
  const { user } = useAuth();
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    getPrivateTrades(user.uid).then((theTrades) => {
      setTrades(theTrades);
    });
  }, [trades]);

  return (
    <>
      <Badge className="tradeBadge" bg="primary">{trades.length}</Badge>{' '}
    </>
  );
}
