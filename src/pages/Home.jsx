import styles from "./Home.module.css";

import PhotoWindow from "../components/PhotoWindow";
import Button from "../components/Button";

import banner from "../assets/images/home/banner.png"
import logo from "../assets/images/shared/logo_full.png";

function Home(){
    return(
        <div className={`max-w-[128rem] mx-[auto]`}>
            {/* Hero section */}
            <div className={`relative`}>
                <div className={`absolute z-100 top-[13rem] pl-[2.25rem] pr-[2.5rem] md:pl-[6rem] lg:pl-[8rem] 2xl:pl-[10rem]`}>
                    <img src={logo} alt="Try/CATCH Logo" className={`w-[20rem] md:w-[30rem] 2xl:w-[50rem]`} />
                    <div className={`mt-[1rem] ml-[2rem] mr-[1rem]`}>
                        <p className={`${styles.heroDesc} max-w-[18rem] 2xl:max-w-[40rem]`}>
                            A tech conference for high school girls and non-binary students to learn, connect, and get inspired.
                        </p> 
                        <div className={`mt-[2rem]`}>
                            <Button link="/" text="REGISTER" size="small" fontSize="text-[1.25rem]" />
                        </div>
                    </div>
                </div>
                <div className={`scale-90`}>
                    <PhotoWindow img={banner} imgWidth="w-[100%]" imgHeight="h-[92vh]" imgPosition="object-[55%_15%]" windowBorder="border-[8px]" alt="Group photo of Try/CATCH 2024 attendees at the SFU ASB Atrium" />
                </div>
            </div>
        </div>
    )
}

export default Home;