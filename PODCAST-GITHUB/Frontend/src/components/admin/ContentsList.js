import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminContents, deleteContent, clearErrors } from '../../actions/contentActions'
import { DELETE_CONTENT_RESET } from '../../constants/contentConstants'

const ContentsList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, contents } = useSelector(state => state.contents);
    const { error: deleteError, isDeleted } = useSelector(state => state.content)
    const [idDelete, setIdDelete] = useState("")

    useEffect(() => {
    dispatch(getAdminContents());
    }, [])

    useEffect(() => {
        
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Đã xóa bài viết');
            history.push('/admin/contents');
            dispatch({ type: DELETE_CONTENT_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const handleIdDelete = (id) => {
        setIdDelete(id);
     }

     const deleteContentHandler = (id) => {     
        dispatch(deleteContent(id));
        window.location.reload();
    }

    const setContents = () => {
                
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Danh mục',
                    field: 'typeRole',
                    sort: 'asc'
                },                
                {
                    label: 'Chủ đề',
                    field: 'chuDe',
                    sort: 'asc'
                },
                {
                    label: 'Tên',
                    field: 'tenBaiViet',
                    sort: 'asc'
                },
                {
                    label: 'Mô tả ngắn',
                    field: 'moTaNgan',
                    sort: 'asc'
                },
                {
                    label: 'Nội dung',
                    field: 'noiDung',
                    sort: 'asc'
                },
                {
                    label: 'Audio',
                    field: 'audio',
                    sort: 'asc'
                },
                {
                    label: 'Ưu tiên',
                    field: 'thuTuHienThi',
                    sort: 'asc'
                },
                {
                    label: 'Hành động',
                    field: 'actions',
                },
            ],
            rows: []
        }

       
        if(contents && contents.length > 0){
            contents.forEach(content => {
                data.rows.push({
                    id: content.id,
                    typeRole: content.typeRole,
                    chuDe: content.chuDe,
                    tenBaiViet: content.tenBaiViet,
                    moTaNgan: content.moTaNgan,
                    noiDung: content.noiDung,
                    audio: content.audio,
                    thuTuHienThi: content.thuTuHienThi,
                    actions: <Fragment>
                        <Link to={`/admin/content/${content.id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button onClick={() => handleIdDelete(content.id)}  className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target="#exampleModal" >
                            <i className="fa fa-trash"></i>
                        </button>
                        {/* model delete */}
                        <div>
                            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">XÓA BÀI VIẾT</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            Xóa vĩnh viễn bài viết?
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                            <button type="button" className="btn btn-danger" onClick={() => deleteContentHandler(idDelete)} data-dismiss="modal">Xóa</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                })
            })
        } 
        
      

        return data;
    }

    

    
    return (
        <Fragment>
            <MetaData title={'Tất cả bài viết'} />

            <div className="row">
                <div className="col-12 col-md-2">
                    
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Tất cả bài viết</h1>
                        <Link to='/admin/content'><button type="button" className="btn btn-primary">Thêm bài viết mới</button></Link>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setContents()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ContentsList
