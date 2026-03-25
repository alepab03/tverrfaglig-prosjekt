"use client"
import { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import Nav from "../components/nav";
import axios from 'axios';
import { redirect, RedirectType } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  /* her skal data inn for loggen (logData), midlertidige verdier for testing i array */
  const [logData, setLogData] = useState<any[]>([{date: '2026-03-17', time: '09:28:45', card: 1, name: "navn navnesen" }, {date: '2026-03-17', time: '13:06:34', card: 2, name: "Trine" }]);
  const tableRowRefs = useRef<(HTMLTableRowElement | null) []>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [categoryValue, setCategoryValue] = useState<string>('');
  const router = useRouter();
  // authorization
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/auth/home', {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      });
    } catch(error) {
      //redirect('/registrering', RedirectType.push); | begge disse metodene er litt trege på å reagere men jeg vet ikke om det er fordi det skjer i en async function eller om det er fordi jeg er på dev, må teste forskjellige ting for å se om det er en løsning på det her
      router.push('/logg-inn');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  /* søkefunksjon */
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

        switch(categoryValue) {
          case "date":
            if (date.indexOf(searchTerm) != -1){
              row.style.display = "table-row";
            } else {
              row.style.display  = "none";
            }
            break;
          case "time":
            if (time.indexOf(searchTerm) != -1){
              row.style.display = "table-row";
            } else {
              row.style.display  = "none";
            }
            break;
          case "card":
            if (card.indexOf(searchTerm) != -1){
              row.style.display = "table-row";
            } else {
              row.style.display  = "none";
            }
            break;
          case 'name':
            if (name.indexOf(searchTerm) != -1){
              row.style.display = "table-row";
            } else {
              row.style.display  = "none";
            }
            break;
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
      <div className="sm:col-span-3 col-span-5 flex flex-col items-center sm:ml-10 mt-10 sm:mr-10"> 
        <h2 className="font-bold mb-2">Adgangs logg</h2>
        <div className="flex flex-row w-[90vw] sm:w-[40vw]">
          <select name="category" id="category" value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)} className="font-bold border-t border-l pr-1 pl-1 w-[19.9%]">
            <option value="date">Dato</option>
            <option value="time">Tidspunkt</option>
            <option value="card">Kort nr.</option>
            <option value="name">Eier</option>
          </select>
          <input type="text" placeholder='Søk her...' value={searchValue} onChange={(e) => {filterList(e.target.value); setSearchValue(e.target.value);}} className="border-l border-r border-t p-1 pl-2 w-[80.1%]" />
        </div>
        {/* tabell */}
        <table className="log-table">
          <thead>
            <tr>
              <th className="log-table-col-1">Dato</th>
              <th className="log-table-col-2">Tidspunkt</th>
              <th className="log-table-col-3">Kort nr.</th>
              <th>Eier</th>
            </tr>
          </thead>
          <tbody>
            {logData.map((data: any, index: number) => {
              return(
                <tr key={index} ref={(e) => setTableRowRef(e, index)}>
                  <td className="">{data.date}</td>
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
