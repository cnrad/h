import Head from 'next/head'
import { SearchGlass } from '../src/Icons'
import styled from 'styled-components';
import axios from 'axios';

export default function Home() {


    return (
        <Main>
            <SearchGlass />
            <Background />
        </Main>
    )
}

const Main = styled.div`
    background: #000;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`

const Background = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;

    background-image: url("https://source.unsplash.com/random/1920x1080/?sunset");
    background-size: cover;
    opacity: 0.5;
`
