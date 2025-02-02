import * as React from 'react'
import { Cell, Grid } from '@faceless-ui/css-grid'
import { Modal, ModalToggler } from '@faceless-ui/modal'
import Link from 'next/link'
import { MainMenu } from '../../../payload-types'
import { FullLogo } from '../../graphics/FullLogo'
import { Gutter } from '../../Gutter'
import { SearchIcon } from '../../graphics/SearchIcon'
import { MenuIcon } from '../../graphics/MenuIcon'
import { CMSLink } from '../../CMSLink'

import classes from './index.module.scss'

export const modalSlug = 'mobile-nav'

type NavItems = Pick<MainMenu, 'navItems'>

const MobileMenuModal: React.FC<NavItems> = ({ navItems }) => {
  return (
    <Modal slug={modalSlug} className={classes.mobileMenuModal}>
      <Gutter>
        <Grid>
          <Cell>
            <div className={classes.mobileMenu}>
              <div className={classes.mobileMenuItems}>
                {(navItems || []).map((item, index) => {
                  return <CMSLink className={classes.mobileMenuItem} key={index} {...item.link} />
                })}
              </div>
            </div>
          </Cell>
        </Grid>
      </Gutter>
      <div className={classes.modalBlur} />
    </Modal>
  )
}

export const MobileNav: React.FC<NavItems> = props => {
  return (
    <div className={classes.mobileNav}>
      <div className={classes.menuBar}>
        <Gutter>
          <Grid>
            <Cell className={classes.menuBarContainer}>
              <Link href="/" className={classes.logo}>
                <FullLogo />
              </Link>

              <div className={classes.icons}>
                <button type="button" className={classes.searchToggler}>
                  <SearchIcon />
                </button>

                <ModalToggler slug={modalSlug} className={classes.modalToggler}>
                  <MenuIcon />
                </ModalToggler>
              </div>
            </Cell>
          </Grid>
        </Gutter>
      </div>

      <MobileMenuModal {...props} />
    </div>
  )
}
