import { useFormik } from 'formik';
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router';
import { api } from '../axios';
import toast from 'react-hot-toast';
import { createUser } from '../Redux/userSlice';


function Signup() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: { 
            name : '',
            username: "",
            email: '',
            password: '',
            confirm_password: ''
         },
        onSubmit: async values => {
            const { data } = await api.post("/users/signup", values)
            localStorage.setItem("access_token", data.token);
            toast.success("Signup successful!");
            dispatch(createUser(data.user));
            navigate("/Home")
        },
    });

    return (
       <div className='d-flex justify-content-center mt-4'>
          <form className='w-50 d-flex flex-column gap-2' onSubmit={formik.handleSubmit}>
            <input type="text" name="name" placeholder='Enter name' onChange={formik.handleChange} value={formik.values.name}/>
            <input type="text" name="username" placeholder='Enter username' onChange={formik.handleChange} value={formik.values.username}/>
            <input type="email" name="email" placeholder='Enter email' onChange={formik.handleChange} value={formik.values.email}/>
            <input type="password" name="password" placeholder='Enter password' onChange={formik.handleChange} value={formik.values.password}/>
            <input type="password" name='confirm_password' placeholder='confirm your password' onChange={formik.handleChange} value={formik.values.confirm_password} />
            <button className='btn btn-success w-100' type="submit">Signup</button>
          </form>
       </div>
    );
}

export default Signup;

