import { useEffect, useState } from "react";


interface ICurrencyInformation {
  ID: string;
  Name: string;
  Nominal: number;
  CharCode: string;
  Value: number;
}

interface ICurrencyOptions {
  ID: string;
  CharCode: string;
  Value: number;
}

function App() {

  const [data, setData] = useState<ICurrencyInformation[]>([])
  const [currencyOptions, setCurrencyOptions] = useState<ICurrencyOptions[]>([])
  const [firstCurrencyList, setFirstCurrencyList] = useState<number[]>([])

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(response => response.json())
      .then(data => data.Valute)
      .then(valuteInformation => {
        const listOfValute = Object.values<ICurrencyInformation>(valuteInformation)
        setData(listOfValute)
        setCurrencyOptions(listOfValute.map(item =>({...item, ID: item.ID, CharCode: item.CharCode, Value: item.Value})))
        setFirstCurrencyList(listOfValute.map(item => item.Value))
      })
      .catch(err => console.error(err.message))
  }, [])
  const changeValue = (value: any) => {
    setData(data.map((item, index) => ({ ...item, Value: ((firstCurrencyList[index] / item.Nominal) / value) })))
  }
  
  return (
    <div>
      <select onChange={(e: any) => changeValue(e.target.value)} >
        {currencyOptions.map(item =>
            <option
            key={item.ID}
            value={item.Value}
            >
            {item.CharCode}
            </option>
      )}
      </select>
      <table>
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Единиц</th>
            <th>Буквенный код</th>
            <th>Курс</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) =>
            <tr key={item.ID}>
              <td>{item.Name}</td>
              <td>{item.Nominal}</td>
              <td>{item.CharCode}</td>
              <td>{item.Value}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
