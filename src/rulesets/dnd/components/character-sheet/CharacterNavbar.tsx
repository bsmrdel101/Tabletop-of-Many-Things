import Button from "@/components/library/Button";


interface Props {
  selectedTab: string
  tabs: { name: string, index: string }[]
  onChangeTab: (tab: string) => void
}


export default function CharacterNavbar({ selectedTab, tabs, onChangeTab }: Props) {
  return (
    <div className="character-navbar">
      {tabs.map((tab, i) => {
        return (
          <Button
            key={i}
            className={`character-navbar__tab${tab.index === selectedTab ? ' character-navbar__tab--selected' : ''}`}
            onClick={() => onChangeTab(tab.index)}
          >
            { tab.name }
          </Button>
        );
      })}
    </div>
  );
}
