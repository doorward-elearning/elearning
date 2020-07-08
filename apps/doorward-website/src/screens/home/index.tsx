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
import Corporate from './Corporate';
import K12 from './K12';
import College from './College'

const HomePage: React.FunctionComponent<HomePageProps> = (props): JSX.Element => {
  return (
    <div className="site-wrap">
      <SideNavigation />
      <Header />
      <Home />
      <LiveClassrooms />
      <College />
      <K12 />
      <Corporate />
      <Lms />
      <Emails />
      <Setup />
      <AboutUs />
      <WhyUs />
      <ContactUs />
      <Footer />
    </div>
  );
};

export interface HomePageProps {}

export default HomePage;
