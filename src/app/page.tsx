import Navbar from "@/components/header/Navbar";
import Postdata from "@/components/shared/Postdata";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Postdata initialPage={[]} />
      </div>
    </div>
  );
}
