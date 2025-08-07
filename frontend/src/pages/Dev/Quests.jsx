import { useState } from "react";

import { useTranslation } from "@/services/translation";
import { OykCard, OykGrid, OykHeading } from "@/components/common";

export default function DevQuests() {
  const { t } = useTranslation();

  const [character, setCharacter] = useState({
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
      perception: 3,
      intelligence: 2,
      willpower: 2,
    },
    skills: {},
  });

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
                <li key={attribute}>{attribute}: {value}</li>
              ))}
            </ul>
          </OykCard>
          <OykCard>
            <h3>Compétences</h3>
            <br />
            <ul>
              {Object.entries(character.skills).map(([skill, value]) => (
                <li key={skill}>{skill}: {value}</li>
              ))}
            </ul>
          </OykCard>
        </div>
        <OykCard>
          <h3>Quêtes</h3>
          <br />
          <ul>
            <li>Quête 1: Lvl 1 (strength)</li>
            <li>Quête 2: Lvl 1 (constitution)</li>
            <li>Quête 3: Lvl 1 (dexterity)</li>
            <li>Quête 4: Lvl 1 (perception)</li>
            <li>Quête 5: Lvl 1 (intelligence)</li>
            <li>Quête 6: Lvl 1 (willpower)</li>
          </ul>
        </OykCard>
      </OykGrid>
    </section>
  );
}
