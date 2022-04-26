import { browserState } from './store';

export function isValidHttpUrl(string: string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

export function formatMyDate(value: string, locale = 'en-GB') {
  return new Date(value).toLocaleDateString(locale);
}

export function detectWebGLContext() {
  // Create canvas element. The canvas is not added to the
  // document itself, so it is never displayed in the
  // browser window.
  var canvas = document.createElement('canvas');
  // Get WebGLRenderingContext from canvas element.
  var gl =
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  // Report the result.
  if (gl && gl instanceof WebGLRenderingContext) {
    browserState.canRun = true;
  } else {
    browserState.canRun = false;
    window.localStorage.setItem('readerMode', 'true');
    window.sessionStorage.setItem('bannerConsent', 'true');
  }
}

export function isImage(url: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
export function isVideo(url: string) {
  return /\.(mp4|webm|ogg)$/.test(url);
}
