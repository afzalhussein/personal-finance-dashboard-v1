import Head from "next/head";
import Chart from "../components/Chart";
import TransactionList from "../components/TransactionList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Finance Dashboard</title>
      </Head>
      <main className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Personal Finance Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-4 shadow rounded">
            <h2 className="font-medium mb-2">Monthly Spending</h2>
            <Chart />
          </div>
          <div className="card p-4 shadow rounded">
            <h2 className="font-medium mb-2">Transactions</h2>
            <TransactionList />
          </div>
        </div>
      </main>
    </>
  );
}