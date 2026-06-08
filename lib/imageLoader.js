// Custom next/image loader that serves images directly from Hygraph's CDN,
// bypassing Netlify's image optimizer (which 502s on the legacy Next 11 runtime).
//
// Hygraph delivery URLs look like:
//   https://us-east-1.graphassets.com/<projectId>/<handle>
// Transforms are inserted between the projectId and the handle, e.g.:
//   https://us-east-1.graphassets.com/<projectId>/output=format:webp/resize=width:640,fit:max/<handle>
export default function imageLoader({ src, width }) {
    // only transform Hygraph/graphassets URLs; pass anything else through unchanged
    if (!src.includes('graphassets.com')) {
        return src;
    }

    const lastSlash = src.lastIndexOf('/');
    const base = src.slice(0, lastSlash);
    const handle = src.slice(lastSlash + 1);

    return `${base}/output=format:webp/resize=width:${width},fit:max/${handle}`;
}
