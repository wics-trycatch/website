import styles from "../pages/Home.module.css";
function FolderStatCard({folderImg, alt, text}){
    return(
        <div>
            <img src={folderImg} alt={alt} className={`max-h-[12rem] md:max-h-[16rem]`} />
            <p className={`${styles.statParagraph} text-center`}>{text}</p>
        </div>
    )
}

export default FolderStatCard;