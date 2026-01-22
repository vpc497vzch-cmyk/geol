// Prevent images from being dragged or selected programmatically
if (typeof document !== 'undefined') {
  function disableImageDragAndSelect() {
    try {
      const imgs = document.querySelectorAll('img');
      imgs.forEach(img => {
        try { img.setAttribute('draggable', 'false'); } catch (e) {}
      });
      document.addEventListener('dragstart', (e) => {
        if (e.target && e.target.tagName === 'IMG') e.preventDefault();
      }, { capture: true });
    } catch (e) {
      // ignore
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', disableImageDragAndSelect);
  } else {
    disableImageDragAndSelect();
  }
}

export default {};
