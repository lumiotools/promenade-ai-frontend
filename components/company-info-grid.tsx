"use client"

import { CompanyInfoCard } from "./CompanyInfoCard";
import Source1 from "../public/images/Source1.png";
import Source2 from "../public/images/Source2.png";
import Source3 from "../public/images/Source3.png";
import Source4 from "../public/images/Source4.png";

const sources = {
  yahoo: { id: "yahoo", source: Source1 },
  amazon: { id: "amazon", source: Source2 },
  iex: { id: "iex", source: Source3 },
  polygon: { id: "polygon", source: Source4 },
};

export function InfoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-2">
      <CompanyInfoCard
        title="Products & Brands"
        sources={[sources.yahoo, sources.amazon, sources.iex, sources.polygon]}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Our analysis of these leading companies reveals several key
            takeaways:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-semibold">Consumer Products:</span> L&apos;Oréal
              Paris, Garnier, Maybelline, NYX Cosmetics
            </li>
            <li>
              <span className="font-semibold">Luxe Division:</span> Lancôme,
              Yves Saint Laurent, Giorgio Armani Beauty
            </li>
            <li>
              <span className="font-semibold">Professional Products:</span>{" "}
              Redken, Matrix, Pureology
            </li>
            <li>
              <span className="font-semibold">Active Cosmetics:</span> Vichy, La
              Roche-Posay, CeraVe
            </li>
          </ul>
        </div>
      </CompanyInfoCard>

      <CompanyInfoCard
        title="Business Model"
        sources={[sources.yahoo, sources.amazon, sources.iex]}
      >
        <p className="text-sm text-muted-foreground">
          L&apos;Oréal operates a multi-channel distribution strategy, including
          sales through mass-market retailers, department stores, pharmacies,
          salons, and e-commerce. They also invest significantly in R&D and
          sustainability initiatives.
        </p>
      </CompanyInfoCard>

      <CompanyInfoCard
        title="Customers"
        sources={[sources.yahoo, sources.amazon, sources.iex]}
      >
        <p className="text-sm text-muted-foreground">
          L&apos;Oréal&apos;s customers range from mass-market consumers to luxury buyers,
          professional hairdressers, and dermatologists, catering to diverse
          beauty needs worldwide.
        </p>
      </CompanyInfoCard>

      <CompanyInfoCard
        title="Geographic Presence"
        sources={[sources.yahoo, sources.amazon, sources.iex, sources.polygon]}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Our analysis of these leading companies reveals several key
            takeaways:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-semibold">HQ:</span> Paris, France
            </li>
            <li>
              <span className="font-semibold">Operation:</span> L&apos;Oreal has a
              global presence with operations in over 150 countries, including
              major markets in North America, Europe, Asia, and Latin America.
              Their headquarters are in Clichy, France.
            </li>
          </ul>
        </div>
      </CompanyInfoCard>
    </div>
  );
}
