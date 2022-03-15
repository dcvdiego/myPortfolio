export function updateCameraToModelPosition(
  cameraTarget,
  model,
  controls,
  currentPos
) {
  cameraTarget.x = model.current.position.x;
  cameraTarget.y = model.current.position.y + 2;
  cameraTarget.z = model.current.position.z;

  console.log(currentPos.x - model.current.position.x);

  controls.target = cameraTarget;
}
