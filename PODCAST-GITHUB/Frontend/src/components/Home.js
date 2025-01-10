import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData'
import Content from './content/Content'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getContents } from '../actions/contentActions';

import Sliderr from '../components/layout/Slider'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, contents, error, contentsCount, resPerPage, filteredContentsCount } = useSelector(state => state.contents)

    const keyword = match.params.keyword

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(getContents(keyword, currentPage, price, category, rating));


    }, [dispatch, alert, error, keyword, currentPage, price, category, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = contentsCount;
    if (keyword) {
        count = filteredContentsCount
    }


    return (
        <Fragment>
             {/*<slideCategoryy />*/}
            <Sliderr />
            <br />

        </Fragment>
    )
}

export default Home
