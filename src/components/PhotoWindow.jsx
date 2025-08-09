/**
 * PhotoWindow component
 * 
 * @param {string} img - The image source path (usually imported).
 * @param {string} imgWidth - Tailwind width class (e.g., `"w-[50%]"`, `"w-64"`). 
 *                            Pass the full class string, not just the value.
 * @param {string} imgHeight - Tailwind height class (e.g., `"h-[50%]"`, `"h-64"`).
 * @param {string} alt - Accessible alt text describing the image.
 * 
 * @example
 * // Example usage:
 * <PhotoWindow
 *   img={banner}
 *   imgWidth="w-[50%]"
 *   imgHeight="h-[50%]"
 *   alt="Group photo of Try/CATCH 2024 attendees"
 * />
 */
function PhotoWindow({ img, imgWidth, imgHeight, alt }) {
    return (
        <div>
            <img src={img} alt={alt} className={`${imgWidth} ${imgHeight} object-cover`} />
        </div>
    );
}

export default PhotoWindow;