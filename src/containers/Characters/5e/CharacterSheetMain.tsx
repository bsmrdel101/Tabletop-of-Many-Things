import MainHeader from "@/components/Characters/5e/MainHeader"

interface Props {
  character: Character_5e
}


export default function CharacterSheetMain({ character }: Props) {
  return (
    <section className="character-sheet-main">
      <MainHeader character={character} />
    </section>
  )
};
