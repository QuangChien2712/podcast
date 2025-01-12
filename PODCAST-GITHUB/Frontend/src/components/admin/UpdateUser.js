import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'

const UpdateUser = ({ history, match }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [typeRole, setTypeRole] = useState('')
    const [id, setId] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, isUpdated } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails)

    const userId = match.params.id;

    useEffect(() => {

        if (user && String(user.id) !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setEmail(user.email);
            setName(user.name);
            setTypeRole(user.typeRole)
            setId(user.id)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Đã cập nhật người dùng')            
            
            history.push('/admin/users')

            dispatch({
                type: UPDATE_USER_RESET
            })
            
            window.location.reload();
        }

    }, [dispatch, alert, error, history, isUpdated, userId, user])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('typeRole', typeRole);
        formData.set('id', id);

        dispatch(updateUser(formData))
    }


    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Cập nhật người dùng</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Họ và tên</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="typeRole_field">Quyền</label>

                                    <select
                                        id="typeRole_field"
                                        className="form-control"
                                        name='typeRole'
                                        value={typeRole}
                                        onChange={(e) => setTypeRole(e.target.value)}
                                    >
                                        <option value="K">Người dùng</option>
                                        <option value="O">Chủ doanh nghiệp</option>
                                        <option value="A">Quản trị viên</option>
                                        <option value="Block">Khóa tài khoản</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Cập nhật</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateUser
