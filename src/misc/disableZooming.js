// Disable keyboard zoom (Ctrl + +/- or Ctrl + Mouse Wheel)
document.addEventListener("keydown", function (e) {
    if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "0")
    ) {
        e.preventDefault();
    }
});

// Disable zoom on touch devices (pinch-to-zoom)
document.addEventListener(
    "wheel",
    function (e) {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    },
    { passive: false }
);
