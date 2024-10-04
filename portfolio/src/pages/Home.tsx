import { useEffect, useState } from "react";


export default function Home() {  
  const [isMounted, setIsMounted] = useState(false);
  // Use useEffect to ensure this runs only on the client side
  useEffect(() => {
    setIsMounted(true); // Ensures the component renders only on the client side
  }, [])
  if (!isMounted) return null; // Prevents server-side rendering issues

  return (
    <div className="relative w-full h-[calc(100vh-10px)] flex items-center justify-center mt-20 md:mt-0 p-0 overflow-hidden">
        <h1 className="text-white">hola</h1>
{/*       <ThreeComponent />
      <SmHome />   */}
    </div>
  );
} 