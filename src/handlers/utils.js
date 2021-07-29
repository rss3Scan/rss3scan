/**
 * set title
 * @param {*} title title
 */
export async function titleify(title) {
  document.title = (title ? `${title} | ` : "") + "RSS3Scan";
}
