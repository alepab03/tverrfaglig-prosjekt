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

  const filterList = (searchTerm: string) => {
    searchTerm = searchTerm.toLowerCase();
    tableRowRefs.current.forEach((row) => {
      if (row?.children) {
        let date = row.children[0].innerHTML.toLowerCase();
        let time = row.children[1].innerHTML.toLowerCase();
        let card = row.children[2].innerHTML.toLowerCase();
        let name = row.children[3].innerHTML.toLowerCase();

        const map: Record<string, string> = { date, time, card, name };
        const val = map[categoryValue] ?? '';
        row.style.display = val.indexOf(searchTerm) !== -1 ? 'table-row' : 'none';
      }
    });
  };

  const initials = (name: string) => {
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  const avatarColors = [
    ['#dbeafe', '#1d4ed8'],
    ['#dcfce7', '#166534'],
    ['#fce7f3', '#9d174d'],
    ['#fef3c7', '#b45309'],
  ];

  const avatarColor = (name: string) => {
    let hash = 0;
    for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
    return avatarColors[Math.abs(hash) % avatarColors.length];
  };

  const today = logData.filter(d => d.date === new Date().toISOString().slice(0, 10)).length;
  const uniqueCards = new Set(logData.map(d => d.card)).size;

  return (
    <div className="grid grid-cols-5 auto-rows-auto min-h-screen" style={{ background: 'var(--background)' }}>
      <div className="col-span-5 row-span-1">
        <Header />
      </div>
      <div className="col-span-1 row-span-1">
        <Nav location="dashboard" />
      </div>

      <div className="sm:col-span-3 col-span-5 px-5 py-20">

        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[var(--green)]">Adgangs logg</h2>
            <p className="text-sm text-gray-400 mt-0.5">Oversikt over alle registrerte adganger</p>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Totalt</p>
            <p className="text-2xl font-bold text-[var(--green)]">{logData.length}</p>
            <p className="text-xs text-gray-400 mt-0.5">adganger registrert</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">I dag</p>
            <p className="text-2xl font-bold text-green-600">{today}</p>
            <p className="text-xs text-gray-400 mt-0.5">adganger i dag</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Unike kort</p>
            <p className="text-2xl font-bold text-blue-700">{uniqueCards}</p>
            <p className="text-xs text-gray-400 mt-0.5">forskjellige kort</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-gray-200 rounded-t-xl px-4 py-3 flex items-center justify-between border-b-0">
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                name="category"
                id="category"
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
                className="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-gray-700 bg-gray-50 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 cursor-pointer"
              >
                <option value="date">Dato</option>
                <option value="time">Tidspunkt</option>
                <option value="card">Kort nr.</option>
                <option value="name">Eier</option>
              </select>
              <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M9.5 9.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Søk her..."
                value={searchValue}
                onChange={(e) => { filterList(e.target.value); setSearchValue(e.target.value); }}
                className="border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-[var(--green)] bg-gray-50 w-56 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 placeholder:text-gray-400"
              />
            </div>
          </div>

          <span className="text-xs text-gray-400">{logData.length} oppføringer</span>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-36">Dato</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-32">Tidspunkt</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-24">Kort nr.</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Eier</th>
              </tr>
            </thead>
            <tbody>
              {logData.map((data: any, index: number) => {
                const [bg, fg] = avatarColor(data.name);
                const ini = initials(data.name);
                return (
                  <tr
                    key={index}
                    ref={(e) => setTableRowRef(e, index)}
                    className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">{data.date}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600 font-mono">{data.time}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-md">
                        #{data.card}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                          style={{ backgroundColor: bg, color: fg }}
                        >
                          {ini}
                        </div>
                        <span className="text-sm font-medium text-[var(--green)]">{data.name}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {logData.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">
              Ingen oppføringer funnet
            </div>
          )}
        </div>

      </div>
    </div>
  );
}