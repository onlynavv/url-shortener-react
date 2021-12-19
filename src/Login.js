import React,{useState} from 'react'
import "./Login.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import './Login.css'
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from './context';

const Login = () => {
    const history = useHistory()

    const {setUser,setToken} = useGlobalContext()

    const [singleUser,setSingleUser] = useState({username:'',password:''})
    const [handleError, setHandleError] = useState("")

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSingleUser({...singleUser, [name]:value})
    }

    const handleLogin = async() => {
        try{
            const resp = await fetch('https://url-shortener-api-task.herokuapp.com/login', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(singleUser)
                })

        const data = await resp.json()
        setUser(data.username)
        setToken(data.token)

        if(resp.ok){
            history.push("/")
        }else{
            throw new Error(data.msg)
        }

        }

        catch(error){
            setHandleError(error.toString())
        }
        
    }

    return (
        <section>
            <article className="container login-wrapper">
              <Card className="form-card">
                <CardContent className="form-cardContent">
                    <h3>Login</h3>
                    <form className="form-wrapper">
                        <div className="form-control">
                            <label>Enter Username</label>
                            {/* <input type="email" placeholder="enter your email address" value={singleUser.username} onChange={handleChange} id="username" name="username"></input> */}
                            <TextField className="userInput" label='User Name' placeholder='Enter User Name' id="username" name="username" value={singleUser.username} onChange={handleChange} multiline variant="standard" />

                        </div>
                        <div className="form-control">
                            <label>Enter Password</label>
                            {/* <input type="password" placeholder="enter your password" value={singleUser.password} onChange={handleChange} id="password" name="password"></input> */}
                            <TextField className="userInput" label='Password' placeholder='Enter Password' value={singleUser.password} onChange={handleChange} id="password" name="password" multiline variant="standard" />
                        </div>
                        <div className='form-control error-div'>
                            <p>{handleError}</p>
                        </div>
                        <div className='btn-div'>
                            <Button className="submitBtn" variant="contained" size="medium" onClick={handleLogin}>login</Button>
                            <Link to="/forgot">FORGOT PASSWORD?</Link>
                            <Link to="/register">Didn't have account? Create here</Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
            </article>
        </section>
    )
}

export default Login
