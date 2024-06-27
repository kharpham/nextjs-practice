"use client";
interface Props {
    error: Error;
    reset: () => void;
}

const ErrorPage = ({error, reset}: Props) => {
    console.log(error);
  return <>
    <div>An unexpected error has ocurred.</div>
    <button onClick={reset}>Retry</button>
  </>;
};

export default ErrorPage;
