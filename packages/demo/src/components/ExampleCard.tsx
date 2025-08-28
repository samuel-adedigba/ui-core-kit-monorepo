import React from "react";


export default function ExampleCard({
  title,
  render,
  code,
}: {
  title: string;
  render: () => React.ReactNode;
  code?: string;
}) {
  return (
    <div className="border rounded-md p-4 bg-wh shadow-sm">
      <div className="mb-3 font-medium">{title}</div>
      <div className="mb-3">{render()}</div>
      {code && (
        <pre className="text-xs p-2 bg-blue-100 text-black rounded overflow-auto">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
