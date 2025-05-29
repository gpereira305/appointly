import React from "react";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Button variant="destructive" className="cursor-pointer">
        Button
      </Button>
    </div>
  );
}
