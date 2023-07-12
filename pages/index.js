import Image from "next/image";
import { Inter } from "next/font/google";
import Booking from "@/components/booking/booking";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>PDF Generator</title>
      </Head>
      <Booking />
    </>
  );
}
