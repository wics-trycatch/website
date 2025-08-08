import PhotoWindow from "../components/PhotoWindow";

import banner from "../assets/images/Home/banner.png"

function Home(){
    return(
        <div>
            {/* Hero section */}
            <div>
                <PhotoWindow img={banner} alt="Group photo of Try/CATCH 2024 attendees at the SFU ASB Atrium" />
            </div>
        </div>
    )
}

export default Home;