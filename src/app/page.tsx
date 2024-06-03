import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]">
      <Image src="/filmue-logo.png" className="mb-12" alt="Filmue Logo" width={400} height={100} />
      <Link href="/quiz" className="bg-[#202020] hover:bg-[#404040] text-[#FCFAFF] font-bold py-3 px-10 shadow hover:shadow-xl rounded-lg">
        Start!
      </Link>
    </div>
  );
}
