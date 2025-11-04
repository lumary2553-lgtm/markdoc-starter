import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

type NavLink = {href: string; children: React.ReactNode};
type NavSection = {title: string; links: NavLink[]};

const items: NavSection[] = [
  {
    title: 'APIs',
    links: [
  {href: 'APIs/MGAClaimsAPI', children: 'MGA Claims API Documentation'},
  {href: 'APIs/MGAClaimsPublicAPI', children: 'MGA Claims Public API'}, {href: 'APIs/MGAClaimsvNextAzureFunction', children: 'MGA Claims vNext Azure Function'},{href: 'APIs/MGAPracticesAPI', children: 'MGA Practices API'}, {href: 'APIs/MGACustomersMetadata', children: 'MGA Customers Metadata'}, {href: 'APIs/MGACustomersPII', children: 'MGA Customers PII'}, {href: 'APIs/OnboardingTool', children: 'Onboarding Tool API'}, {href: 'APIs/PracticeLoaderAzureFunction', children: 'Practice Loader Azure Function'}, {href: 'APIs/CaladanFileProcessor', children: 'Caladan File Processor'}, {href: 'APIs/CaladanFileDataExtractor', children: 'Caladan File Data Extractor'}, {href: 'APIs/CaladanFileMetadata', children: 'Caladan File Metadata'}, {href: 'APIs/CaladanWebRequests', children: 'Caladan Web Requests'}, {href: 'APIs/ClarusTechMGAInvoicesAPIGateway', children: 'Clarus Tech MGA Invoices API Gateway'}, {href: 'APIs/ClarusTechMGAInvoicesInvoiceProcessor', children: 'Clarus Tech MGA Invoices Invoice Processor'}, {href: 'APIs/ClarusTechMGAInvoicesWebHook', children: 'Clarus Tech MGA Invoices Web Hook'}, {href: 'APIs/CCHPIMSDataLoader', children: 'CCH PIMS Data Loader'}, {href: 'APIs/CCHPIMSDataEncryptor', children: 'CCH PIMS Data Encryptor'}, {href: 'APIs/CCHPIMSInvoiceSearch', children: 'CCH PIMS Invoice Search'}, {href: 'APIs/CCHPIMSPolicy', children: 'CCH PIMS Policy'}, {href: 'APIs/CCHPIMSInvoiceOnDemand', children: 'CCH PIMS Invoice On Demand'}, 
    ],
  },
  { title: 'Contents', links: [{ href: '/docs', children: 'Sample 1' }] },
  { title: 'Domain', links: [{ href: 'Domain', children: 'Domain' }] },
  {
    title: 'Claim',
    links: [
      {href: '/Claim/Submission/Input', children: 'Claim Submission Input'},
      {href: '/Claim/Submission/Output', children: 'Claim Submission Output'},
    ],
  },
  {
    title: 'Gates',
    links: [
      {href: '/Gates/CanadianTerritory', children: 'Canadian Territory Gate'},
      {href: '/Gates/Diagnosis', children: 'Diagnosis Gate'},
      {href: '/Gates/DiscountedItem', children: 'Discounted Item Gate'},
      {href: '/Gates/LineItem', children: 'Line Item Gate'},
      {href: '/Gates/MarketChannel', children: 'Market Channel Code Brand Gate'},
      {href: '/Gates/MultiPet', children: 'Multi Pet Invoice Gate'},
      {href: '/Gates/Species', children: 'Species Gate'},
      {href: '/Gates/State', children: 'State Gate'},
      {href: '/Gates/Symptom', children: 'Symptom Date Check Gate'},
      {href: '/Gates/VetMissing', children: 'Vet Missing Gate'},
      {href: '/Gates/Version', children: 'Version Gate'},
    ],
  },
  {
    title: 'Post Processors',
    links: [
      {href: '/PostProcessors/CodeChoice', children: 'Code Choice Post Processor'},
      {href: '/PostProcessors/Condition', children: 'Condition Post Processor'},
      {href: '/PostProcessors/Quantity', children: 'Quantity Post Processor'},
      {href: '/PostProcessors/Species', children: 'Species Post Processor'},
      {href: '/PostProcessors/State', children: 'State Post Processor'},
      {href: '/PostProcessors/AnalGland', children: 'Infected Anal Gland Treatment Processor'},
      {href: '/PostProcessors/Merge', children: 'Merge Post Processor Configuration'},
    ],
  },
  {
    title: 'Auditors',
    links: [
      {href: '/Auditors/Accident', children: 'Accident Only Auditor'},
      {href: '/Auditors/AmountCharged', children: 'Amount Charged Auditor'},
      {href: '/Auditors/Customer', children: 'Customer Auditor'},
      {href: '/Auditors/DuplicateInvoice', children: 'Duplicate Invoice Auditor'},
      {href: '/Auditors/Estimate', children: 'Estimate Auditor'},
      {href: '/Auditors/GPT', children: 'GPT Auditor'},
      {href: '/Auditors/ImageHash', children: 'Image Hash Auditor'},
      {href: '/Auditors/Inception', children: 'Inception Auditor'},
      {href: '/Auditors/InvoiceTotal', children: 'Invoice Total Auditor'},
      {href: '/Auditors/OpenAppeals', children: 'Open Appeals Auditor'},
      {href: '/Auditors/PartnerCode', children: 'Partner Code Auditor'},
      {href: '/Auditors/PetCoverage', children: 'Pet Coverage Annual Limit Auditor'},
      {href: '/Auditors/SameDayClaim', children: 'Same Day Claim Auditor'},
      {href: '/Auditors/Tax', children: 'Tax Auditor'},
      {href: '/Auditors/Vet', children: 'Vet Auditor'},
      {href: '/Auditors/WaitingPeriod', children: 'Waiting Period Auditor'},
    ],
  },
  {
    title: 'MGAOnboarding',
    links: [{href: '/MGAOnboarding/InvoiceDataAPIDocumentation', children: 'Invoice Data API Documentation'}],
  },
];

function normalize(href: string) {
  return href.startsWith('/') ? href : `/${href}`;
}

export function SideNav() {
  const router = useRouter();

  return (
    <nav className="sidenav">
      {items.map((item) => (
        <div key={item.title}>
          <span>{item.title}</span>
          <ul className="flex column">
            {item.links.map((link) => {
              const href = normalize(link.href);
              const active =
                router.asPath === href || router.asPath.startsWith(href + '/');
              return (
                <li key={href} className={active ? 'active' : ''}>
                  <Link href={href}>{link.children}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <style jsx>
        {`
          nav {
            position: sticky;
            top: var(--top-nav-height);
            height: calc(100vh - var(--top-nav-height));
            flex: 0 0 auto;
            overflow-y: auto;
            padding: 2.5rem 2rem 2rem;
            border-right: 1px solid var(--border-color);
          }
          span {
            font-size: larger;
            font-weight: 500;
            padding: 0.5rem 0 0.5rem;
          }
          ul {
            padding: 0;
          }
          li {
            list-style: none;
            margin: 0;
          }
          li :global(a) {
            text-decoration: none;
          }
          li :global(a:hover),
          li.active :global(a) {
            text-decoration: underline;
          }
        `}
      </style>
    </nav>
  );
}
