import { useEffect, useState } from 'react';

import { navigation as messages } from '../locales/ru.json';

import '../styles/Sidebar.css';

const routeIcon =
  'M12.5 4.16667L7.5 2.5L2.5 4.16667V17.5L7.5 15.8333M7.5 2.5V15.8333M7.5 15.8333L12.5 17.5L17.5 15.8333V2.5L12.5 4.16667M12.5 4.16667V17.5';

const ideasIcon =
  'M7.5 15H12.5M8.33334 17.5H11.6667M6.66667 11.6667C2.5 7.5 5.83334 2.5 10 2.5C14.1667 2.5 17.5 7.5 13.3333 11.6667L12.5 13.3333H7.5L6.66667 11.6667Z';

const documentsIcon =
  'M15.8333 6.66667L11.6667 2.5H5.00001H4.16667V17.5H15.8333V6.66667ZM11.6667 2.5V6.66667H15.8333M6.66667 10H13.3333M6.66667 13.3333H11.6667';

const preparationIcon =
  'M12.5 3.33333V2.5H7.50001V3.33333M12.5 3.33333V5H7.50001V3.33333M12.5 3.33333H15.8333V17.5H4.16667V3.33333H7.50001M6.66667 10L8.33334 11.6667L13.3333 8.33333M6.66667 15H13.3333';

const participantsIcon =
  'M3.33333 16.6667V14.1667C3.33333 10.8334 11.6667 10.8334 11.6667 14.1667V16.6667M13.3333 3.33337C17.5 3.33337 17.5 8.33337 14.1667 8.33337M14.1667 11.6667C17.5 11.6667 18.3333 13.3334 18.3333 16.6667M4.99999 5.83337C4.99999 5.17033 5.26339 4.53445 5.73223 4.06561C6.20107 3.59677 6.83695 3.33337 7.49999 3.33337C8.16304 3.33337 8.79892 3.59677 9.26776 4.06561C9.7366 4.53445 9.99999 5.17033 9.99999 5.83337C9.99999 6.49642 9.7366 7.1323 9.26776 7.60114C8.79892 8.06998 8.16304 8.33337 7.49999 8.33337C6.83695 8.33337 6.20107 8.06998 5.73223 7.60114C5.26339 7.1323 4.99999 6.49642 4.99999 5.83337Z';

const settingsIcon =
  'M7.5 2.5H12.5L13.3333 5L15.8333 5.83333L18.3333 8.33333L16.6667 10.8333V14.1667L13.3333 15.8333L12.5 18.3333H7.5L6.66667 15.8333L3.33334 14.1667V10.8333L1.66667 8.33333L4.16667 5.83333L6.66667 5L7.5 2.5ZM6.66667 10C6.66667 9.11594 7.01786 8.2681 7.64298 7.64298C8.2681 7.01786 9.11595 6.66667 10 6.66667C10.8841 6.66667 11.7319 7.01786 12.357 7.64298C12.9821 8.2681 13.3333 9.11594 13.3333 10C13.3333 10.8841 12.9821 11.7319 12.357 12.357C11.7319 12.9821 10.8841 13.3333 10 13.3333C9.11595 13.3333 8.2681 12.9821 7.64298 12.357C7.01786 11.7319 6.66667 10.8841 6.66667 10Z';

type SidebarItem = {
  href: string;
  label: string;
  icon: string;
};

const mainItems: SidebarItem[] = [
  { href: '#route', label: messages.route, icon: routeIcon },
  { href: '#ideas', label: messages.ideas, icon: ideasIcon },
  { href: '#documents', label: messages.documents, icon: documentsIcon },
  { href: '#preparation', label: messages.preparation, icon: preparationIcon },
];

const bottomItems: SidebarItem[] = [
  { href: '#participants', label: messages.participants, icon: participantsIcon },
  { href: '#settings', label: messages.settings, icon: settingsIcon },
];

function Sidebar() {
  const [activeHash, setActiveHash] = useState(
    () => window.location.hash || '#route'
  );
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleLabel = isCollapsed
    ? messages.expandMenu
    : messages.collapseMenu;

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#route');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderLink = ({ href, label, icon }: SidebarItem) => (
    <li key={href}>
      <a
        className="sidebar__link"
        href={href}
        aria-current={activeHash === href ? 'location' : undefined}
        aria-label={isCollapsed ? label : undefined}
        title={isCollapsed ? label : undefined}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d={icon} />
        </svg>

        {!isCollapsed && <span>{label}</span>}
      </a>
    </li>
  );

  return (
    <aside className={isCollapsed ? 'sidebar sidebar--collapsed' : 'sidebar'}>
      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {mainItems.map(renderLink)}
        </ul>

        <ul className="sidebar__list sidebar__bottom-list">
          {bottomItems.map(renderLink)}
        </ul>
      </nav>

      <button
        type="button"
        className="sidebar__link sidebar__toggle"
        aria-expanded={!isCollapsed}
        aria-label={toggleLabel}
        title={isCollapsed ? toggleLabel : undefined}
        onClick={() => setIsCollapsed((previous) => !previous)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path className="sidebar__chevron-top" d="M12.5 5L7.5 10" />
          <path className="sidebar__chevron-bottom" d="M7.5 10L12.5 15" />
        </svg>

        {!isCollapsed && <span>{toggleLabel}</span>}
      </button>
    </aside>
  );
}

export default Sidebar;
