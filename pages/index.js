import Head from 'next/head'
import AddPipe from "./components/AddPipe.react";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>JSON Snippet App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className='root' />
        <AddPipe />
      </main>

      <footer>
        <div></div>
      </footer>
    </div>
  )
}
