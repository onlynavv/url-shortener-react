import React,{useState} from 'react'
import "./ResetPassword.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const history = useHistory()
    const {id, token} = useParams()

    const [handlePassword,setHandlePassword] = useState({password:''})
    const [handleError, setHandleError] = useState("")
    const [handleSucess, setHandleSucess] = useState("")

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setHandlePassword({...handlePassword, [name]:value})
    }

    const handleLogin = async() => {
        const url = `https://url-shortener-api-task.herokuapp.com/reset-password/${id}/${token}`
        try{
            const resp = await fetch(url, {
            method:'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(handlePassword)
                })

        const data = await resp.json()

        if(resp.ok){
            setHandleSucess(data.msg)
            setTimeout(()=>{
                history.push("/login")
            },5000)
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
            <article className="container reset-wrapper">
              <Card className="form-card">
                <CardContent className="form-cardContent">
                    <h3>Reset Password</h3>
                    <form className="form-wrapper">
                        <div className="form-control">
                            <label>Enter Password</label>
                            <TextField className="userInput" label='Password' placeholder='Enter Password' value={handlePassword.password} onChange={handleChange} id="password" name="password" multiline variant="standard" />
                        </div>
                        <div className='form-control status-div'>
                            <p className='error-clr'>{handleError}</p>
                            <p className='success-clr'>{handleSucess}</p>
                        </div>
                        <div className='btn-div'>
                            <Button className="submitBtn" variant="contained" size="medium" onClick={handleLogin}>Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            </article>
        </section>
    )
}

export default ResetPassword
