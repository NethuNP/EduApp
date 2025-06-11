import { Ellipsis } from "lucide-react";

function Loader() {
  return (
    <div className="flex items-center justify-center">
      <Ellipsis className="animate-pulse text-teal-500 " size={60} />
    </div>
  );
}

export default Loader;
