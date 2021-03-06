import * as THREE from 'three';
export function getMouseDegrees(x: number, y: number, degreeLimit: number) {
  let dx = 0,
    dy = 0,
    xdiff,
    xPercentage,
    ydiff,
    yPercentage;
  // window is wrong, should be width and height of canvas
  let w = { x: 768, y: 381 };

  if (x <= w.x / 2) {
    xdiff = w.x / 2 - x;

    xPercentage = (xdiff / (w.x / 2)) * 100;

    dx = ((degreeLimit * xPercentage) / 100) * -1;
  }
  if (x >= w.x / 2) {
    xdiff = x - w.x / 2;

    xPercentage = (xdiff / (w.x / 2)) * 100;

    dx = (degreeLimit * xPercentage) / 100;
  }
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y;

    yPercentage = (ydiff / (w.y / 2)) * 100;

    dy = ((degreeLimit * yPercentage) / 100) * -1;
  }
  if (y >= w.y / 2) {
    ydiff = y - w.y / 2;

    yPercentage = (ydiff / (w.y / 2)) * 100;

    dy = (degreeLimit * yPercentage) / 100;
  }
  return { x: dx, y: dy };
}
interface IMouse {
  x: number;
  y: number;
}

// for correction purposes, you must use any as we are adding xD and yD to Euler
export function moveJoint(mouse: IMouse, joint: any, degreeLimit = 40) {
  let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
  joint.rotation.xD = THREE.MathUtils.lerp(
    joint.rotation.xD || 0,
    degrees.y,
    0.1
  );
  joint.rotation.yD = THREE.MathUtils.lerp(
    joint.rotation.yD || 0,
    degrees.x,
    0.1
  );
  joint.rotation.x = THREE.MathUtils.degToRad(joint.rotation.xD);
  joint.rotation.y = THREE.MathUtils.degToRad(joint.rotation.yD);
}
