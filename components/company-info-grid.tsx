"use client";

import { CompanyInfoCard } from "./CompanyInfoCard";
import { CompanyData } from "../lib/dummyApi";

interface InfoGridProps {
  companyData: CompanyData;
}

export function InfoGrid({ companyData }: InfoGridProps) {
  const { sources_CompanyInfoCard } = companyData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-2">
      <CompanyInfoCard
        title="Products & Brands"
        sources={Object.values(sources_CompanyInfoCard)}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Our analysis of these leading companies reveals several key
            takeaways:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-semibold">Consumer Products:</span>{" "}
              {companyData.productsAndBrands.consumerProducts.join(", ")}
            </li>
            <li>
              <span className="font-semibold">Luxe Division:</span>{" "}
              {companyData.productsAndBrands.luxeDivision.join(", ")}
            </li>
            <li>
              <span className="font-semibold">Professional Products:</span>{" "}
              {companyData.productsAndBrands.professionalProducts.join(", ")}
            </li>
            <li>
              <span className="font-semibold">Active Cosmetics:</span>{" "}
              {companyData.productsAndBrands.activeCosmetics.join(", ")}
            </li>
          </ul>
        </div>
      </CompanyInfoCard>

      <CompanyInfoCard
        title="Business Model"
        sources={[
          sources_CompanyInfoCard.yahoo,
          sources_CompanyInfoCard.finazon,
          sources_CompanyInfoCard.iex,
        ]}
      >
        <p className="text-sm text-muted-foreground">
          {companyData.businessModel}
        </p>
      </CompanyInfoCard>

      <CompanyInfoCard
        title="Customers"
        sources={[
          sources_CompanyInfoCard.yahoo,
          sources_CompanyInfoCard.finazon,
          sources_CompanyInfoCard.iex,
        ]}
      >
        <p className="text-sm text-muted-foreground">{companyData.customers}</p>
      </CompanyInfoCard>

      <CompanyInfoCard
        title="Geographic Presence"
        sources={Object.values(sources_CompanyInfoCard)}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Our analysis of these leading companies reveals several key
            takeaways:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-semibold">HQ:</span>{" "}
              {companyData.geographicPresence.hq}
            </li>
            <li>
              <span className="font-semibold">Operation:</span>{" "}
              {companyData.geographicPresence.operation}
            </li>
          </ul>
        </div>
      </CompanyInfoCard>
    </div>
  );
}
