import React from 'react';
import Home from './Home';
import IndividualTrainers from './IndividualTrainers';
import Corporate from './Corporate';
import AboutUs from './AboutUs';
import WhyUs from './WhyUs';
import ContactUs from './ContactUs';
import Footer from './Footer';
import Header from './Header';
import SideNavigation from '../../components/SideNavigation';

const HomePage: React.FunctionComponent<HomePageProps> = (props): JSX.Element => {
  return (
    <div className="site-wrap">
      <SideNavigation />
      <Header />
      <Home />
      <IndividualTrainers />
      <Corporate />
      <AboutUs />
      <WhyUs />
      <ContactUs />
      <Footer />
    </div>
  );
};

export interface HomePageProps {}

export default HomePage;
