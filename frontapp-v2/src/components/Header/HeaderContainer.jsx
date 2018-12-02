import React from 'react'
import Header from '../common/Header/Header'
import HeaderSection from '../common/Header/HeaderSection'
import HeaderItem from '../common/Header/HeaderItem'
import ButtonLink from '../common/Button/ButtonLink'

export default function HeaderContainer() {
  return (
    <header>
        <Header>
          <HeaderSection>
            <HeaderItem>
              <a href="/">
                LOGO
              </a>
            </HeaderItem>
            <HeaderItem>
              <ButtonLink to="/alala">
                Button link
              </ButtonLink>
            </HeaderItem>
            <HeaderItem>
              <ButtonLink to="/alala">
                Button link
              </ButtonLink>
            </HeaderItem>
          </HeaderSection>
          <HeaderSection>
            <HeaderItem>
              <ButtonLink to="/alala">
                  Button link
                </ButtonLink>
            </HeaderItem>
            <HeaderItem>
              <ButtonLink to="tel:+79229600644">
                +7 922 960 06 44
              </ButtonLink>
            </HeaderItem>
            <HeaderItem>
              <ButtonLink to="mailto:severuykhin.igor@gmail.com">
                severuykhin.igor@gmail.com
              </ButtonLink>
            </HeaderItem>
          </HeaderSection>
        </Header>
    </header>
  )
}
