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
          </HeaderSection>
          <HeaderSection>
            <HeaderItem>
              <ButtonLink to="/alala">
                  Button link
                </ButtonLink>
            </HeaderItem>
          </HeaderSection>
        </Header>
    </header>
  )
}
