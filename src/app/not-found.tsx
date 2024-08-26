"use client";
import React from "react";
import Link from "next/link";
import DefaultLayout from "@components/Layouts/DefaultLayout";

const NotFound = () => {
    return (
        <DefaultLayout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">This page is coming soon.</p>
                <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Go back to Dashboard
                </Link>
            </div>
        </DefaultLayout>
    );
};

export default NotFound;