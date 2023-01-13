export default function handleHandOnPlayer(player, giantHand) {
  if (player.body.position.z > 55 && player.body.position.z < 69) {
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
