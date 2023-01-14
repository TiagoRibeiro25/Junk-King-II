export default function handleHandOnPlayer(
  player,
  giantHand,
  minPosition,
  maxPosition
) {
  if (
    player.body.position.z > minPosition &&
    player.body.position.z < maxPosition
  ) {
    if (giantHand.sphere.rotation.z < 1.9) {
      giantHand.toggleHand();
      giantHand.sphere.rotation.z = 1.8;
      player.smashed();

      setTimeout(() => {
        giantHand.sphere.rotation.z = 3.17;
        player.reset();
        giantHand.toggleHand();
        giantHand.resetFingers();
      }, 1500);
    }
  }
}
