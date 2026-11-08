import messages from '../locales/ru.json';

function Sidebar() {
  return (
    <aside>
      <nav>
        <ul>
          <li>{messages.navigation.route}</li>
          <li>{messages.navigation.ideas}</li>
          <li>{messages.navigation.documents}</li>
          <li>{messages.navigation.preparation}</li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar;
