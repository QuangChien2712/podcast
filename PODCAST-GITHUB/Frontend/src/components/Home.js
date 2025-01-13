import React, { Fragment, useEffect } from 'react'
import 'rc-slider/assets/index.css';
import MetaData from './layout/MetaData';
import Sliderr from '../components/layout/Slider'


const Home = ({ match }) => {    

    useEffect(() => {
        
    }, [])

   
    return (       
        <Fragment>
            <MetaData title="Trang chủ" />
            <Sliderr />
            <br />
        </Fragment>
    )
}

export default Home
