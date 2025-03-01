import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newContent, clearErrors } from '../../actions/contentActions'
import { NEW_CONTENT_RESET } from '../../constants/contentConstants'

const NewContent = ({ history }) => {


    const [typeRole, setTypeRole] = useState('');
    const [chuDe, setChuDe] = useState('');
    const [noiDung, setNoiDung] = useState('');
    const [tenBaiViet, setTenBaiViet] = useState("");
    const [moTaNgan, setMoTaNgan] = useState('');
    const [audio, setAudio] = useState("");
    const [thuTuHienThi, setThuTuHienThi] = useState('');

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    const typeRoles = [
        {
            label: "--- Chọn danh mục ---",
            value: "Chọn"
        },
        {
            label: "Phát triển sự nghiệp",
            value: "HM1"
        },
        {
            label: "Cân bằng cuộc sống",
            value: "HM2"
        }
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, success } = useSelector(state => state.newContent);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/contents');
            // history.push('/admin/content');
            alert.success('Đã thêm bài viết');
            dispatch({ type: NEW_CONTENT_RESET })
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set('typeRole', typeRole);
        formData.set('tenBaiViet', tenBaiViet);
        formData.set('chuDe', chuDe);
        formData.set('moTaNgan', moTaNgan);
        formData.set('noiDung', noiDung);
        formData.set('audio', audio);
        formData.set('thuTuHienThi', thuTuHienThi);
        formData.set('images', images.join("CHIEN"));

        // images.forEach(image => {
        //     formData.append('images', image)
        // })

        dispatch(newContent(formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }

    return (
        <Fragment>
            <MetaData title={'Thêm bài viết mới'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-2">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='application/json'>
                                <h1 className="mb-4">Thêm bài viết mới</h1>

                                <div className="form-group">
                                <label htmlFor="typeRole">Danh mục bài viết</label>
                                <select className="form-control" id="typeRole" value={typeRole} onChange={(e) => setTypeRole(e.target.value)}>
                                    {typeRoles.map(typeRole => (
                                        <option key={typeRole.value} value={typeRole.value} >{typeRole.label}</option>
                                    ))}

                                </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tenBaiViet">Tên bài viết</label>
                                    <input
                                        type="text"
                                        id="tenBaiViet"
                                        className="form-control"
                                        value={tenBaiViet}
                                        onChange={(e) => setTenBaiViet(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="chuDe">Chủ đề</label>
                                    <input
                                        type="text"
                                        id="chuDe"
                                        className="form-control"
                                        value={chuDe}
                                        onChange={(e) => setChuDe(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="moTaNgan">Mô tả ngắn</label>
                                    <textarea className="form-control" id="moTaNgan" rows="3" value={moTaNgan} onChange={(e) => setMoTaNgan(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="noiDung">Nội dung</label>
                                    <textarea className="form-control" id="noiDung" rows="8" value={noiDung} onChange={(e) => setNoiDung(e.target.value)}></textarea>
                                </div>

                               
                                <div className="form-group">
                                    <label htmlFor="audio">Audio</label>
                                    <input
                                        type="text"
                                        id="audio"
                                        className="form-control"
                                        value={audio}
                                        onChange={(e) => setAudio(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="thuTuHienThi">Thứ tự hiển thị</label>
                                    <input
                                        type="text"
                                        id="thuTuHienThi"
                                        className="form-control"
                                        value={thuTuHienThi}
                                        onChange={(e) => setThuTuHienThi(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Hình ảnh</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='content_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Chọn hình
                                        </label>
                                    </div>

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    
                                >
                                    Thêm mới
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewContent
