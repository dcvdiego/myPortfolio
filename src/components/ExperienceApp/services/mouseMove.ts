function onDocumentMouseMove(event) {
  event.preventDefault();

  const mouse = { x: 0, y: 0 };

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

export default onDocumentMouseMove;
