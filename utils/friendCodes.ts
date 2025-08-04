export function generateScannableCode(friendCode: number) {
  const timeSecs = Math.floor(Date.now() / 1000);
  return timeSecs + friendCode;
}

export function decodeScannedCode(code: number) {
  const timeSecs = Math.floor(Date.now() / 1000);
  return code - timeSecs;
}
