import React,{useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useGlobalContext } from './context';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import "./UrlDashboard.css"

const UrlDashboard = () => {
    const {user} = useGlobalContext()
    const [dayCount, setDayCount] = useState("")
    const [monthCount, setMonthCount] = useState("")
    const history = useHistory()

    const getPerDayCount = async() => {
        const resp = await fetch(`https://url-shortener-api-task.herokuapp.com/urldashboard/${user}`)
        const data = await resp.json()
        setDayCount(data.count)
    }

    const getPerMonthCount = async() => {
        const resp = await fetch(`https://url-shortener-api-task.herokuapp.com/urldashboard/month/${user}`)
        const data = await resp.json()
        setMonthCount(data.count)
    }

    useEffect(()=>{
        getPerDayCount()
    },[])

    useEffect(()=>{
        getPerMonthCount()
    },[])

    return (
        <section>
            <article className="container urlShortener-wrapper">
              <Card className="form-card">
                <CardContent className="form-cardContent">
                    <h3>{user}'s URL's created/day</h3>
                    <p>{dayCount}</p>
                </CardContent>
              </Card>

              <Card className="form-card">
                <CardContent className="form-cardContent">
                    <h3>{user}'s URL's created/month</h3>
                    <p>{monthCount}</p>
                </CardContent>
              </Card>
              <Button className='backBtn' onClick={()=>{history.goBack()}}>Go Back</Button>
            </article>
        </section>
    )
}

export default UrlDashboard
