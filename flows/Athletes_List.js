import { athletes } from 'bolt:data';

export default async function Athletes_List() {
  const list = await athletes.find({});
  return { athletes: list };
}
