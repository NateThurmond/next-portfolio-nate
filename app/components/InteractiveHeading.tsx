"use client";

export default function InteractiveHeading() {
  return (
    <h1 onClick={() => { console.log('click'); }}>React Server Side Routing</h1>
  );
}