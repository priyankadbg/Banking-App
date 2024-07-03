"use client";
// import dynamic from "next/dynamic";
import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

// Import DoughnutChart dynamically
// const DoughnutChart = dynamic(() => import("./DoughnutChart"), { ssr: false });

// interface TotalBalanceBoxProps {
//   accounts: number[];
//   totalBanks: number;
//   totalCurrentBalance: number;
// }

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  console.log("TotalBalanceBox accounts:", accounts); //
  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts: {totalBanks}</h2>

        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>
          <div className="total-balance-amount flex-center gap-2">
            {/* {formatAmount(totalCurrentBalance)} */}
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
