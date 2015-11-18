export default function imagePath(image) {
  if (typeof window !== 'undefined' && window.appData) return window.appData.images[image]
}
