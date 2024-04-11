import Link from "next/link";

function NotFound() {
  return (
    <>
      <h2 className="text-3xl">There was a problem.</h2>
      <p>We could not find the page you were looking for.</p>
      <p>
        Go back to the <Link href="/">home page</Link>.
      </p>
    </>
  );
}

export default NotFound;
