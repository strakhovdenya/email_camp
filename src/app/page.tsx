import React from 'react';

export default function Home(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Email Camp</h1>
        <p className="text-center text-lg">Your email management system for camp</p>
      </div>
    </main>
  );
}
