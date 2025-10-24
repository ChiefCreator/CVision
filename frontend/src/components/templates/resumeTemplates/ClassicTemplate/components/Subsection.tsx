import parse from "html-react-parser";

interface SubsectionProps {
  title?: string;
  description?: string;
  date?: string;
  meta?: string;
}

export default function Subsection({ title, description, date, meta }: SubsectionProps) {
  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <time style={{ flex: "1 1 30%", textAlign: "left" }}>{date}</time>

      <div style={{ flex: "1 1 70%" }}>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "5px",
            marginBottom: "15px",
          }}
        >
          {title && <h3 style={{ fontWeight: 400 }}>{title}</h3>}

          {meta && (
            <span
              style={{
                color: "var(--color-contrast--light)",
                fontSize: "10px",
                marginLeft: "auto",
              }}
            >
              {meta}
            </span>
          )}
        </header>

        {description && <p>{parse(description)}</p>}
      </div>
    </div>
  );
}
