import { useEffect, useState } from "react";

export default function TransactionList() {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((r) => r.json())
      .then(setTxs);
  }, []);

  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Date</th>
          <th className="p-2">Category</th>
          <th className="p-2">Amount</th>
        </tr>
      </thead>
      <tbody>
        {txs.map((t) => (
          <tr key={t.id}>
            <td className="p-2">{t.date}</td>
            <td className="p-2">{t.category}</td>
            <td className="p-2">${t.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}