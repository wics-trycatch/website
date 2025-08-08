function PhotoWindow({ img, alt }) {
    return (
        <div>
            <img src={img} alt={alt} className="w-[100%] object-cover" />
        </div>
    );
}

export default PhotoWindow;