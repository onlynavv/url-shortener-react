import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./UrlList.css"
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from './context';

const UrlList = () => {

    const [urlList, setUrlList] = useState([])
    const {user} = useGlobalContext()

    const history = useHistory()

    const getUrlsList = async() => {
        const resp = await fetch(`https://url-shortener-api-task.herokuapp.com/urlshortener/urls/${user}`)
        const data = await resp.json()
        setUrlList(data)
    }

    useEffect(()=>{
         getUrlsList()
    },[])


    return (
        <section>
            <article className="container table-wrapper">
              <Card className="table-card">
                <CardContent className="table-cardContent">
                    <table>
                        <thead>
                            <tr>
                                <th>List of Created URL's</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urlList.map((item)=>{
                                const {_id,shortUrl} = item
                                const link = `https://url-shortener-api-task.herokuapp.com/urlshortener/${shortUrl}`
                                return(
                                    <tr key={_id}>
                                        <td><a href={link} target="_blank" rel="noreferrer">{link}</a></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Button className='backBtn' onClick={()=>{history.goBack()}}>Go Back</Button>
                </CardContent>
            </Card>
            </article>
        </section>
    )
}

export default UrlList
