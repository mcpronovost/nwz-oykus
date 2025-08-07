import { useEffect, useState } from "react";

import { api } from "@/services/api";
import { useRouter } from "@/services/router";
import { OykBanner, OykCard, OykFeedback, OykGrid, OykLoading } from "@/components/common";

export default function PlayerProfile() {
  const { params } = useRouter();
  const { playerSlug } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);
  const [player, setPlayer] = useState(null);

  const fetchPlayer = async () => {
    setIsLoading(true);
    setHasError(null);
    try {
      const response = await api.get(`/player/${playerSlug}`);
      setPlayer(response.player);
    } catch (e) {
      setHasError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayer();
  }, [playerSlug]);

  return (
    <section className="oyk-players-profile">
      {!hasError && !isLoading && player ? (
        <OykGrid>
          <OykCard nop>
            <OykBanner avatarAbbr={player.abbr} avatarSize={120} avatarBorderSize={8} />
            <h1 style={{ textAlign: "center" }}>{player.playername}</h1>
          </OykCard>
        </OykGrid>
      ) : !hasError && isLoading ? (
        <OykLoading />
      ) : (
        <OykGrid>
          <OykFeedback title="Player not found" message="The player you are looking for does not exist." variant="danger" ghost />
        </OykGrid>
      )}
    </section>
  );
}
