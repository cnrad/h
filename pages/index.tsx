import Head from 'next/head'
import { SearchGlass } from '../src/Icons'
import styled from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

interface Parameters {
    title?: string;
    pinned?: string;
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
    console.log(router.query);

    let [pinnedLinks, setPinnedLinks] = useState(["https://google.com"]);
    let [title, setTitle] = useState("New Tab");

    useEffect(() => {
        if(params.pinned !== undefined) setPinnedLinks((params.pinned as string).split(','));
        if(params.title !== undefined) setTitle(params.title);
        console.log(pinnedLinks);
    }, [router.isReady])

    console.log(params);

    return (
        <>
            <Head>
                <title>{title} - h.cnrad.dev</title>
            </Head>
            <Page>
                <Widgets>

                </Widgets>
                <Main initial="init" animate="load" variants={mainVariants}>
                    <Header variants={mainChildVariants}>{title} <span style={{color: "rgba(255, 255, 255, 0.3)", fontWeight: 400}}>- h.cnrad.dev</span></Header>
                    <Search variants={mainChildVariants}>
                        <SearchInput placeholder="Search or enter address" onChange={(e) => {e.target.value}} onKeyDown={event => {if (event.key === 'Enter') return router.push(`https://search.balls.workers.dev/?q=${(event.target as HTMLInputElement).value}`)}}/>
                    </Search>

                    <PinnedSites variants={mainChildVariants}>

                        {pinnedLinks.map((link) => {
                            if(!link.startsWith("https://") || !link.startsWith("http://")) return (<Site onClick={() => window.open("https://" + link)} image={`http://www.google.com/s2/favicons?domain=${link}`} />)
                            return (<Site onClick={() => window.open(link)} image={`http://www.google.com/s2/favicons?domain=${link}`} />)
                        })}

                    </PinnedSites>
                </Main>

                <Background />
            </Page>
        </>
    )
}

const Background = styled(motion.div)`
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;

    background: #2B2A33;
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
`

const Main = styled(motion.div)`
    width: 50%;
    height: 100%;

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
    width: 60%;
    min-height: 52px;
    background: #38383D url(/search-glass.svg) 16px center no-repeat;
    border-radius: 7px;

    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: row;

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

const Site = styled.div<{image: string}>`
    width: 75px;
    height: 75px;
    background: #3B3A43;
    border-radius: 10px;

    background: url(${({ image }) => image});
    background-size: cover;
`