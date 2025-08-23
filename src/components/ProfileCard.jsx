function ProfileCard({img, alt, name, role, blurb}){
    return(
        <div>
            <img src={img} alt={alt}/>
            <p>{name}</p>
            <p>{role}</p>
            <p>{blurb}</p>
        </div>
    )
}

export default ProfileCard;