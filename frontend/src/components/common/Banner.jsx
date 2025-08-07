import { OykAvatar } from "@/components/common";

export default function OykBanner({
  children,
  avatarSrc,
  avatarAbbr,
  avatarSize,
  avatarBorderSize,
  avatarTop = 32,
  showAvatar = true,
  height = 170,
  coverHeight = 100,
  className,
}) {
  return (
    <div className={`oyk-banner ${className ? className : ""}`} style={{ height: `${height}px` }}>
      <div className="oyk-banner-cover" style={{ height: `${coverHeight}px` }}></div>
      {showAvatar && (
        <div className="oyk-banner-avatar" style={{ top: `${avatarTop}px` }}>
          <OykAvatar src={avatarSrc} abbr={avatarAbbr} size={avatarSize} borderSize={avatarBorderSize} />
        </div>
      )}
      {children}
    </div>
  );
}
