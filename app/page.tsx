"use client";
import _ from 'lodash';



export default function Home() {
  // const session = await getServerSession(authOptions);
  return (
    <>
      <main>
        {/* <h1>Hello {session && <span>{session.user!.name}</span>}</h1> */}
        <h1>Hello world</h1>
        <button onClick={async () => {
          const _ = (await import('lodash')).default;
          const users = [{name: 'c'}, {name: 'b'}, {name: 'a'}];
          const sorted = _.orderBy(users, ['name']);
          console.log(sorted);
        }}>Show</button>
      </main>
      {/* <main className="relative h-screen">
        <Image
          src="https://bit.ly/react-cover"
          className="object-cover"
          fill
          alt="React"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          quality={100}
          priority
        />
      </main> */}
    </>
  );
}

// export const metadata: Metadata = {
//   title: '...',

// }

// export async function generateMetadata(): Promise<Metadata> {
//   const product = await fetch();
//   return {
//     title: '...',
//     description: '...'
//   }
// }
