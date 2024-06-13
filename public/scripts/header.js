// overlay

document.querySelector(".overlay-machines").style.display = "none";
document.querySelector(".overlay-accessories").style.display = "none";

console.log(document.querySelector('.overlay-accessories').style.display)

function showOverlay(name) {
  const overlay = document.querySelector(`.overlay-${name}`);

  console.log(overlay.style.display);

  if (overlay.style.display === "none") {
    overlay.style.display = "flex";
  } else {
    overlay.style.display = "none";
  }
}
