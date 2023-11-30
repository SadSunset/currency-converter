import { useEffect, useState } from "react";


interface ICurrencyInformation {
  ID: string;
  Name: string;
  Nominal: number;
  CharCode: string;
  Value: number;
}


function App() {

  const [data, setData] = useState<ICurrencyInformation[]>([])

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(response => response.json())
      .then(data => data.Valute)
      .then(valuteInformation => {
        const listOfValute = Object.values<ICurrencyInformation>(valuteInformation)
        setData([...listOfValute])
      })
      .catch(err => console.error(err.message))
  }, [])

  console.log('data', data)
  return (
    <div>
      <div>+100</div>
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
          {Array.isArray(data) && data.map((item: any) =>
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
