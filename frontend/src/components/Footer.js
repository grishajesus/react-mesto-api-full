const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">© {currentYear} Mesto Russia</p>
    </footer>
  );
};

export default Footer;
