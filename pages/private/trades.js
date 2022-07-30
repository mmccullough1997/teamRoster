/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPrivateTrades } from '../../api/tradeData';
import { useAuth } from '../../utils/context/authContext';
import TradeCard from '../../components/TradeCard';

export default function Trades() {
  const [trades, setTrades] = useState([]);
  const { user } = useAuth();
  // console.warn(user.uid);

  const getAllTrades = () => {
    getPrivateTrades(user.uid).then((theTrades) => {
      setTrades(theTrades);
    });
  };

  useEffect(() => {
    getAllTrades();
  }, []);

  return (
    <div className="text-center my-4">
      <div>
        <h1>My Trades</h1>
        <Link passHref href="/trade/newTrade">
          <Button>New Trade</Button>
        </Link>
        {trades.map((trade) => (
          <TradeCard key={trade.firebaseKey} tradeObj={trade} onUpdate={getAllTrades} />
        ))}
      </div>
    </div>
  );
}
