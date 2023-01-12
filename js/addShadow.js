export function addShadow(...params) {
  params.forEach((param) => {
    param.castShadow = true;
    param.receiveShadow = true;
  });
}
