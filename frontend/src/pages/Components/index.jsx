import "@/styles/page/_components.scss";
import { useTranslation } from "@/services/translation";
import { OykAlert, OykAvatar, OykChip, OykHeading } from "@/components/common";
import ComponentApiTable from "./ComponentApiTable";

export default function Components() {
  const { t } = useTranslation();

  return (
    <section className="oyk-page oyk-components">
      <section className="oyk-components-list">
        {/* Predefined Colours */}
        <article id="predefined-colours" className="oyk-components-list-item">
          <OykHeading title={t("Predefined Colours")} ph={0} />
          <div className="oyk-components-list-item-example">
            <span style={{ color: "var(--oyk-core-fg)" }}>Default text</span>
            <span style={{ color: "var(--oyk-primary)" }}>Primary</span>
            <span style={{ color: "var(--oyk-c-danger)" }}>Danger</span>
            <span style={{ color: "var(--oyk-c-warning)" }}>Warning</span>
            <span style={{ color: "var(--oyk-c-success)" }}>Success</span>
            <div
              style={{
                backgroundColor: "var(--oyk-card-bg)",
                borderRadius: "var(--oyk-radius)",
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                width: "100%",
                padding: "16px",
              }}
            >
              <span style={{ color: "var(--oyk-card-fg)" }}>
                Card default text
              </span>
              <span style={{ color: "var(--oyk-primary)" }}>Primary</span>
              <span style={{ color: "var(--oyk-c-danger)" }}>Danger</span>
              <span style={{ color: "var(--oyk-c-warning)" }}>Warning</span>
              <span style={{ color: "var(--oyk-c-success)" }}>Success</span>
            </div>
          </div>
        </article>

        {/* Alert */}
        <article id="alert" className="oyk-components-list-item">
          <OykHeading title={t("Alert")} ph={0} />
          <div className="oyk-components-list-item-example column">
            <OykAlert title="Default Alert" message="Message here" />
            <br />
            <OykAlert
              title="Primary Alert"
              message="Message here"
              variant="primary"
            />
            <br />
            <OykAlert
              title="Danger Alert"
              message="Message here"
              variant="danger"
            />
            <br />
            <OykAlert
              title="Warning Alert"
              message="Message here"
              variant="warning"
            />
            <br />
            <OykAlert
              title="Success Alert"
              message="Message here"
              variant="success"
            />
          </div>
          <code className="full">
            {`<OykAlert title="Title Here" message="Message here" variant="danger" />`}
          </code>
          <ComponentApiTable
            items={[
              {
                name: "title",
                description: "Title of the alert",
                type: "string",
                defaultValue: "-",
              },
              {
                name: "message",
                description: "Message of the alert",
                type: "string",
                defaultValue: "-",
              },
              {
                name: "variant",
                description: "Variant of the alert",
                type: "string",
                defaultValue: "default",
                enumValue: ["default", "primary", "danger", "warning", "success"],
              },
              {
                name: "showIcon",
                description: "Show icon of the alert",
                type: "boolean",
                defaultValue: "true",
              },
            ]}
          />
        </article>

        {/* Avatar */}
        <article id="avatar" className="oyk-components-list-item">
          <OykHeading title={t("Avatar")} ph={0} />
          <div className="oyk-components-list-item-example">
            <OykAvatar /> <OykAvatar size={24} />{" "}
            <OykAvatar name="John Johnson" /> <OykAvatar abbr="JJ" />{" "}
            <OykAvatar abbr="JJ" size={32} />{" "}
            <OykAvatar src="https://placehold.jp/150x150.png" />{" "}
            <OykAvatar
              src="https://placehold.jp/64x64.png"
              name="John Johnson"
              size={48}
            />{" "}
            <OykAvatar
              src="https://placehold.jp/50x150.png"
              abbr="JD"
              size={24}
            />{" "}
            <OykAvatar
              src="https://placehold.jp/300x150.png"
              name="John Doe"
              abbr="JD"
            />{" "}
          </div>
          <code className="full">{`<OykAvatar name="Name Here" src={url} size={24} />`}</code>
          <ComponentApiTable
            items={[
              {
                name: "name",
                description: "Name of the avatar",
                type: "string",
                defaultValue: '""',
              },
              {
                name: "abbr",
                description: "Abbreviation of the avatar",
                type: "string",
                defaultValue: '""',
              },
              {
                name: "src",
                description: "Source of the avatar",
                type: "string",
                defaultValue: "-",
              },
              {
                name: "icon",
                description: "Icon of the avatar",
                type: "component",
                defaultValue: "<User />",
              },
              {
                name: "size",
                description: "Size of the avatar",
                type: "number",
                defaultValue: "64",
              },
              {
                name: "bgColor",
                description: "Background colour of the avatar",
                type: "string",
                defaultValue: "var(--oyk-primary)",
              },
              {
                name: "fgColor",
                description: "Foreground colour of the avatar",
                type: "string",
                defaultValue: "var(--oyk-primary-fg)",
              },
              {
                name: "borderColor",
                description: "Border colour of the avatar",
                type: "string",
                defaultValue: "var(--oyk-card-bg)",
              },
            ]}
          />
        </article>

        {/* Chip */}
        <article id="chip" className="oyk-components-list-item">
          <OykHeading title={t("Chip")} ph={0} />
          <div className="oyk-components-list-item-example column">
            <OykChip>Default Chip</OykChip>{" "}
            <OykChip color="primary">Primary Chip</OykChip>{" "}
            <OykChip color="danger">Danger Chip</OykChip>{" "}
            <OykChip color="warning">Warning Chip</OykChip>{" "}
            <OykChip color="success">Success Chip</OykChip>
            <br />
            <OykChip outline>Default Chip</OykChip>{" "}
            <OykChip outline color="primary">
              Primary Chip
            </OykChip>{" "}
            <OykChip outline color="danger">
              Danger Chip
            </OykChip>{" "}
            <OykChip outline color="warning">
              Warning Chip
            </OykChip>{" "}
            <OykChip outline color="success">
              Success Chip
            </OykChip>
          </div>
          <code className="full">{`<OykChip>Default Chip</OykChip>`}</code>
          <ComponentApiTable
            items={[
              {
                name: "color",
                description: "Colour of the chip",
                type: "string",
                defaultValue: "default",
                enumValue: [
                  "default",
                  "primary",
                  "danger",
                  "warning",
                  "success",
                  "#(hex)",
                ],
              },
              {
                name: "outline",
                description: "Outline of the chip",
                type: "boolean",
                defaultValue: "false",
              },
            ]}
          />
        </article>

        {/* Heading */}
        <article className="oyk-components-list-item">
          <OykHeading title={t("Heading")} ph={0} />
          <code className="full">{`<OykHeading title={t("Components")} />`}</code>
        </article>
      </section>
    </section>
  );
}
