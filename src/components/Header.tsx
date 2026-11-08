import messages from '../locales/ru.json';

function Header() {
  return (
    <header>
      <p>{messages.app.name}</p>
    </header>
  )
}

export default Header;
