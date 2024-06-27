import Link from "next/link";
import { Suspense } from "react";
import UserTable, { UserTableProps } from "../components/UserTable";

interface Props {
  searchParams: UserTableProps;
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <h1>Users</h1>
      <Link href="/users/new" className="btn ">
        New User
      </Link>

      <Suspense fallback={ <p>Loading...</p> }>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default UsersPage;
