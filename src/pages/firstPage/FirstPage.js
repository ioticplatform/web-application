import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

const sections = [
    { title: 'Smart Home', url: '#' },
    { title: 'Smart Farming', url: '#' },
    { title: 'Low Costs', url: '#' },
    { title: 'OpenSource', url: '#' },
];

const mainFeaturedPost = {
    title: 'Did you ever think how it would be to...',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'featured_article.jpg',
    imgText: 'main image description',
};

const featuredPosts = [
    {
        title: 'How it started?',
        date: 'Apr 14',
        description:
            'We are two computer science students passionate about...',
        image: 'how_it_started.jpg',
    },
    {
        title: 'DIY',
        date: 'Apr 17',
        description:
            'If you want to try building your own system at home...',
        image: 'diy.jpg',
    },
];

const sidebar = {
    title: 'About',
    description:
        'This is an open-source IoT project.',
    social: [
        { name: 'GitHub', icon: GitHubIcon , link: "https://github.com/teiavava/server"},
        { name: 'Instagram', icon: InstagramIcon , link: "http://instagram.com"},
        { name: 'Facebook', icon: FacebookIcon, link: "http://facebook.com" },
    ],
};

export default function FirstPage() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Welcome to IoTIC!" sections={sections} />
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid>
                    <Grid container spacing={2} className={classes.mainGrid}>
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
            <Footer description="Thank you for choosing IoTIC!" />
        </React.Fragment>
    );
}