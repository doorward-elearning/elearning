import React from 'react';
import Home from './Home';
import AboutUs from './AboutUs';
import WhyUs from './WhyUs';
import ContactUs from './ContactUs';
import Footer from './Footer';
import Header from './Header';
import SideNavigation from '../../components/SideNavigation';
import LiveClassrooms from './LiveClassrooms';
import Emails from './Emails';
import Lms from './LMS';
import Setup from './Setup';
import Pricing from './Pricing';

const HomePage: React.FunctionComponent<HomePageProps> = (props): JSX.Element => {
  return (
    <div className="site-wrap">
      <SideNavigation />
      <Header />
      <Home />
      <LiveClassrooms />
      <Emails />
      <Lms />
      <Setup />
      <Pricing />
      <AboutUs />
      <WhyUs />
      <ContactUs />
      <Footer />
    </div>
  );
};

export interface HomePageProps {}

export default HomePage;
