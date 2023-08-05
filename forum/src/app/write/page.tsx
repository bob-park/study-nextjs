import { getServerSession } from 'next-auth';
import WriteClient from './WriteClient';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Write() {
  let session = await getServerSession(authOptions);

  return <WriteClient email={session?.user?.email} />;
}
