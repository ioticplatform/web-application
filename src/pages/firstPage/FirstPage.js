import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Market from "./Market";
import {useTranslation} from "react-i18next";

export default function FirstPage() {
    const [t] = useTranslation('common');

    const sections = [
        { title: t('sections.SmartHome', {framework:'React'}), url: '#' },
        { title: t('sections.SmartFarming', {framework:'React'}), url: '#' },
        { title: t('sections.LowCosts', {framework:'React'}), url: '#' },
        { title: t('sections.OpenSource', {framework:'React'}), url: '#' }
    ];

    const mainFeaturedPost = {
        title: t('mainFeaturedPost.title', {framework:'React'}),
        description: t('mainFeaturedPost.description', {framework:'React'}),
        image: 'featured_article.jpg',
        imgText: 'main image description',
    };

    const featuredPosts = [
        {
            title: t('featuredPost.title1', {framework:'React'}),
            date: 'Apr 14',
            description:t('featuredPost.description1', {framework:'React'}),
            image: 'how_it_started.jpg',
            url: "http://localhost:3000/howItStarted"
        },
        {
            title: t('featuredPost.title2', {framework:'React'}),
            date: 'Apr 17',
            description:t('featuredPost.description2', {framework:'React'}),
            image: 'diy.jpg',
            url: "http://localhost:3000/diy"
        },
    ];

    const sidebar = {
        title: t('about.about', {framework:'React'}),
        description: t('about.description', {framework:'React'}),
        social: [
            { name: 'GitHub', icon: GitHubIcon , link: "https://github.com/teiavava/server"},
            { name: 'Instagram', icon: InstagramIcon , link: "http://instagram.com"},
            { name: 'Facebook', icon: FacebookIcon, link: "http://facebook.com" },
        ],
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header sections={sections} />
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid>
                    <Grid container spacing={2} className="mainGrid">
                        <Main/>
                        <Grid item xs={12} md={4}>
                            <Market store="android" url='https://play.google.com/store/apps'/>
                            <Market store="ios" url='https://www.apple.com/app-store/'/>
                        </Grid>
                        <Sidebar
                            title={sidebar.title}
                            description={sidebar.description}
                            social={sidebar.social}
                        />
                    </Grid>
                </main>
            </Container>
            <Footer style={{position: "static"}} description={t('welcome.thankYou', {framework:'React'})} />
            <div style={{height: "200px"}}></div>
        </React.Fragment>
    );
}