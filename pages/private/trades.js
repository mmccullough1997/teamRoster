/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Search from '../../components/Search';
import { getPrivateTrades } from '../../api/tradeData';
import { useAuth } from '../../utils/context/authContext';
import TradeCard from '../../components/TradeCard';

export default function Trades() {
  const [trades, setTrades] = useState([]);
  const [filteredTrades, setFilteredTrades] = useState([]);
  const { user } = useAuth();
  // console.warn(user.uid);

  const getAllTrades = () => {
    getPrivateTrades(user.uid).then((theTrades) => {
      setTrades(theTrades);
      setFilteredTrades(theTrades);
    });
  };

  useEffect(() => {
    getAllTrades();
  }, []);

  return (
    <>
      <div>
        <h1 className="homeHeader">Welcome, Coach {user.displayName}!</h1>
        <Link passHref href="/trade/newTrade">
          <Button>New Trade</Button>
        </Link>
      </div>
      <Search players={trades} setFilteredPlayers={setFilteredTrades} onUpdate={getAllTrades} />
      <div className="d-flex flex-wrap">
        {filteredTrades.map((trade) => (
          <TradeCard key={trade.firebaseKey} tradeObj={trade} onUpdate={getAllTrades} />
        ))}
      </div>
    </>
  );
}
