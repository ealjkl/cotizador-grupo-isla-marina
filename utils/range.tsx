export default function range(a: number, b: number) {
  const out = [];
  for (let i = a; i < b; i++) {
    out.push(i);
  }
  return out;
}
