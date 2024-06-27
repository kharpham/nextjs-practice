import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <>
      <main>
        <h1>Hello world!</h1>
      </main>
      <Link href="/users">Users</Link>
      <Link href="/users/new">New User</Link>
      <ProductCard/>
    </>
  );
}
