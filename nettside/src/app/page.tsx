"use client"
import { useRef, useState } from "react";
import Header from "../components/header";
import Nav from "../components/nav";

export default function Home() {
  /* her skal data inn for loggen (logData), midlertidige verdier for testing i array */
  const [logData, setLogData] = useState<any[]>([{date: '2026-03-17', time: '09:28:45', card: 1, name: "navn navnesen" }, {date: '2026-03-17', time: '13:06:34', card: 2, name: "Trine" }]);
  const tableRowRefs = useRef<(HTMLTableRowElement | null) []>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const setTableRowRef = (e: HTMLTableRowElement | null, index: number ) => {
    tableRowRefs.current[index] = e;
  };

  const filterList = (searchTerm: any) => {
    searchTerm = searchTerm.toLowerCase();
    tableRowRefs.current.forEach((row) => {
      if (row?.children) {
        let date = row.children[0].innerHTML.toLowerCase();
        let time = row.children[1].innerHTML.toLowerCase();
        let card = row.children[2].innerHTML.toLowerCase();
        let name = row.children[3].innerHTML.toLowerCase();

        if (date.indexOf(searchTerm) != -1 || time.indexOf(searchTerm) != -1 || card.indexOf(searchTerm) != -1 || name.indexOf(searchTerm) != -1){
          row.style.display = "table-row";
        } else {
          row.style.display  = "none";
        }
      } else {
        console.log('Unable to find expected elements');
      }
    });
  };

  return (
    <div className="grid grid-cols-5 auto-rows-auto">
      <div className="col-span-5 row-span-1">
        <Header />
      </div>
      <div className="col-span-1 row-span-1">
        <Nav location='dashboard' />
      </div>
      <div className="col-span-3 flex flex-col ml-10 mt-10"> 
        <h2 className="font-bold mb-2">Adgangs logg</h2>
        <input type="text" placeholder='Søk her...' value={searchValue} onChange={(e) => {filterList(e.target.value); setSearchValue(e.target.value);}} className="border p-1 pl-2" />
        {/* tabell */}
        <table>
          <thead>
            <tr>
              <th>Dato</th>
              <th>Tidspunkt</th>
              <th>Kort nr.</th>
              <th>Eier</th>
            </tr>
          </thead>
          <tbody>
            {logData.map((data: any, index: number) => {
              return(
                <tr key={index} ref={(e) => setTableRowRef(e, index)}>
                  <td>{data.date}</td>
                  <td>{data.time}</td>
                  <td>{data.card}</td>
                  <td>{data.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
