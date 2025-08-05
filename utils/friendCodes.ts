export function generateScannableCode(friendCode: number) {
  const timeSecs = Math.floor(Date.now() / 1000);
  return timeSecs + friendCode;
}

export function decodeScannedCode(code: number | string) {
  const numericCode = typeof code === "number" ? code : Number(code);
  const timeSecs = Math.floor(Date.now() / 1000);
  return numericCode - timeSecs;
}
