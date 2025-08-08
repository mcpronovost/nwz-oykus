import { useEffect, useState } from "react";

import { useTranslation } from "@/services/translation";
import { OykButton, OykCard, OykGrid, OykHeading } from "@/components/common";

export default function DevQuests() {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState({});

  const getLevel = (xp) => {
    if (xp < 1) return 0;
    if (xp < 1024) return 1;
    return Math.floor(Math.log2(xp)) - 9 + 1;
  }

  const handleQuest1 = () => {
    console.log("Starting Quest 1");
    setIsLoading(true);
    const QuestLevel = 1;
    const QuestXP = 10;
    const SkillLevel = getLevel(character?.skills?.woodcutting || 0);
    const LD = (QuestLevel - SkillLevel);
    const Malus = LD * 0.25;
    const SA = getLevel(character?.attributes?.strength || 0);
    const AT = 12;
    const Bonus = SA / AT;
    const Mastery = Math.max(0, Bonus - Malus);
    const Destiny = 0.05;
    const SR = Math.max(0, Mastery - Destiny);
    console.log(
      "Malus:", Malus,
      "Bonus:", Bonus,
      "Mastery", Mastery
    );
    console.log("Success Rate:", (SR * 100).toFixed(2), "%");
    const success = Math.random() < SR;
    let SkillXP = QuestXP;
    let AttrXP = QuestXP / 12;
    if (success) {
      console.log("Success!");
    } else {
      SkillXP = Math.round(SkillXP / 2);
      AttrXP = Math.round(AttrXP / 2);
      console.log("Failed!");
    }
    setCharacter({
      ...character,
      attributes: {
        ...character.attributes,
        strength: (character.attributes.strength || 0) + AttrXP,
      },
      skills: {
        ...character.skills,
        woodcutting: (character.skills.woodcutting || 0) + SkillXP,
      },
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }

  useEffect(() => {
    setCharacter({
      name: "Pachu'a Wapi Qatlaalawsiq",
      abbr: "PWQ",
      slug: "pachua-wapi-qatlaalawsiq",
      resistances: {
        physical: 2,
        mental: 4,
        spiritual: 4,
      },
      attributes: {
        strength: 1,
        constitution: 1,
        dexterity: 1,
        perception: 2048,
        intelligence: 1024,
        willpower: 1024,
      },
      skills: {},
    });
  }, []);

  if (!character?.name) return null;

  return (
    <section className="oyk-page oyk-dev-quests">
      <OykHeading title={t("Quests")} />
      <OykGrid>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
          <div style={{ flex: "1 1 100%" }}>
            <h2>{character.name}</h2>
          </div>
          <OykCard>
            <h3>Résistances</h3>
            <br />
            <ul>
              {Object.entries(character.resistances).map(([resistance, value]) => (
                <li key={resistance}>{resistance}: {value}</li>
              ))}
            </ul>
          </OykCard>
          <OykCard>
            <h3>Attributs</h3>
            <br />
            <ul>
              {Object.entries(character.attributes).map(([attribute, value]) => (
                <li key={attribute}>{attribute}: {getLevel(value)} ({value} xp)</li>
              ))}
            </ul>
          </OykCard>
          <OykCard>
            <h3>Compétences</h3>
            <br />
            <ul>
              {Object.entries(character.skills).map(([skill, value]) => (
                <li key={skill}>{skill}: {getLevel(value)} ({value} xp)</li>
              ))}
            </ul>
          </OykCard>
        </div>
        <OykCard>
          <h3>Quêtes</h3>
          <br />
          <ul>
            <li><OykButton color="primary" isLoading={isLoading} action={() => handleQuest1()}>Commencer</OykButton> Quête 1: Lvl 1 (strength) [woodcutting] : 1 - {getLevel(character?.skills?.woodcutting || 0)} = {1 - getLevel(character?.skills?.woodcutting || 0)} x 0.25 = <u>{(1 - getLevel(character?.skills?.woodcutting || 0)) * 0.25}</u> : {getLevel(character?.attributes?.strength || 0)} / 12 = <u>{Number((getLevel(character?.attributes?.strength || 0) / 12).toFixed(2))}</u> : {(1 - getLevel(character?.skills?.woodcutting || 0)) * 0.25} - {Number((getLevel(character?.attributes?.strength || 0) / 12).toFixed(2))} = <u>{Number(((1 - getLevel(character?.skills?.woodcutting || 0)) * 0.25) - (getLevel(character?.attributes?.strength || 0) / 12)).toFixed(2)}</u> - 0,05 = <u>{Number(((1 - getLevel(character?.skills?.woodcutting || 0)) * 0.25) - (getLevel(character?.attributes?.strength || 0) / 12) - 0.05).toFixed(2)}</u></li>
            <li>Quête 2: Lvl 1 (constitution)</li>
            <li>Quête 3: Lvl 1 (dexterity)</li>
            <li>Quête 4: Lvl 1 (perception)</li>
            <li>Quête 5: Lvl 1 (intelligence)</li>
            <li>Quête 6: Lvl 1 (willpower)</li>
          </ul>
          <br />
          <p>QL - SL = LD x 0,25 = Malus</p>
          <p>SA / AT = Bonus</p>
          <p>AB - LM = M - D = SR</p>
        </OykCard>
      </OykGrid>
    </section>
  );
}
