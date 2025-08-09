/**
 * PhotoWindow component
 *
 * @param {string} img - The image source path (usually imported).
 * @param {string} imgWidth - Tailwind width class (e.g., `"w-[50%]"`, `"w-64"`).
 *                            Pass the full class string, not just the value.
 * @param {string} imgHeight - Tailwind height class (e.g., `"h-[50%]"`, `"h-64"`).
 * @param {string} imgPosition - Tailwind object position class (e.g., `"object-center"`).
 * @param {string} alt - Accessible alt text describing the image.
 *
 * @example
 * // Example usage:
 * <PhotoWindow
 *   img={banner}
 *   imgWidth="w-[50%]"
 *   imgHeight="h-[50%]"
 *   imgPosition="object-center"
 *   alt="Group photo of Try/CATCH 2024 attendees"
 * />
 */
function PhotoWindow({
  img,
  imgWidth = "w-[100%]",
  imgHeight = "h-auto",
  imgPosition = "object-center",
  windowBorder = "border-dark-blue border-[8px]",
  alt,
}) {
  return (
    <div>
      <img
        src={img}
        alt={alt}
        className={`${imgWidth} ${imgHeight} ${imgPosition} ${windowBorder} object-cover`}
      />
    </div>
  );
}

export default PhotoWindow;
