export function updateCamera(scene, player) {
  scene.camera.position.x = player.body.position.x;
  scene.camera.position.z = player.body.position.z + 10;
  scene.camera.position.y = player.body.position.y + 2.5;
}
