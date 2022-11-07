import Link from 'next/link';
import React, { Component } from 'react'
import type { LinkNav } from 'src/types/header.types'


export default class NavBar extends Component {
  linksNav: LinkNav[] = [
    { path: '/', text: 'Home' },
    { path: '/productos', text: 'Productos' },
    { path: '/carrito', text: 'Carrito' }
  ]
  render() {
    return (
      <header className='p-5 shadow-xl'>
        <section className='flex flex-wrap justify-between'>
          <article>
            <Link href={'/'}>
              <h1 className='text-2xl'>PT-ICB</h1>
            </Link>
          </article>
          <article>
            <nav>
              {this.linksNav.map((link: LinkNav) => {
                const { path, text } = link;
                return (
                  <Link className='px-3' key={text} href={path}>{text}</Link>
                );
              })}
            </nav>
          </article>
        </section>
      </header>
    )
  }
}
