import Image from "next/image";
import Nav from "@/app/components/nav"
import Hero from "@/app/components/hero"
import Footer from '@/app/components/footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero  />
      <Footer />
    </main>
      
  );
}
