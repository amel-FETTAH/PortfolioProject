import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Competences from './components/Competences';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from "./components/Footer";


export default function App(){
  return (
    <>
      <Navbar />
      <main className="container">
        <section id="home"><Home/></section>
        <section id="about"><About/></section>
        <section id="competences"><Competences/></section>
        <section id="projects"><Projects/></section>
        <section id="experience"><Experience/></section>
        <section id="contact"><Contact/></section>
      </main>
      <footer className="footer">© {new Date().getFullYear()} TonNom — Portfolio</footer>
    </>
  );
}

