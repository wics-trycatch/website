import styles from "./Home.module.css";

import PhotoWindow from "../components/PhotoWindow";

import banner from "../assets/images/home/banner.png"
import logo from "../assets/images/shared/logo_full.png";

function Home(){
    return(
        <div>
            {/* Hero section */}
            <div className={`relative`}>
                <div className={`absolute z-100 top-[13rem] pl-[2.25rem] pr-[2.5rem]`}>
                    <img src={logo} alt="Try/CATCH Logo" className={`w-[100%]`} />
                    <p className={`${styles.heroDesc} max-w-[18rem] mt-[1rem] ml-[2rem] mr-[1rem]`}>
                        A tech conference for high school girls and non-binary students to learn, connect, and get inspired.
                    </p>
                </div>
                <div className={`scale-90`}>
                    <PhotoWindow img={banner} imgWidth="w-[100%]" imgHeight="h-[92vh]" imgPosition="object-[55%_15%]" windowBorder="border-[8px]" alt="Group photo of Try/CATCH 2024 attendees at the SFU ASB Atrium" />
                </div>
            </div>
        </div>
    )
}

export default Home;