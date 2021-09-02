import Head from 'next/head'
import { SearchGlass } from '../src/Icons'
import styled from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Home() {


    return (
        <Page>
            <Widgets>

            </Widgets>
            <Main>
                <Header>New Tab <span style={{color: "rgba(255, 255, 255, 0.3)", fontWeight: 400}}>- h.cnrad.dev</span></Header>
                <Search>
                    <SearchInput placeholder="Search or enter address" onChange={(e) => {e.target.value}}/>
                </Search>

                <PinnedSites>
                    <Site />
                    <Site />
                    <Site />
                    <Site />
                    <Site />
                    <Site />
                    <Site />
                    <Site />
                </PinnedSites>
            </Main>

            <Background />
        </Page>
        
    )
}

const Page = styled.div`
    background: #000;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

const Widgets = styled.div`
    width: 50%;
    height: 100%;
`

const Main = styled.div`
    width: 50%;
    height: 100%;

    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
`

const Header = styled.h1`
    font-size: 2.25rem;
    font-family: "Poppins";
    font-weight: 600;
    color: #fff;
`

const Search = styled.div`
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

const PinnedSites = styled.div`
    padding: 48px 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
`

const Site = styled.div`
    width: 75px;
    height: 75px;
    background: #555;
    border-radius: 10px;
`

const Background = styled(motion.img)`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;

    background: #2B2A33;
    opacity: 1;
    z-index: -10;
`

// background-image: url("https://source.unsplash.com/random/1920x1080/?sunset");
// background-size: cover;