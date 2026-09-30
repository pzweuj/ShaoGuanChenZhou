import { Suspense } from "react";
import { TripApp } from "@/components/TripApp";

export default function Page() {
  return (
    <Suspense fallback={<p className="boot">行程打开中</p>}>
      <TripApp />
    </Suspense>
  );
}
