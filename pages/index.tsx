import Head from 'next/head'
import { SearchGlass } from '../src/Icons'
import styled from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import getWeather from "../src/utils/getWeather";

interface Parameters {
    title?: string;
    pinned?: string;
    background?: string;
}

interface BookmarkObj {
    url: string;
    image: string;
    name: string;
}

const loadingWeatherObj = {
    "coord": {
        "lon": null,
        "lat": null
    },
    "weather": [
        {
            "id": null,
            "main": "Loading...",
            "description": "Loading...",
            "icon": "50d"
        }
    ],
    "base": null,
    "main": {
        "temp": 0,
        "feels_like": 0,
        "temp_min": null,
        "temp_max": null,
        "pressure": null,
        "humidity": null
    },
    "visibility": null,
    "wind": {
        "speed": null,
        "deg": null
    },
    "clouds": {
        "all": null
    },
    "dt": null,
    "sys": {
        "type": null,
        "id": null,
        "country": null,
        "sunrise": null,
        "sunset": null
    },
    "timezone": null,
    "id": null,
    "name": "Loading...",
    "cod": null
}

const mainVariants = {
    init: {
        opacity: 0
    },
    load: {
        opacity: 1,
        transition: {
            duration: 0.1,
            ease: "easeInOut",
            staggerChildren: 0.15
        }
    }
}

const mainChildVariants = {
    init: {
        opacity: 0,
        scale: 0.95
    },
    load: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0, 0.65, 0.8, 1]
        }
    }
}

export default function Home() {

    const router = useRouter();
    let params: Parameters = router.query;

    let [pinnedLinks, setPinnedLinks] = useState([{
        "name": "This Repo",
        "url": "https://github.com/cnrad/h.cnrad.dev",
        "image": "https://www.macobserver.com/wp-content/uploads/2019/05/workfeatured-GitHub-2.png"
    }]);
    
    let [title, setTitle] = useState("New Tab");
    let [background, setBackground] = useState("none");
    let [userIp, setUserIp] = useState("IP not found");
    let [weatherObj, setWeatherObj] = useState(loadingWeatherObj);

    useEffect(() => {
        const fetchStuff = async () => {
            if (!params.pinned) return;
            
            let fetchPinned = await axios.get(params.pinned) as any;

            const pinnedJson = fetchPinned.data as BookmarkObj[];
            setPinnedLinks(pinnedJson);

            let currentWeather = await getWeather();
            setWeatherObj(currentWeather);
        };
 
        fetchStuff();

        if(params.title) setTitle(params.title);
        if(params.background) setBackground(params.background);

    }, [router.isReady])

    return (
        <>
            <Head>
                <title>{title} - h.cnrad.dev</title>
            </Head>
            <Page>
                <Widgets>
                    <WeatherWidget>
                        <WeatherIcon src={`http://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`} />
                        <div style={{display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center"}}>
                            <Temp>{Math.floor(weatherObj.main.temp)}ºF</Temp>
                            <WeatherDescription>{weatherObj.weather[0].main}<span style={{color: "rgba(255, 255, 255, 0.6)", fontWeight: 400}}> - {weatherObj.weather[0].description}</span></WeatherDescription>
                        </div>
                    </WeatherWidget>
                </Widgets>
                <Main initial="init" animate="load" variants={mainVariants}>
                    <Header variants={mainChildVariants}>{title} <span style={{color: "rgba(255, 255, 255, 0.3)", fontWeight: 400}}>- h.cnrad.dev</span></Header>
                    <Search variants={mainChildVariants}>
                        <SearchInput placeholder="Search or enter address" onChange={(e) => {e.target.value}} onKeyDown={event => {if (event.key === 'Enter') return router.push(`https://search.balls.workers.dev/?q=${(event.target as HTMLInputElement).value}`)}}/>
                    </Search>

                    <PinnedSites variants={mainChildVariants}>

                        {pinnedLinks.map((linkObj: BookmarkObj) => {
                            return (
                                <Site href={linkObj.url} key={linkObj.url}>
                                    <SiteIcon image={linkObj.image}/>
                                    <SiteName>{linkObj.name}</SiteName>
                                </Site>
                            )
                        })}

                    </PinnedSites>
                </Main>

                <Background bgParam={background}/>
            </Page>
        </>
    )
}

const Background = styled(motion.div)<{bgParam: string}>`
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;

    background: ${({bgParam}) => bgParam === "none" ? "#2B2A33" : (bgParam.startsWith("http") ? `url(${bgParam})` : bgParam)};
    background-size: cover;
    background-position: 50% 50%;
    ${({bgParam}) => bgParam.startsWith("http") ? `filter: brightness(30%);` : ``};

    outline: none;
    border: none;
    opacity: 1;
    z-index: -10;
`

const Page = styled.div`
    background: #000;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

const Widgets = styled.div`
    width: 50%;
    height: 100%;
    margin: 3rem;

    display: flex;
    align-items: end;
    justify-content: center;
    flex-direction: column;
`

const Main = styled(motion.div)`
    width: 50%;
    height: 100%;
    margin: 3rem;

    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
`

const Header = styled(motion.h1)`
    font-size: 2.25rem;
    font-family: "Poppins";
    font-weight: 600;
    color: #fff;
`

const Search = styled(motion.div)`
    width: 70%;
    min-height: 52px;
    background: #38383D url(/search-glass.svg) 16px center no-repeat;
    border-radius: 7px;

    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: row;
    transition: all 0.15s ease-in-out;

    box-shadow: 0 2px 6px rgba(28, 27, 34, 0.5);
`

const SearchInput = styled.input`
    background: transparent;
    height: 100%;
    width: 100%;
    font-size: 1rem;
    font-family: "Poppins";
    font-weight: 400;
    color: #b1b1bd;
    outline: none;
    border: none;
    margin-left: 55px;
`

const PinnedSites = styled(motion.div)`
    padding: 48px 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
`

const Site = styled.a`
    width: 100px;
    height: 125px;
    background: rgba(0, 0, 0, 0);
    border-radius: 10px;
    transition: all 0.15s ease-in-out;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    &:hover {
        background: #3B3A43;
    }
`

const SiteIcon = styled.div<{image: string}>`
    margin-top: 13px;
    margin-bottom: 7px;
    width: 75px;
    height: 75px;
    border-radius: 10px;

    background: url(${({ image }) => image});
    background-size: cover;
    background-position: 50% 50%;
`

const SiteName = styled.div`
    font-size: 0.75rem;
    color: #fff;
    width: 80px;
    max-height: 2rem;
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
`

const WeatherWidget = styled.div`
    width: 25rem;
    height: 10rem;
    
    background: linear-gradient(#7dc7ff, #3e67ed);
    border-radius: 1.5rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #fff;
`
const Temp = styled.div`
    color: #fff;
    font-size: 2rem;
    font-weight: 600;
`

const WeatherDescription = styled.div`
    color: #fff;
    font-size: 1.25rem;
    font-weight: 500;
`

const WeatherIcon = styled.img`
    width: 125px;
    height: 125px;
    filter: drop-shadow(0 0 5px #fff)
`