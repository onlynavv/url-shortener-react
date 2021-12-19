import React from 'react'
import { useGlobalContext } from './context'
import "./Home.css"
import { Link } from 'react-router-dom'

const Home = () => {

    const {user} = useGlobalContext()

    return (
        <section className='container home-wrapper'>
            <div>
                <h2>welcome home {user && user.length > 0 ? user : "Guest"} !!!</h2>
            </div>
            <div>
                <Link to="/urlshortener">OPEN URL SHORTENER APP</Link>
            </div>
        </section>
    )
}

export default Home
