import styles from "./SponsorCard.module.css"

function SponsorCard({name, logo, alt, tier, blurb}){
    return(
        <div>
            <img src={logo} alt={alt} />

            <h2 className={`${styles.name}`}>
                {name}
            </h2>
            <p className={`${styles.tier} mb-[1rem]`}>
                {tier}
            </p>

            <p className={`whitespace-pre-line`}>
                {blurb}
            </p>
        </div>
    )
}

export default SponsorCard;