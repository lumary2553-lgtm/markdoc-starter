import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

const items = [
  {
    title: 'Overview',
    links: [{href: '/docs', children: 'Summary'}],
  },
  {
    title: 'Contents',
    links: [{href: '/docs', children: 'Sample 1'}],
  },
  {
    title: 'Claim',
    links: [{href: '/Claim/Submission/Input', children: 'Claim Submission Input'}, {href: '/Claim/Submission/Output', children: 'Claim Submission Output'}],
  },
    {
    title: 'Gates',
    links: [{href: '/Gates', children: 'Canadian Gate Territory'}, {href: '/Gates', children: 'Diagnosis Gate'}, {href: '/Gates', children: 'Discounted Item Gate'}, {href: '/Gates', children: 'Market Channel Code Brand Gate'}, {href: '/Gates', children: 'Multi Pet Invoice Gate'}, {href: '/Gates', children: 'Species Gate'}, {href: '/Gates', children: 'State Gate'}, {href: '/Gates', children: 'Symptom Date Check Gate'}, {href: '/Gates', children: 'Vet Missing Gate'}, {href: '/Gates', children: 'Version Gate'},], 
  },
];

export function SideNav() {
  const router = useRouter();

  return (
    <nav className="sidenav">
      {items.map((item) => (
        <div key={item.title}>
          <span>{item.title}</span>
          <ul className="flex column">
            {item.links.map((link) => {
              const active = router.pathname === link.href;
              return (
                <li key={link.href} className={active ? 'active' : ''}>
                  <Link {...link} />
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
