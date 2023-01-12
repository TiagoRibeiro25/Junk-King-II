export function getVolumeByDistance(playerPosition) {
  let result = 55 - playerPosition.z;
  if (result < 0) result *= -1;
  result = 0.03 - result / 5000;
  return result;
}
