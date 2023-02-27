import {NumberInput} from "./ui-kit/NumberInput/NumberInput";
import './App.css';
import {useEffect, useState} from "react";
import {Loader} from "./ui-kit/Loader/Loader";
function App() {
  const [rub, setRub] = useState(0)
  const [usd, setUsd] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("http://www.randomnumberapi.com/api/v1.0/random?min=70&max=100&count=1")
      .then((resp) => resp.json())
      .then((data) => {
        setExchangeRate(data[0])
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <Loader />

  const handleChangeRub = (v: number) => {
    setRub(v);
    setUsd(v / exchangeRate);
  }

  const handleChangeUsd = (v: number) => {
    setUsd(v);
    setRub(v * exchangeRate);
  }

  return (
    <div>
      <NumberInput value={rub} onChange={handleChangeRub} />
      <div>Exchange rate: {exchangeRate}</div>
      <NumberInput value={usd} onChange={handleChangeUsd} />
    </div>
  )
}

export default App
