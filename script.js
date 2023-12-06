const draggableElements = document.getElementsByClassName("draggable");

for (let i = 0; i < draggableElements.length; i++) {
  draggableElements[i].style.position = "relative";
}

const playerObjects = document.getElementsByClassName("player-object");
const answerObjects = document.getElementsByClassName("answer-object");

const playerArray = Array.from(playerObjects)
const answerArray = Array.from(answerObjects)

function filter(e) {
  let target = e.target;

  if (!target.classList.contains("draggable")) {
    return;
  }

  target.moving = true;

  // Check if Mouse events exist on users' device
  if (e.clientX) {
    target.oldX = e.clientX; // If they exist then use Mouse input
    target.oldY = e.clientY;
  } else {
    target.oldX = e.touches[0].clientX; // Otherwise use touch input
    target.oldY = e.touches[0].clientY;
  }
  // Since there can be multiple touches, you need to mention which touch to look for, we are using the first touch only in this case

  target.oldLeft = window.getComputedStyle(target).getPropertyValue('left').split('px')[0] * 1;
  target.oldTop = window.getComputedStyle(target).getPropertyValue('top').split('px')[0] * 1;

  document.onmousemove = drag;
  document.ontouchmove = drag;

  function drag(event) {
    event.preventDefault();

    if (!target.moving) {
      return;
    }

    if (event.clientX) {
      target.distX = event.clientX - target.oldX;
      target.distY = event.clientY - target.oldY;
    } else {
      target.distX = event.touches[0].clientX - target.oldX;
      target.distY = event.touches[0].clientY - target.oldY;
    }

    target.style.left = target.oldLeft + target.distX + "px";
    target.style.top = target.oldTop + target.distY + "px";
  }

  function endDrag() {
    target.moving = false;
  }

  target.onmouseup = endDrag;
  target.ontouchend = endDrag;
}

document.onmousedown = filter;
document.ontouchstart = filter;