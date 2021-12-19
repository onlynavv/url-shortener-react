import React,{useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./UrlShortener.css"
import { Link } from 'react-router-dom';
import { useGlobalContext } from './context';

const UrlShortener = () => {

    const [inputUrl,setInputUrl] = useState({inputurl:''})
    const [handleError, setHandleError] = useState("")
    const [handleSucess, setHandleSucess] = useState("")
    const {user,token} = useGlobalContext()

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputUrl({...inputUrl, [name]:value})
    }

    const handleLogin = async() => {
        try{
            const resp = await fetch('https://url-shortener-api-task.herokuapp.com/urlshortener/create', {
            method:'POST',
            headers: { "Content-Type": "application/json", "X-Auth-Token":token},
            body: JSON.stringify({...inputUrl,user})
                })

        const data = await resp.json()

        if(resp.ok){
            setHandleSucess(data.msg)
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
            <article className="container urlShortener-wrapper">
              <Card className="form-card">
                <CardContent className="form-cardContent">
                    <h3>URL SHORTENER</h3>
                    <form className="form-wrapper">
                        <div className="form-control">
                            <label>Enter Long URL link</label>
                            <TextField className="userInput" label='Long URL' placeholder='Enter URL' id="inputurl" name="inputurl" value={inputUrl.inputurl} onChange={handleChange} multiline variant="standard" />
                        </div>
                        <div className='form-control status-div'>
                            <p className='error-clr'>{handleError}</p>
                            <p className='success-clr'>{handleSucess}</p>
                        </div>
                        <div className='btn-div'>
                            <Button className="submitBtn" variant="contained" size="medium" onClick={handleLogin}>Submit</Button>
                        </div>
                    </form>
                    <div className='urlBtn-div'>
                        <Link to="/urlslist">View All the URL'S created</Link>
                        <Link to="/urldashboard">URL Dashboard</Link>
                    </div>
                </CardContent>
            </Card>
            </article>
        </section>
    )
}

export default UrlShortener
