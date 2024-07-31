import React from "react";
import transactionData from "@/data/TransactionsData";

const HomeTransaction = () => {
    return (
        <div className="xl:col-span-7">
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="flex justify-between mb-8">
                        <div className="font-bold text-xl text-black mt-1">Recent Transaction</div>
                    </div>
                    <div className="max-w-full overflow-x-auto pb-30">
                        <table className="w-full table-auto text-sm">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[120px] py-2 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        Organization
                                    </th>
                                    <th className="min-w-[120px] py-2 px-4 font-medium text-black dark:text-white">
                                        Txn Number
                                    </th>
                                    <th className="min-w-[150px] py-2 px-4 font-medium text-black dark:text-white">
                                        Txn Date
                                    </th>
                                    <th className="min-w-[120px] py-2 px-4 font-medium text-black dark:text-white">
                                        Txn Source
                                    </th>
                                    <th className="min-w-[120px] py-2 px-4 font-medium text-black dark:text-white">
                                        Txn Type
                                    </th>
                                    <th className="min-w-[120px] py-2 px-4 font-medium text-black dark:text-white">
                                        Txn Action
                                    </th>
                                    <th className="min-w-[120px] py-2 px-4 font-medium text-black dark:text-white">
                                        Source Ref Number
                                    </th>
                                    <th className="min-w-[150px] py-2 px-4 font-medium text-black dark:text-white">
                                        Source Ref Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transactionData.map((transaction, key) => (
                                        <tr key={key} className="cursor-pointer hover:bg-gray-2">
                                            <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <p className="text-black dark:text-white">
                                                    {transaction.organization}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <p className="text-black dark:text-white">
                                                    {transaction.txn_number}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <p className="text-black dark:text-white">
                                                    {transaction.txn_date}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <p className="text-black dark:text-white">
                                                    {transaction.txn_source}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <p className="text-black dark:text-white">
                                                    {transaction.txn_type}
                                                </p>
                                            </td>

                                            <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <p className="text-black dark:text-white">
                                                    {transaction.txn_action}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <p className="text-black dark:text-white">
                                                    {transaction.src_ref_number}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <p className="text-black dark:text-white">
                                                    {transaction.src_ref_date}
                                                </p>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeTransaction;

