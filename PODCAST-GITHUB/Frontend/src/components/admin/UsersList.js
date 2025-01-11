import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, clearErrors } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'
import { deleteUser } from '../../actions/userActions'

const UsersList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)
    const [idDelete, setIdDelete] = useState("")

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('User deleted successfully');
            history.push('/admin/users');
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, alert, error, isDeleted, history])

    const handleIdDelete = (id) => {
        setIdDelete(id);
     }

     const deleteUserHandler = (id) => {     
             dispatch(deleteUser(id))
         }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },                
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Tên người dùng',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Quyền',
                    field: 'typeRole',
                    sort: 'asc'
                },
                {
                    label: 'Số điện thoại',
                    field: 'phoneNumber',
                    sort: 'asc'
                },
                {
                    label: 'Đã đặt lịch',
                    field: 'isSchedule',
                    sort: 'asc'
                },
                {
                    label: 'Hành động',
                    field: 'actions',
                },
            ],
            rows: []
        }

        users.forEach(userr => {
            
            data.rows.push({
                id: userr.id,
                email: userr.email,
                name: userr.name,
                typeRole: userr.typeRole,
                phoneNumber: userr.phoneNumber,
                isSchedule: userr.isSchedule,
                actions: <Fragment>
                    &emsp;
                    <Link to={`/admin/user/${userr.id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>&emsp;                  
                    <button onClick={() => handleIdDelete(userr.id)}  className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target="#exampleModal" >
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
                                        <button type="button" className="btn btn-danger" onClick={() => deleteUserHandler(idDelete)} data-dismiss="modal">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Users'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Tất cả người dùng</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setUsers()}
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

export default UsersList
