import { Spinner } from "@heroui/react";

export default function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Spinner variant="wave" />
    </div>
  );
}
