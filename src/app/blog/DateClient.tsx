"use client";
import React from "react";

export function DateClient({ iso }: { iso: string }) {
  const [formatted, setFormatted] = React.useState("");
  React.useEffect(() => {
    setFormatted(new Date(iso).toLocaleString());
  }, [iso]);
  return <span>{formatted}</span>;
}
