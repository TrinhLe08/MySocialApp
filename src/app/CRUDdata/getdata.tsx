export default async function getData(API: string) {
  const res = await fetch(API);

  if (!res.ok) {
    throw new Error("False");
  }

  const data = await res.json();

  return data;
}
