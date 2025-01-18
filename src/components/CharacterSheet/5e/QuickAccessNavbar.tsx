import { capitalize } from "../../../scripts/tools/stringUtils";

interface Props {
  selectedTab: number
  setPage: (page: number) => void
}


export default function QuickAccessNavbar({ selectedTab, setPage }: Props) {
  const pages = [
    'main',
    'skills',
    'talents',
    'inventory',
    'actions',
    'spells',
    'notes',
    'companions',
    // 'variables'
  ];


  return (
    <div className="quick-access-navbar">
      {pages.map((page, i) => {
        return (
          <button
            className={`quick-access-navbar__tab ${selectedTab === i ? 'quick-access-navbar__tab--selected' : ''}`}
            onClick={() => setPage(i)}
            key={i}
          >
            { capitalize(page) }
          </button>
        );
      })}
    </div>
  );
}
