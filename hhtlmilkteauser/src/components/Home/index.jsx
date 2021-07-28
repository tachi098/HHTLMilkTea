import React from "react"
import Content from "./Content"
import Slide from "./Slider"

const Home = () => {
    return (
        <React.Fragment>
            <Slide />
            <div style={{marginTop: 30 + 'px'}}>
                <Content />
            </div>
        </React.Fragment>
    )
}

export default Home