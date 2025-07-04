let transactions = [
  { id: 1, date: "2025-06-15", category: "Groceries", amount: 85 },
  { id: 2, date: "2025-06-20", category: "Rent", amount: 1200 },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(transactions);
  } else if (req.method === "POST") {
    const newTx = { id: Date.now(), ...req.body };
    transactions.push(newTx);
    res.status(201).json(newTx);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}